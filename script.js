const candidates = [
    {
        "id": "1",
        "name": "Alice Johnson",
        "age": 28,
        "qualification": "Bachelor's in Computer Science",
        "experience": {
            "years": 5,
            "skills": ["JavaScript", "React", "Node.js"],
            "hoursSpent": 40,
            "previousJobs": 2,
            "pastExperience": "Frontend Developer at XYZ Corp"
        },
        "preferred_location": "New York",
        "current_position": "Frontend Developer"
    },
    {
        "id": "2",
        "name": "Bob Smith",
        "age": 35,
        "qualification": "Master's in Software Engineering",
        "experience": {
            "years": 10,
            "skills": ["Python", "Django", "Machine Learning"],
            "hoursSpent": 45,
            "previousJobs": 3,
            "pastExperience": "Software Engineer at ABC Inc."
        },
        "preferred_location": "San Francisco",
        "current_position": "Software Engineer"
    },
    {
        "id": "3",
        "name": "Cathy Brown",
        "age": 30,
        "qualification": "Bachelor's in Information Technology",
        "experience": {
            "years": 4,
            "skills": ["Java", "Spring", "SQL"],
            "hoursSpent": 35,
            "previousJobs": 1,
            "pastExperience": "Backend Developer at Tech Solutions"
        },
        "preferred_location": "Los Angeles",
        "current_position": "Backend Developer"
    },
    {
        "id": "4",
        "name": "David Wilson",
        "age": 40,
        "qualification": "PhD in Data Science",
        "experience": {
            "years": 15,
            "skills": ["R", "Python", "Data Analysis"],
            "hoursSpent": 50,
            "previousJobs": 5,
            "pastExperience": "Data Scientist at DataCorp"
        },
        "preferred_location": "Chicago",
        "current_position": "Data Scientist"
    },
    {
        "id": "5",
        "name": "Emma Davis",
        "age": 27,
        "qualification": "Bachelor's in Graphic Design",
        "experience": {
            "years": 3,
            "skills": ["Photoshop", "Illustrator", "UI/UX"],
            "hoursSpent": 30,
            "previousJobs": 1,
            "pastExperience": "Graphic Designer at Creative Agency"
        },
        "preferred_location": "Seattle",
        "current_position": "Graphic Designer"
    }
];

function toggleFilters() {
    const filters = document.getElementById('filters');
    filters.classList.toggle('show');

    if (filters.classList.contains('show')) {
        filters.style.display = 'block';
        setTimeout(() => {
            filters.style.maxHeight = '500px';
            filters.style.opacity = '1';
        }, 10);
    } else {
        filters.style.maxHeight = '0';
        filters.style.opacity = '0';
        setTimeout(() => {
            filters.style.display = 'none';
        }, 300);
    }
}

function applyFilters() {
    const hoursSpent = parseInt(document.getElementById('hoursSpent').value) || 0; // Default to 0 if NaN
    const pastExperience = document.getElementById('pastExperience').value.toLowerCase().trim();
    const previousJobs = parseInt(document.getElementById('previousJobs').value) || 0; // Default to 0 if NaN
    const skills = document.getElementById('skills').value.toLowerCase().split(',').map(skill => skill.trim()).filter(skill => skill); // Remove empty skills
    const ageMin = parseInt(document.getElementById('ageMin').value) || 0; // Default to 0 if NaN
    const ageMax = parseInt(document.getElementById('ageMax').value) || Infinity; // Default to Infinity if NaN
    const qualification = document.getElementById('qualification').value.toLowerCase().trim();

    const filteredData = candidates.filter(candidate => {
        const matchesHours = candidate.experience.hoursSpent >= hoursSpent;
        const matchesExperience = !pastExperience || candidate.experience.pastExperience.toLowerCase().includes(pastExperience);
        const matchesJobs = candidate.experience.previousJobs >= previousJobs;
        const matchesSkills = skills.length === 0 || skills.every(skill => candidate.experience.skills.map(s => s.toLowerCase()).includes(skill));
        const matchesAge = candidate.age >= ageMin && candidate.age <= ageMax;
        const matchesQualification = !qualification || candidate.qualification.toLowerCase().includes(qualification);

        console.log({ 
            name: candidate.name, 
            matchesHours, 
            matchesExperience, 
            matchesJobs, 
            matchesSkills, 
            matchesAge, 
            matchesQualification 
        });

        return matchesHours && matchesExperience && matchesJobs && matchesSkills && matchesAge && matchesQualification;
    });

    displayResults(filteredData);
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.length === 0) {
        resultsDiv.innerText = 'No candidates found.';
        return;
    }

    const resultsHTML = data.map(candidate => `
        <div class="result-card">
            <h3>${candidate.name}</h3>
            <p>Age: ${candidate.age}</p>
            <p>Qualification: ${candidate.qualification}</p>
            <p>Experience: ${candidate.experience.years} years</p>
            <p>Hours Spent: ${candidate.experience.hoursSpent}</p>
            <p>Previous Jobs: ${candidate.experience.previousJobs}</p>
            <p>Past Experience: ${candidate.experience.pastExperience}</p>
            <p>Skills: ${candidate.experience.skills.join(', ')}</p>
            <p>Preferred Location: ${candidate.preferred_location}</p>
            <p>Current Position: ${candidate.current_position}</p>
        </div>
    `).join('');

    resultsDiv.innerHTML = resultsHTML;
}
