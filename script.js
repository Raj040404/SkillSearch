let candidates = [];

// Function to fetch candidates from the JSON file
async function loadCandidates() {
    try {
        const response = await fetch('candidates.json'); // Make sure the path is correct
        if (!response.ok) {
            throw new Error('Failed to load candidate data.');
        }
        candidates = await response.json(); // Parse the JSON response
        console.log("Candidates loaded:", candidates);
    } catch (error) {
        console.error("Error loading candidates:", error);
    }
}

// Call this function once when the page loads
window.onload = function() {
    loadCandidates();
};

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
    // Get the values from the input fields
    const hoursSpent = parseInt(document.getElementById('hoursSpent').value) || 0;
    const pastExperience = document.getElementById('pastExperience').value.toLowerCase().trim();
    const previousJobs = parseInt(document.getElementById('previousJobs').value) || 0;
    const skills = document.getElementById('skills').value.toLowerCase().split(',').map(skill => skill.trim()).filter(skill => skill);
    const ageMin = parseInt(document.getElementById('ageMin').value) || 0;
    const ageMax = parseInt(document.getElementById('ageMax').value) || Infinity;
    const qualification = document.getElementById('qualification').value.toLowerCase().trim();

    // If no filters are applied (i.e., all inputs are default/empty)
    if (
        hoursSpent === 0 &&
        !pastExperience &&
        previousJobs === 0 &&
        skills.length === 0 &&
        ageMin === 0 &&
        ageMax === Infinity &&
        !qualification
    ) {
        // Display "No candidates found" and return
        displayResults([]);
        return;
    }

    // Filter candidates based on provided inputs
    const filteredData = candidates.filter(candidate => {
        const matchesHours = candidate.experience.hoursSpent >= hoursSpent;
        const matchesExperience = !pastExperience || candidate.experience.pastExperience.toLowerCase().includes(pastExperience);
        const matchesJobs = candidate.experience.previousJobs >= previousJobs;
        const matchesSkills = skills.length === 0 || skills.every(skill => candidate.experience.skills.map(s => s.toLowerCase()).includes(skill));
        const matchesAge = candidate.age >= ageMin && candidate.age <= ageMax;
        const matchesQualification = !qualification || candidate.qualification.toLowerCase().includes(qualification);

        return matchesHours && matchesExperience && matchesJobs && matchesSkills && matchesAge && matchesQualification;
    });

    // Display filtered results
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