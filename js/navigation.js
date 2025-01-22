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

    // Show/hide views
    showView(viewName, data = null) {
        const views = ['categories', 'outlines', 'outline-content'];
        
        views.forEach(view => {
            const element = document.getElementById(`${view}-view`);
            if (element) {
                if (view === viewName) {
                    element.classList.remove('hidden');
                    this.updateViewContent(view, data);
                } else {
                    element.classList.add('hidden');
                }
            }
        });

        this.currentView = viewName;
        this.updateMenuToggleVisibility();
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
                <h3>${category.title}</h3>
                <p>${category.description}</p>
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
                <h3>${outline.title}</h3>
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
            this.showView('categories');
        }
    }
};

// Export navigation object
window.navigation = navigation;