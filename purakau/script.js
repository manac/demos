let categories = [];
let stories = [];
let currentStory = {};
let currentIndex = 0;
let selectedPhrase = null;
let detailMode = false;
let maoriMode = true;

const ui = {
    buttons: {},
    displays: {},
    views: {}
};

function getElement(id) {
    return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", function () {

    const filePath = "stories/Ngā Haerenga a Tama.json"; // Specify the path to your file

    ui.views.categories = getElement('categories-view');
    ui.displays.categorySelect = getElement('categorySelect');
    ui.displays.categorySelect.addEventListener('change', (event) => {
        const selectedIndex = event.target.value;
        loadCategory(selectedIndex);
    });

    //load up the views
    ui.views.category = getElement('category-view');
    ui.displays.storySelect = getElement('storySelect');
    ui.displays.storySelect.addEventListener('change', (event) => {
        const selectedIndex = event.target.value;
        loadStory(selectedIndex);
    });

    ui.views.story = getElement('story-view');

    //load up the story view elements
    ui.buttons.detail = getElement('detailButton');
    ui.buttons.detail.addEventListener('click', () => {
        //toggle detail mode
        detailMode = !detailMode;
        ui.buttons.detail.innerText = detailMode ? "Simple Mode" : "Detail Mode";

        //make sure any details are cleared
        ui.displays.detailsContainer.innerHTML = '';
        displaySentence();
    });

    ui.buttons.back = getElement('backButton');
    ui.buttons.back.addEventListener('click', () => {
        if (currentStory.sentences.length > 0 && currentIndex > 0) {
            currentIndex--;
            displaySentence();
            updateButtons();
        }
    });    
    
    ui.buttons.next = getElement('nextButton');
    ui.buttons.next.addEventListener('click', () => {
        if (currentStory.sentences.length > 0 && currentIndex < currentStory.sentences.length - 1) {
            currentIndex++;
            displaySentence();
            updateButtons();
        }
    });

    ui.displays.sentenceContainer = getElement('sentenceContainer');
    ui.displays.sentenceContainer.addEventListener('click', () => {
        if (!detailMode) {
            maoriMode = !maoriMode;
            displaySentenceSimple();
        }
    });

    ui.displays.detailsContainer = getElement('detailsContainer');


    //load category
    fetch('categories.json')
        .then(response => response.json())
        .then(data => {
            //load up the tuatahi category
            //`  loadCategory(categories.length-1)            
            categories = data;
            loadCategories();
        })
        .catch(error => {
            console.error("Error loading the file:", error);
        });


});

function loadCategories() {
    //ui.displays.categorySelect
    // console.log('cat', categories);
    populateSelect(ui.displays.categorySelect, categories, 'name');
}

function loadCategory(index) {
    if (index != -1) {
        showView(ui.views.categories, false);
        showView(ui.views.story, false);
        showView(ui.views.category, true);

        category = categories[index];
        document.getElementById('categoryLabel').innerText = category.name;

        fetch(category.path)
            .then(response => response.json())
            .then(data => {
                

                stories = data.stories;
                populateSelect(ui.displays.storySelect, stories, 'title.maori');

            })
            .catch(error => {
                console.error("Error loading the file:", error);
            });
    }
}

function populateSelect(select, data, property) {
    select.innerHTML = '';

    //insert an initial blank select option
    let option = document.createElement('option');
    option.value = -1;
    select.appendChild(option);

    data.forEach((item, index) => {
        const properties = property.split('.')
        let text = item[properties[0]];
        for(let i = 1; i < properties.length; i++){
            text = text[properties[i]]
        }
        
        option = document.createElement('option');
        option.value = index;
        option.text = text;
        select.appendChild(option);
    });
}

function loadStory(index) {
    if (index != -1) {
        currentStory = stories[index];
        currentIndex = 0;

        showView(ui.views.category, false);
        showView(ui.views.story, true);

        document.getElementById('storyLabel').innerText = typeof currentStory.title === 'string'? currentStory.title : currentStory.title.maori + ' (' + currentStory.title.english + ')';
        console.log(currentStory);

        displaySentence();
        updateButtons();
    } else {
        alert('black');
    }
}

function displaySentence() {
    maoriMode = true;

    if (detailMode) {
        displaySentenceDetail();
    } else {
        displaySentenceSimple();
    }
}

function displaySentenceSimple() {

    const sentence = currentStory.sentences[currentIndex];
    ui.displays.sentenceContainer.innerHTML = maoriMode ? sentence.maori : sentence.english;
}

function displaySentenceDetail() {

    ui.displays.sentenceContainer.innerHTML = '';
    ui.displays.detailsContainer.innerHTML = '';
    const sentence = currentStory.sentences[currentIndex];

    //temp in case a sentence does not have any notes
    const notes = sentence.notes || [];

    notes.forEach(phrase => {
        const phraseDiv = document.createElement('div');
        phraseDiv.className = 'phrase';
        phraseDiv.innerText = phrase.text;
        phraseDiv.addEventListener('click', () => {

            if (selectedPhrase) {
                selectedPhrase.classList.remove('selected');
            }
            phraseDiv.classList.add('selected');
            selectedPhrase = phraseDiv;
            const role = phrase.role || '';

            detailsContainer.innerHTML = `
                <p><strong>Text:</strong> ${phrase.text}</p>
                <p><strong>Translation:</strong> ${phrase.translation}</p>
                <p><strong>Type:</strong> ${phrase.type}</p>
                <p><strong>Role:</strong> ${role}</p>
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
    ui.buttons.back.disabled = currentIndex === 0;
    ui.buttons.next.disabled = currentIndex === currentStory.sentences.length - 1;
}

function showIntroView() {
    showView(ui.views.story, false);
    showView(ui.views.category, true);
}

function showView(view, visible) {
    view.style.display = visible ? 'flex' : 'none';
}
