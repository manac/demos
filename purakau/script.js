let stories = [];
let currentStory = {};
let currentIndex = 0;
let selectedPhrase = null;
let detailMode = false;
let maoriMode = true;

const ui = {
    buttons: {},
    displays: {}
};

document.addEventListener("DOMContentLoaded", function() {
    const filePath = "Ngā Haerenga a Tama.json"; // Specify the path to your file

    ui.buttons.detail = document.getElementById('detailButton');
    ui.buttons.detail.addEventListener('click', () => {
        detailMode = !detailMode;        
        ui.buttons.detail.innerText = detailMode? "Simple Mode" : "Detail Mode";
        displaySentence();
    });


    console.log('ui', ui);

    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            document.getElementById('categoryLabel').innerText = data.category;

            stories = data.stories;
            populateStorySelect();            
            document.getElementById('storySelect').style.display = 'inline-block';            
            // updateButtons();
        })
        .catch(error => {
            console.error("Error loading the file:", error);
        });
});

document.getElementById('storySelect').addEventListener('change', (event) => {
    const selectedIndex = event.target.value;
    loadStory(selectedIndex);
});

function populateStorySelect() {
    const storySelect = document.getElementById('storySelect');
    storySelect.innerHTML = '';

    //insert an initial blank select option
    let option = document.createElement('option');
    option.value = -1;
    storySelect.appendChild(option);

    stories.forEach((story, index) => {
        option = document.createElement('option');
        option.value = index;
        option.text = story.title;
        storySelect.appendChild(option);
    });
}

document.getElementById('backButton').addEventListener('click', () => {
    if (currentStory.sentences.length > 0 && currentIndex > 0) {
        currentIndex--;
        displaySentence();
        updateButtons();
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    if (currentStory.sentences.length > 0 && currentIndex < currentStory.sentences.length - 1) {
        currentIndex++;
        displaySentence();
        updateButtons();
    }
});

document.getElementById('sentenceContainer').addEventListener('click', () => {
    if(!detailMode){
        maoriMode = !maoriMode;
        displaySentenceSimple();
    }    
});

function loadStory(index) {
    if(index != -1){
        currentStory = stories[index];
        currentIndex = 0;
    
        document.getElementById('intro-view').style.display = 'none';
        document.getElementById('story-view').style.display = 'flex';
    
        document.getElementById('storyLabel').innerText = currentStory.title;
        console.log(currentStory);
        
        displaySentence();
        updateButtons();
    }else{
        alert('black');
    }    
}

function displaySentence() {
    maoriMode = true;
    
    if(detailMode){
        displaySentenceDetail();        
    }else{
        displaySentenceSimple();
    }
}

function displaySentenceSimple() {
    const sentenceContainer = document.getElementById('sentenceContainer');
    const sentence = currentStory.sentences[currentIndex];
    sentenceContainer.innerHTML = maoriMode? sentence.maori : sentence.english;
}

function displaySentenceDetail() {
    const sentenceContainer = document.getElementById('sentenceContainer');
    const detailsContainer = document.getElementById('detailsContainer');
    sentenceContainer.innerHTML = '';
    detailsContainer.innerHTML = '';
    const sentence = currentStory.sentences[currentIndex];

    console.log('sentence', sentence);

    sentence.notes.forEach(phrase => {
        const phraseDiv = document.createElement('div');
        phraseDiv.className = 'phrase';
        phraseDiv.innerText = phrase.text;
        phraseDiv.addEventListener('click', () => {
            
            if (selectedPhrase) {
                selectedPhrase.classList.remove('selected');
            }
            phraseDiv.classList.add('selected');
            selectedPhrase = phraseDiv;
            detailsContainer.innerHTML = `
                <p><strong>Text:</strong> ${phrase.text}</p>
                <p><strong>Translation:</strong> ${phrase.translation}</p>
                <p><strong>Type:</strong> ${phrase.type}</p>
                <p><strong>Role:</strong> ${phrase.role}</p>
                <p><strong>Explanations:</strong></p>
                <ul>
                    ${phrase.explanations.map(explanation => `
                        <li><strong>${explanation.token}:</strong> ${explanation.explanation}</li>
                    `).join('')}
                </ul>
            `;
        });
        sentenceContainer.appendChild(phraseDiv);
    });
}

function updateButtons() {
    document.getElementById('backButton').disabled = currentIndex === 0;
    document.getElementById('nextButton').disabled = currentIndex === currentStory.sentences.length - 1;
}

function showIntroView() {
    document.getElementById('story-view').style.display = 'none';
    document.getElementById('intro-view').style.display = 'flex';
}
