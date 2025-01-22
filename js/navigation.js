// Navigation state management
const navigation = {
    currentView: 'categories',
    selectedCategory: null,
    selectedOutline: null,
    isSidebarOpen: false,

    // Initialize navigation
    init() {
        this.attachEventListeners();
        this.showView('categories');
    },

    // Attach event listeners
    attachEventListeners() {
        // Menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Back button
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', () => this.goBack());
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
    },

    // Show/hide views with transition
    showView(viewName, data = null) {
        const views = ['categories', 'outlines', 'outline-content'];
        const currentViewElement = document.getElementById(`${this.currentView}-view`);
        const nextViewElement = document.getElementById(`${viewName}-view`);
        
        if (currentViewElement && nextViewElement) {
            // Start transition
            currentViewElement.classList.add('hidden');
            nextViewElement.classList.remove('hidden');
            
            // Trigger fade-in animation
            nextViewElement.classList.add('fade-in');
            setTimeout(() => {
                nextViewElement.classList.remove('fade-in');
            }, 300); // Match the CSS animation duration
        }

        this.currentView = viewName;
        this.updateViewContent(viewName, data);
        this.updateMenuToggleVisibility();
        this.updateBreadcrumb(viewName, data);
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
            <div class="card" data-category="${category.id}">
                <div class="card-icon">
                    <i class="${category.icon || 'default-icon'}"></i>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${category.title}</h3>
                    <p class="card-description">${category.description}</p>
                </div>
            </div>
        `).join('');

        // Attach click handlers
        categoriesGrid.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const categoryId = card.dataset.category;
                this.selectedCategory = categoryId;
                this.showView('outlines', categoryId);
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
            <div class="card" data-outline="${outline.id}">
                <div class="card-content">
                    <h3 class="card-title">${outline.title}</h3>
                    <p class="card-description">${outline.description || ''}</p>
                    <div class="card-meta">
                        <span>${outline.duration || ''}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Attach click handlers
        outlinesGrid.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const outlineId = card.dataset.outline;
                this.selectedOutline = outlineId;
                this.showView('outline-content', { categoryId, outlineId });
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
    },

    // Toggle sidebar
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menu-toggle');
        
        if (sidebar && menuToggle) {
            this.isSidebarOpen = !this.isSidebarOpen;
            sidebar.classList.toggle('active', this.isSidebarOpen);
            menuToggle.classList.toggle('active', this.isSidebarOpen);
        }
    },

    // Update menu toggle visibility
    updateMenuToggleVisibility() {
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            if (this.currentView === 'outline-content') {
                menuToggle.style.display = 'block';
                menuToggle.classList.add('visible');
            } else {
                menuToggle.style.display = 'none';
                menuToggle.classList.remove('visible');
            }
        }
    },

    // Navigate back
    goBack() {
        if (this.currentView === 'outline-content') {
            this.showView('outlines', this.selectedCategory);
        } else if (this.currentView === 'outlines') {
            this.selectedCategory = null;
            this.showView('categories');
        }
    }
};

// Export navigation object
window.navigation = navigation;