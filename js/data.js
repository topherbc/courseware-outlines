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
                        
                        <section class="course-overview">
                            <h2>Course Overview</h2>
                            <p>This course provides a comprehensive introduction to fundamental programming concepts and problem-solving strategies. Students will learn to think like programmers while developing basic coding skills.</p>
                            
                            <div class="course-meta">
                                <div class="meta-item">
                                    <h3>Prerequisites</h3>
                                    <p>No prior programming experience required. Basic computer literacy recommended.</p>
                                </div>
                                <div class="meta-item">
                                    <h3>Course Duration</h3>
                                    <p>16 weeks (48 hours)</p>
                                </div>
                            </div>
                        </section>

                        <section class="learning-objectives">
                            <h2>Learning Objectives</h2>
                            <p>By the end of this course, students will be able to:</p>
                            <ul>
                                <li>Understand and apply fundamental programming concepts</li>
                                <li>Write basic programs to solve common problems</li>
                                <li>Debug and troubleshoot code effectively</li>
                                <li>Implement basic algorithms and data structures</li>
                            </ul>
                        </section>

                        <section class="course-content">
                            <h2>Course Content</h2>
                            <div class="module">
                                <h3>Module 1: Programming Fundamentals</h3>
                                <ul>
                                    <li>Variables and Data Types</li>
                                    <li>Basic Input/Output Operations</li>
                                    <li>Operators and Expressions</li>
                                </ul>
                            </div>
                            <div class="module">
                                <h3>Module 2: Control Structures</h3>
                                <ul>
                                    <li>Conditional Statements</li>
                                    <li>Loops and Iterations</li>
                                    <li>Break and Continue Statements</li>
                                </ul>
                            </div>
                            <div class="module">
                                <h3>Module 3: Functions</h3>
                                <ul>
                                    <li>Function Declaration and Parameters</li>
                                    <li>Return Values and Scope</li>
                                    <li>Code Organization</li>
                                </ul>
                            </div>
                        </section>

                        <section class="assessment">
                            <h2>Assessment Methods</h2>
                            <ul>
                                <li>Weekly Programming Assignments (40%)</li>
                                <li>Midterm Project (25%)</li>
                                <li>Final Project (35%)</li>
                            </ul>
                        </section>
                    `
                },
                {
                    id: 'prog-102',
                    title: 'Web Development Basics',
                    content: `
                        <h1>Web Development Basics</h1>
                        
                        <section class="course-overview">
                            <h2>Course Overview</h2>
                            <p>An introduction to modern web development technologies and practices. Students will learn to create responsive, interactive websites using current web standards.</p>
                            
                            <div class="course-meta">
                                <div class="meta-item">
                                    <h3>Prerequisites</h3>
                                    <p>Basic understanding of HTML and CSS recommended.</p>
                                </div>
                                <div class="meta-item">
                                    <h3>Course Duration</h3>
                                    <p>12 weeks (36 hours)</p>
                                </div>
                            </div>
                        </section>

                        <section class="learning-objectives">
                            <h2>Learning Objectives</h2>
                            <p>Upon completion, students will be able to:</p>
                            <ul>
                                <li>Create structured, semantic HTML documents</li>
                                <li>Style web pages using modern CSS techniques</li>
                                <li>Implement basic interactivity with JavaScript</li>
                                <li>Build responsive layouts for multiple devices</li>
                            </ul>
                        </section>

                        <section class="course-content">
                            <h2>Course Content</h2>
                            <div class="module">
                                <h3>Module 1: HTML5 Fundamentals</h3>
                                <ul>
                                    <li>Document Structure and Semantics</li>
                                    <li>Forms and Input Elements</li>
                                    <li>Media Elements</li>
                                </ul>
                            </div>
                            <div class="module">
                                <h3>Module 2: CSS3 Styling</h3>
                                <ul>
                                    <li>Selectors and Properties</li>
                                    <li>Flexbox and Grid Layout</li>
                                    <li>Responsive Design</li>
                                </ul>
                            </div>
                            <div class="module">
                                <h3>Module 3: JavaScript Basics</h3>
                                <ul>
                                    <li>DOM Manipulation</li>
                                    <li>Event Handling</li>
                                    <li>AJAX and Fetch API</li>
                                </ul>
                            </div>
                        </section>

                        <section class="assessment">
                            <h2>Assessment Methods</h2>
                            <ul>
                                <li>Coding Exercises (30%)</li>
                                <li>Portfolio Projects (40%)</li>
                                <li>Final Website (30%)</li>
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
                        
                        <section class="course-overview">
                            <h2>Course Overview</h2>
                            <p>Introduction to differential calculus and its applications in science and engineering.</p>
                            
                            <div class="course-meta">
                                <div class="meta-item">
                                    <h3>Prerequisites</h3>
                                    <p>Strong foundation in algebra and trigonometry required.</p>
                                </div>
                                <div class="meta-item">
                                    <h3>Course Duration</h3>
                                    <p>16 weeks (48 hours)</p>
                                </div>
                            </div>
                        </section>

                        <section class="learning-objectives">
                            <h2>Learning Objectives</h2>
                            <ul>
                                <li>Master the concept of limits and continuity</li>
                                <li>Understand derivatives and their applications</li>
                                <li>Apply calculus to real-world problems</li>
                                <li>Develop mathematical reasoning skills</li>
                            </ul>
                        </section>

                        <section class="course-content">
                            <h2>Course Content</h2>
                            <div class="module">
                                <h3>Module 1: Limits and Continuity</h3>
                                <ul>
                                    <li>Introduction to Limits</li>
                                    <li>Continuous Functions</li>
                                    <li>Limit Laws</li>
                                </ul>
                            </div>
                            <div class="module">
                                <h3>Module 2: Derivatives</h3>
                                <ul>
                                    <li>Definition of the Derivative</li>
                                    <li>Differentiation Rules</li>
                                    <li>Chain Rule</li>
                                </ul>
                            </div>
                            <div class="module">
                                <h3>Module 3: Applications</h3>
                                <ul>
                                    <li>Related Rates</li>
                                    <li>Optimization</li>
                                    <li>Curve Sketching</li>
                                </ul>
                            </div>
                        </section>

                        <section class="assessment">
                            <h2>Assessment Methods</h2>
                            <ul>
                                <li>Homework Assignments (30%)</li>
                                <li>Midterm Exams (40%)</li>
                                <li>Final Exam (30%)</li>
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