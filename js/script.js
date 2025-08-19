// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Load Projects
fetch('data/projects.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('project-gallery');
        gallery.innerHTML = '';
        data.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" class="btn">View Project</a>
            `;
            gallery.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading projects:', error);
        document.getElementById('project-gallery').innerHTML = '<p>Error loading projects. Please check data/projects.json.</p>';
    });

// D3.js Visualization
const data = [
    { category: 'Research', value: 30 },
    { category: 'Coding', value: 40 },
    { category: 'Writing', value: 20 },
    { category: 'Teaching', value: 10 }
];

const svg = d3.select('#visualization')
    .append('svg')
    .attr('width', 400)
    .attr('height', 200);

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 400 - margin.left - margin.right;
const height = 200 - margin.top - margin.bottom;

const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
    .domain(data.map(d => d.category))
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, 0]);

g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.category))
    .attr('y', d => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.value))
    .attr('fill', '#2b6cb0')
    .on('mouseover', function() {
        d3.select(this).attr('fill', '#9f7aea');
    })
    .on('mouseout', function() {
        d3.select(this).attr('fill', '#2b6cb0');
    });

// Form Validation
document.getElementById('contact-form').addEventListener('submit', (e) => {
    const status = document.getElementById('form-status');
    const form = e.target;
    if (form.checkValidity()) {
        status.textContent = 'Message sent! Check Formspree integration.';
        form.reset();
    } else {
        e.preventDefault();
        status.textContent = 'Please fill out all fields.';
    }
});