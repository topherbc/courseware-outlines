// Navigation state management
const navigation = {
    currentView: 'categories',
    selectedCategory: null,
    selectedOutline: null,
    isSidebarOpen: false,
    lastFocusedElement: null,

    // Initialize navigation
    init() {
        this.attachEventListeners();
        this.handleInitialUrl(); // Handle URL on page load
        window.addEventListener('popstate', (event) => this.handlePopState(event));
    },

    // Handle browser back/forward
    handlePopState(event) {
        if (event.state) {
            this.loadStateFromUrl(event.state);
        } else {
            this.loadStateFromUrl(this.parseUrl());
        }
    },

    // Parse URL parameters
    parseUrl() {
        const params = new URLSearchParams(window.location.search);
        return {
            view: params.get('view') || 'categories',
            categoryId: params.get('category'),
            outlineId: params.get('outline')
        };
    },

    // Update URL based on current state
    updateUrl(state, pushState = true) {
        const params = new URLSearchParams();
        
        if (state.view !== 'categories') {
            params.set('view', state.view);
        }
        if (state.categoryId) {
            params.set('category', state.categoryId);
        }
        if (state.outlineId) {
            params.set('outline', state.outlineId);
        }

        const url = params.toString() ? `?${params.toString()}` : window.location.pathname;
        
        if (pushState) {
            history.pushState(state, '', url);
        } else {
            history.replaceState(state, '', url);
        }
    },

    // Handle initial URL on page load
    handleInitialUrl() {
        const state = this.parseUrl();
        this.loadStateFromUrl(state);
    },

    // Load state from URL parameters
    loadStateFromUrl(state) {
        switch (state.view) {
            case 'outline-content':
                if (state.categoryId && state.outlineId) {
                    this.selectedCategory = state.categoryId;
                    this.selectedOutline = state.outlineId;
                    this.showView('outline-content', { 
                        categoryId: state.categoryId, 
                        outlineId: state.outlineId 
                    }, false);
                }
                break;
            case 'outlines':
                if (state.categoryId) {
                    this.selectedCategory = state.categoryId;
                    this.showView('outlines', state.categoryId, false);
                }
                break;
            default:
                this.showView('categories', null, false);
                break;
        }
    },

    // Attach event listeners
    attachEventListeners() {
        // Menu toggle with accessibility improvements
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            // Set ARIA attributes
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-controls', 'sidebar');
            menuToggle.setAttribute('role', 'button');
            menuToggle.tabIndex = 0;

            menuToggle.addEventListener('click', () => this.toggleSidebar());
            menuToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleSidebar();
                }
            });
        }

        // Back button
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.setAttribute('aria-label', 'Go back to previous view');
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.goBack();
            });
        }

        // Breadcrumb navigation
        const breadcrumbLinks = document.querySelectorAll('.breadcrumb-list a');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.dataset.view;
                if (view === 'categories') {
                    this.showView('categories');
                }
            });
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const menuToggle = document.getElementById('menu-toggle');
            
            if (this.isSidebarOpen && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                this.toggleSidebar();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // ESC key closes sidebar
            if (e.key === 'Escape' && this.isSidebarOpen) {
                this.toggleSidebar();
            }

            // Tab trap for sidebar when open
            if (e.key === 'Tab' && this.isSidebarOpen) {
                this.handleTabKey(e);
            }
        });
    },

    // Handle tab key for focus trap in sidebar
    handleTabKey(e) {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const focusableElements = sidebar.querySelectorAll(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Shift + Tab
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        }
        // Tab
        else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    },

    // Show/hide views with transition
    showView(viewName, data = null, updateHistory = true) {
        const views = ['categories', 'outlines', 'outline-content'];
        const currentViewElement = document.getElementById(`${this.currentView}-view`);
        const nextViewElement = document.getElementById(`${viewName}-view`);
        
        if (currentViewElement && nextViewElement) {
            // Add transition classes
            currentViewElement.classList.add('view-exit');
            nextViewElement.classList.add('view-enter');
            
            // Start transition
            setTimeout(() => {
                currentViewElement.classList.add('hidden');
                currentViewElement.classList.remove('view-exit');
                nextViewElement.classList.remove('hidden');
                
                // Trigger fade-in animation
                nextViewElement.classList.add('fade-in');
                setTimeout(() => {
                    nextViewElement.classList.remove('view-enter', 'fade-in');
                    
                    // Focus management
                    const firstFocusable = nextViewElement.querySelector(
                        'a[href], button, [tabindex]:not([tabindex="-1"])'
                    );
                    if (firstFocusable) {
                        firstFocusable.focus();
                    }
                }, 300);
            }, 150);
        }

        this.currentView = viewName;
        this.updateViewContent(viewName, data);
        this.updateMenuToggleVisibility();
        this.updateBreadcrumb(viewName, data);

        // Update URL and browser history
        if (updateHistory) {
            const state = {
                view: viewName,
                categoryId: this.selectedCategory,
                outlineId: this.selectedOutline
            };
            this.updateUrl(state);
        }
    },

    // Update breadcrumb navigation
    updateBreadcrumb(view, data) {
        const currentCategory = document.querySelector('.current-category');
        if (!currentCategory) return;

        if (view === 'outlines' && data) {
            const category = window.courseware.getCategory(data);
            if (category) {
                currentCategory.textContent = category.title;
                currentCategory.style.display = 'inline';
            }
        } else {
            currentCategory.style.display = 'none';
        }
    },

    // Update view content
    updateViewContent(view, data) {
        switch (view) {
            case 'categories':
                this.renderCategories();
                break;
            case 'outlines':
                this.renderOutlines(data);
                break;
            case 'outline-content':
                this.renderOutlineContent(data);
                break;
        }
    },

    // Render categories
    renderCategories() {
        const categoriesGrid = document.querySelector('.categories-grid');
        if (!categoriesGrid) return;

        const categories = window.courseware.getCategories();
        
        categoriesGrid.innerHTML = categories.map(category => `
            <div class="card" 
                 data-category="${category.id}"
                 tabindex="0"
                 role="button"
                 aria-label="View ${category.title} category">
                <div class="card-icon">
                    <i class="${category.icon || 'default-icon'}" aria-hidden="true"></i>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${category.title}</h3>
                    <p class="card-description">${category.description}</p>
                </div>
            </div>
        `).join('');

        // Attach click and keyboard handlers
        categoriesGrid.querySelectorAll('.card').forEach(card => {
            const handleSelection = () => {
                const categoryId = card.dataset.category;
                this.selectedCategory = categoryId;
                this.showView('outlines', categoryId);
            };

            card.addEventListener('click', handleSelection);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelection();
                }
            });
        });
    },

    // Render outlines for a category
    renderOutlines(categoryId) {
        const outlinesGrid = document.querySelector('.outlines-grid');
        if (!outlinesGrid) return;

        const category = window.courseware.getCategory(categoryId);
        if (!category) return;

        outlinesGrid.innerHTML = category.outlines.map(outline => `
            <div class="card" 
                 data-outline="${outline.id}"
                 tabindex="0"
                 role="button"
                 aria-label="View ${outline.title} outline">
                <div class="card-content">
                    <h3 class="card-title">${outline.title}</h3>
                    <p class="card-description">${outline.description || ''}</p>
                    <div class="card-meta">
                        <span>${outline.duration || ''}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Attach click and keyboard handlers
        outlinesGrid.querySelectorAll('.card').forEach(card => {
            const handleSelection = () => {
                const outlineId = card.dataset.outline;
                this.selectedOutline = outlineId;
                this.showView('outline-content', { categoryId, outlineId });
            };

            card.addEventListener('click', handleSelection);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelection();
                }
            });
        });
    },

    // Render outline content
    renderOutlineContent(data) {
        if (!data) return;
        
        const outlineContainer = document.querySelector('.outline-container');
        if (!outlineContainer) return;

        const outline = window.courseware.getOutline(data.categoryId, data.outlineId);
        if (!outline) return;

        outlineContainer.innerHTML = outline.content;

        // Make content container focusable
        outlineContainer.tabIndex = 0;
        outlineContainer.focus();
    },

    // Toggle sidebar with improved accessibility
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menu-toggle');
        
        if (sidebar && menuToggle) {
            this.isSidebarOpen = !this.isSidebarOpen;
            
            // Store last focused element when opening
            if (this.isSidebarOpen) {
                this.lastFocusedElement = document.activeElement;
            }

            // Update ARIA attributes
            menuToggle.setAttribute('aria-expanded', String(this.isSidebarOpen));
            sidebar.setAttribute('aria-hidden', String(!this.isSidebarOpen));

            // Apply transitions
            sidebar.classList.toggle('active', this.isSidebarOpen);
            menuToggle.classList.toggle('active', this.isSidebarOpen);

            // Focus management
            if (this.isSidebarOpen) {
                const firstFocusable = sidebar.querySelector(
                    'a[href], button, [tabindex]:not([tabindex="-1"])'
                );
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            } else if (this.lastFocusedElement) {
                this.lastFocusedElement.focus();
            }
        }
    },

    // Update menu toggle visibility with smooth transition
    updateMenuToggleVisibility() {
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            if (this.currentView === 'outline-content') {
                menuToggle.style.display = 'block';
                // Allow display:block to take effect before adding transition
                requestAnimationFrame(() => {
                    menuToggle.classList.add('visible');
                });
            } else {
                menuToggle.classList.remove('visible');
                // Wait for transition to complete before hiding
                menuToggle.addEventListener('transitionend', () => {
                    if (!menuToggle.classList.contains('visible')) {
                        menuToggle.style.display = 'none';
                    }
                }, { once: true });
            }
        }
    },

    // Navigate back
    goBack() {
        history.back();
    }
};

// Export navigation object
window.navigation = navigation;