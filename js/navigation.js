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

    // Attach sidebar event listeners
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
    }
};

// Export navigation object
window.navigation = navigation;

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.navigation.init();
});