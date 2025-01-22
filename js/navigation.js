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
        this.handleInitialUrl();
        window.addEventListener('popstate', (event) => this.handlePopState(event));
    },

    // Update breadcrumb navigation
    updateBreadcrumb(view, data) {
        const currentCategory = document.querySelectorAll('.current-category');
        const currentOutline = document.querySelector('.current-outline');
        
        if (currentCategory.length === 0) return;

        // Get category information
        const category = data?.categoryId ? 
            window.courseware.getCategory(data.categoryId) : 
            (this.selectedCategory ? window.courseware.getCategory(this.selectedCategory) : null);

        // Update category display
        currentCategory.forEach(elem => {
            if (category) {
                elem.textContent = category.title;
                elem.style.display = 'inline';
            } else {
                elem.style.display = 'none';
            }
        });

        // Update outline display in breadcrumb
        if (currentOutline && view === 'outline-content' && data?.outlineId) {
            const outline = window.courseware.getOutline(data.categoryId, data.outlineId);
            if (outline) {
                currentOutline.textContent = outline.title;
                currentOutline.style.display = 'inline';
            }
        }
    },

    // Navigate back with proper state management
    goBack() {
        if (this.currentView === 'outline-content') {
            this.showView('outlines', this.selectedCategory);
        } else if (this.currentView === 'outlines') {
            this.showView('categories');
        }
    },

    // Toggle sidebar with navigation functionality
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menu-toggle');
        
        if (sidebar && menuToggle) {
            this.isSidebarOpen = !this.isSidebarOpen;
            
            if (this.isSidebarOpen) {
                this.lastFocusedElement = document.activeElement;
                this.updateSidebarContent();
            }

            menuToggle.setAttribute('aria-expanded', String(this.isSidebarOpen));
            sidebar.setAttribute('aria-hidden', String(!this.isSidebarOpen));

            sidebar.classList.toggle('active', this.isSidebarOpen);
            menuToggle.classList.toggle('active', this.isSidebarOpen);

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

    // Update sidebar content based on current state
    updateSidebarContent() {
        const sidebarCategories = document.querySelector('.sidebar-categories');
        const sidebarOutlines = document.querySelector('.sidebar-outlines');
        
        if (!sidebarCategories || !sidebarOutlines) return;

        // Render categories in sidebar
        const categories = window.courseware.getCategories();
        sidebarCategories.innerHTML = categories.map(category => `
            <div class="sidebar-item ${category.id === this.selectedCategory ? 'active' : ''}"
                 data-category="${category.id}"
                 tabindex="0"
                 role="button"
                 aria-label="View ${category.title} category">
                ${category.title}
            </div>
        `).join('');

        // Render outlines if category is selected
        if (this.selectedCategory) {
            const category = window.courseware.getCategory(this.selectedCategory);
            if (category) {
                sidebarOutlines.innerHTML = category.outlines.map(outline => `
                    <div class="sidebar-item ${outline.id === this.selectedOutline ? 'active' : ''}"
                         data-outline="${outline.id}"
                         tabindex="0"
                         role="button"
                         aria-label="View ${outline.title} outline">
                        ${outline.title}
                    </div>
                `).join('');
            }
        } else {
            sidebarOutlines.innerHTML = '';
        }

        // Attach event listeners to sidebar items
        this.attachSidebarEventListeners();
    },

    // Attach event listeners to sidebar items
    attachSidebarEventListeners() {
        const sidebarCategories = document.querySelector('.sidebar-categories');
        const sidebarOutlines = document.querySelector('.sidebar-outlines');

        if (sidebarCategories) {
            sidebarCategories.querySelectorAll('.sidebar-item').forEach(item => {
                const handleCategorySelect = () => {
                    const categoryId = item.dataset.category;
                    this.selectedCategory = categoryId;
                    this.selectedOutline = null;
                    this.showView('outlines', categoryId);
                    this.toggleSidebar();
                };

                item.addEventListener('click', handleCategorySelect);
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategorySelect();
                    }
                });
            });
        }

        if (sidebarOutlines) {
            sidebarOutlines.querySelectorAll('.sidebar-item').forEach(item => {
                const handleOutlineSelect = () => {
                    const outlineId = item.dataset.outline;
                    this.selectedOutline = outlineId;
                    this.showView('outline-content', { 
                        categoryId: this.selectedCategory, 
                        outlineId 
                    });
                    this.toggleSidebar();
                };

                item.addEventListener('click', handleOutlineSelect);
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOutlineSelect();
                    }
                });
            });
        }
    },

    // Rest of the navigation.js code remains the same...
    
