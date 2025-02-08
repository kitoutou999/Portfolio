const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX - 9}px`;
    cursor.style.top = `${e.clientY - 9}px`;
});

document.addEventListener('mousedown', (e) => {
    cursor.style.transform = 'scale(0.8)';

    const wave = document.createElement('div');
    wave.className = 'wave';
    wave.style.left = `${e.clientX + window.scrollX}px`;
    wave.style.top = `${e.clientY + window.scrollY}px`;
    document.body.appendChild(wave);

    wave.addEventListener('animationend', () => {
        wave.remove();
    });
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});


// Ajoutez ceci dans votre script.js
async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/kitoutou999/repos?sort=updated&direction=desc');
        const repos = await response.json();
        
        const projectsGrid = document.querySelector('.projects-grid');
        const featuredRepos = repos.slice(0, 3);

        featuredRepos.forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-content">
                    <div class="project-image">
                        <img src="https://opengraph.githubassets.com/1/${repo.full_name}" alt="${repo.name}">
                    </div>
                    <h3 class="project-title">${repo.name}</h3>
                    <p class="project-description">${repo.description || 'No description available'}</p>
                    <div class="project-details">
                        <span class="project-tech">${repo.language || 'Various'}</span>
                        <span>⭐ ${repo.stargazers_count}</span>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank">
                            <i class="fab fa-github"></i>
                            Code Source
                        </a>
                        ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank">
                            <i class="fas fa-external-link-alt"></i>
                            Demo
                        </a>` : ''}
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchGitHubProjects);




// Ajoutez ceci dans script.js
const form = document.querySelector('.contact-form');
const status = document.querySelector('.status');

async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    status.textContent = 'Sending...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            status.textContent = 'Message sent successfully!';
            form.reset();
            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        } else {
            const errorData = await response.json();
            status.textContent = `Error: ${errorData.error || 'Please try again later'}`;
        }
    } catch (error) {
        status.textContent = 'There was a problem sending your message. Please try again.';
    }
}

form.addEventListener('submit', handleSubmit);

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerText = "Please wait...";
                
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = "Send Message";
        }, 60000); 
    });
}