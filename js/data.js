// Mock data structure for courseware outlines
const coursewareData = {
    categories: [
        {
            id: 'prog',
            title: 'Programming',
            description: 'Software development and programming courses',
            outlines: [
                {
                    id: 'prog-101',
                    title: 'Introduction to Programming',
                    content: `
                        <h1>Introduction to Programming</h1>
                        <section>
                            <h2>Course Overview</h2>
                            <p>Fundamentals of programming concepts and problem-solving.</p>
                        </section>
                        <section>
                            <h2>Topics Covered</h2>
                            <ul>
                                <li>Basic Programming Concepts</li>
                                <li>Variables and Data Types</li>
                                <li>Control Structures</li>
                                <li>Functions and Methods</li>
                            </ul>
                        </section>
                    `
                },
                {
                    id: 'prog-102',
                    title: 'Web Development Basics',
                    content: `
                        <h1>Web Development Basics</h1>
                        <section>
                            <h2>Course Overview</h2>
                            <p>Introduction to web development technologies.</p>
                        </section>
                        <section>
                            <h2>Topics Covered</h2>
                            <ul>
                                <li>HTML Fundamentals</li>
                                <li>CSS Styling</li>
                                <li>JavaScript Basics</li>
                                <li>Responsive Design</li>
                            </ul>
                        </section>
                    `
                },
                {
                    id: 'prog-103',
                    title: 'Data Structures',
                    content: `
                        <h1>Data Structures</h1>
                        <section>
                            <h2>Course Overview</h2>
                            <p>Essential data structures for efficient programming.</p>
                        </section>
                        <section>
                            <h2>Topics Covered</h2>
                            <ul>
                                <li>Arrays and Lists</li>
                                <li>Stacks and Queues</li>
                                <li>Trees and Graphs</li>
                                <li>Hash Tables</li>
                            </ul>
                        </section>
                    `
                },
                {
                    id: 'prog-104',
                    title: 'Algorithms',
                    content: `
                        <h1>Algorithms</h1>
                        <section>
                            <h2>Course Overview</h2>
                            <p>Fundamental algorithmic concepts and problem-solving strategies.</p>
                        </section>
                        <section>
                            <h2>Topics Covered</h2>
                            <ul>
                                <li>Sorting Algorithms</li>
                                <li>Searching Algorithms</li>
                                <li>Graph Algorithms</li>
                                <li>Dynamic Programming</li>
                            </ul>
                        </section>
                    `
                }
            ]
        },
        {
            id: 'math',
            title: 'Mathematics',
            description: 'Core mathematical concepts and applications',
            outlines: [
                {
                    id: 'math-101',
                    title: 'Calculus I',
                    content: `
                        <h1>Calculus I</h1>
                        <section>
                            <h2>Course Overview</h2>
                            <p>Introduction to differential calculus.</p>
                        </section>
                        <section>
                            <h2>Topics Covered</h2>
                            <ul>
                                <li>Limits and Continuity</li>
                                <li>Derivatives</li>
                                <li>Applications of Derivatives</li>
                                <li>Integration Basics</li>
                            </ul>
                        </section>
                    `
                },
                {
                    id: 'math-102',
                    title: 'Linear Algebra',
                    content: `
                        <h1>Linear Algebra</h1>
                        <section>
                            <h2>Course Overview</h2>
                            <p>Fundamentals of linear algebra and its applications.</p>
                        </section>
                        <section>
                            <h2>Topics Covered</h2>
                            <ul>
                                <li>Vectors and Matrices</li>
                                <li>Linear Transformations</li>
                                <li>Eigenvalues and Eigenvectors</li>
                                <li>Vector Spaces</li>
                            </ul>
                        </section>
                    `
                }
            ]
        },
        {
            id: 'sci',
            title: 'Science',
            description: 'Natural and physical sciences',
            outlines: [
                {
                    id: 'sci-101',
                    title: 'Physics Mechanics',
                    content: `
                        <h1>Physics Mechanics</h1>
                        <section>
                            <h2>Course Overview</h2>
                            <p>Classical mechanics and motion.</p>
                        </section>
                        <section>
                            <h2>Topics Covered</h2>
                            <ul>
                                <li>Newton's Laws</li>
                                <li>Work and Energy</li>
                                <li>Momentum</li>
                                <li>Rotational Motion</li>
                            </ul>
                        </section>
                    `
                }
            ]
        },
        {
            id: 'lang',
            title: 'Languages',
            description: 'Language learning and linguistics',
            outlines: [
                {
                    id: 'lang-101',
                    title: 'English Composition',
                    content: `
                        <h1>English Composition</h1>
                        <section>
                            <h2>Course Overview</h2>
                            <p>Fundamentals of writing and composition.</p>
                        </section>
                        <section>
                            <h2>Topics Covered</h2>
                            <ul>
                                <li>Grammar and Style</li>
                                <li>Essay Writing</li>
                                <li>Research Papers</li>
                                <li>Academic Writing</li>
                            </ul>
                        </section>
                    `
                }
            ]
        }
    ]
};

// Helper functions to access data
function getCategories() {
    return coursewareData.categories;
}

function getCategory(categoryId) {
    return coursewareData.categories.find(cat => cat.id === categoryId);
}

function getOutline(categoryId, outlineId) {
    const category = getCategory(categoryId);
    return category ? category.outlines.find(outline => outline.id === outlineId) : null;
}

// Export the data and helper functions
window.courseware = {
    getCategories,
    getCategory,
    getOutline
};