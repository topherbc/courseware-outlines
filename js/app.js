// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    window.navigation.init();

    // Initialize sidebar functionality
    initializeSidebar();
});

// Initialize sidebar functionality
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarCategories = sidebar.querySelector('.sidebar-categories');
    const sidebarOutlines = sidebar.querySelector('.sidebar-outlines');

    // Render categories in sidebar
    function renderSidebarCategories() {
        const categories = window.courseware.getCategories();
        
        sidebarCategories.innerHTML = categories.map(category => `
            <div class="sidebar-item" data-category="${category.id}">
                ${category.title}
            </div>
        `).join('');

        // Add click handlers
        sidebarCategories.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', () => {
                const categoryId = item.dataset.category;
                renderSidebarOutlines(categoryId);
                
                // Update main view if not already showing outlines
                if (window.navigation.currentView !== 'outlines') {
                    window.navigation.showView('outlines', categoryId);
                }
            });
        });
    }

    // Render outlines in sidebar
    function renderSidebarOutlines(categoryId) {
        const category = window.courseware.getCategory(categoryId);
        if (!category) return;

        sidebarOutlines.innerHTML = category.outlines.map(outline => `
            <div class="sidebar-item" data-outline="${outline.id}">
                ${outline.title}
            </div>
        `).join('');

        // Add click handlers
        sidebarOutlines.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', () => {
                const outlineId = item.dataset.outline;
                
                // Update main view if not already showing this outline
                if (window.navigation.currentView !== 'outline-content' || 
                    window.navigation.selectedOutline !== outlineId) {
                    window.navigation.showView('outline-content', {
                        categoryId: category.id,
                        outlineId: outlineId
                    });
                }
                
                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    window.navigation.toggleSidebar();
                }
            });
        });
    }

    // Initialize sidebar categories
    renderSidebarCategories();

    // Handle window resize for responsive behavior
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            window.navigation.isSidebarOpen = false;
        }
    });
}

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape key closes sidebar
    if (e.key === 'Escape' && window.navigation.isSidebarOpen) {
        window.navigation.toggleSidebar();
    }

    // Back button (optional)
    if (e.key === 'Backspace' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        window.navigation.goBack();
    }
});