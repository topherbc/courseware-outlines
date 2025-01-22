// Category icons mapping
const categoryIcons = {
    prog: '⌨️',
    math: '📐',
    sci: '🔬',
    lang: '📚'
};

// Render categories grid
function renderCategories() {
    const categoriesGrid = document.querySelector('.categories-grid');
    const categories = window.courseware.getCategories();
    
    categoriesGrid.innerHTML = categories.map(category => `
        <div class="card" tabindex="0" role="button" aria-label="${category.title}" data-category-id="${category.id}">
            <div class="card-icon">${categoryIcons[category.id] || '📚'}</div>
            <div class="card-content">
                <h3 class="card-title">${category.title}</h3>
                <p class="card-description">${category.description}</p>
            </div>
            <div class="card-meta">
                ${category.outlines.length} outline${category.outlines.length !== 1 ? 's' : ''}
            </div>
        </div>
    `).join('');

    // Add click and keyboard event listeners
    const cards = categoriesGrid.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCategoryClick.call(card);
            }
        });
    });
}

// Handle category selection
function handleCategoryClick() {
    const categoryId = this.dataset.categoryId;
    const category = window.courseware.getCategory(categoryId);
    
    // Update the outlines view
    const outlinesView = document.getElementById('outlines-view');
    const outlinesGrid = outlinesView.querySelector('.outlines-grid');
    
    // Update view title
    outlinesView.querySelector('h2').textContent = `${category.title} Outlines`;
    
    // Render outlines
    outlinesGrid.innerHTML = category.outlines.map(outline => `
        <div class="card" tabindex="0" role="button" aria-label="${outline.title}" data-outline-id="${outline.id}">
            <div class="card-content">
                <h3 class="card-title">${outline.title}</h3>
            </div>
        </div>
    `).join('');
    
    // Switch views
    document.getElementById('categories-view').classList.add('hidden');
    outlinesView.classList.remove('hidden');
    
    // Add click handlers for outlines
    outlinesGrid.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => handleOutlineClick(categoryId, card.dataset.outlineId));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOutlineClick(categoryId, card.dataset.outlineId);
            }
        });
    });
}

// Handle outline selection
function handleOutlineClick(categoryId, outlineId) {
    const outline = window.courseware.getOutline(categoryId, outlineId);
    
    // Show the menu toggle
    document.getElementById('menu-toggle').style.display = 'block';
    
    // Update content view
    const contentView = document.getElementById('outline-content-view');
    contentView.querySelector('.outline-container').innerHTML = outline.content;
    
    // Switch views
    document.getElementById('outlines-view').classList.add('hidden');
    contentView.classList.remove('hidden');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
});

// Make functions available globally
window.app = {
    renderCategories,
    handleCategoryClick,
    handleOutlineClick
};