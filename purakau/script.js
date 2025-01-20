let categories = [];
let stories = [];
let currentStory = {};
let currentIndex = 0;
let selectedPhrase = null;
let detailMode = false;
let maoriMode = true;
let categoryVocab;
let storyVocab;

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
    // ui.displays.categorySelect = getElement('categorySelect');
    // ui.displays.categorySelect.addEventListener('change', (event) => {
    //     const selectedIndex = event.target.value;
    //     loadCategory(selectedIndex);
    // });

    //load up the views
    ui.views.category = getElement('category-view');
    ui.displays.storySelect = getElement('storySelect');
    // ui.displays.storySelect.addEventListener('change', (event) => {
    //     const selectedIndex = event.target.value;
    //     loadStory(selectedIndex);
    // });

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

    ui.buttons.back = getElement('nav-back');
    ui.buttons.back.addEventListener('click', () => {
        if (currentStory.sentences.length > 0 && currentIndex > 0) {
            currentIndex--;
            displaySentence();
            updateButtons();
        }
    });

    ui.buttons.next = getElement('nav-next');
    ui.buttons.next.addEventListener('click', () => {
        if (currentStory.sentences.length > 0 && currentIndex < currentStory.sentences.length - 1) {
            currentIndex++;
            displaySentence();
            updateButtons();
        }
    });

    ui.displays.sentenceContainer = getElement('sentenceContainer');
    ui.displays.sentenceContainer.addEventListener('click', (event) => {
        if (!event.ctrlKey && !detailMode) {
            maoriMode = !maoriMode;
            displaySentenceSimple();
        }
    });

    ui.views.vocabulary = getElement('vocabulary-view');
    ui.displays.vocab = getElement('story-vocab');
    
    console.log('vocab', ui.views.vocabulary);

    document.addEventListener('selectionchange', () => {
        if (!detailMode && maoriMode) {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            if (selectedText) {
                const word = storyVocab[selectedText]
                console.log('Selected:', word);
            }
        }
    });

    ui.displays.detailsContainer = getElement('detailsContainer');
    
    fetch('categories.json')
        .then(response => response.json())
        .then(data => {
            categories = data;
            createSelectionCards(getElement('categories-card-container'), categories, loadCategory);
        })
        .catch(error => {
            console.error("Error loading the file:", error);
        });
});

function createSelectionCards(div, data, handler) {
    
    div.innerHTML = '';
    data.forEach((item, ) => {        
       const card = document.createElement('div');
       card.className = 'card';
       card.innerHTML = '<img src="' + item.image + '" alt="Image"> <div class="title"*>' + item.name + '</div> <div class="description">' + item.description + '</div>';
       div.appendChild(card);

       card.addEventListener('click', () => {         
            handler(item);
       })
    });    
}

function loadCategory(category) {
    
        showView(ui.views.category);
    
        document.getElementById('categoryLabel').innerText = category.name;

        fetch(category.path)
            .then(response => response.json())
            .then(data => {
                stories = data.stories;
                //tmp 
                stories.forEach((story) => {
                    story.name = story.title.maori;
                    story.description = '';
                    story.image = 'images/stock.jpg';
                });

                categoryVocab = getVocab(data);

                createSelectionCards(getElement('stories-card-container'), stories, loadStory);
            })
            .catch(error => {
                console.error("Error loading the file:", error);
            });
    
}

function getVocab(category) {
    const stories = category.stories;
    ////process the category to add words to the dictionary    
    let storyVocab;
    const dict = {};

    stories.forEach((story) => {
        storyVocab = {};
        story.vocabulary.forEach((entry) => {
            if (storyVocab[entry.word] == undefined) {
                storyVocab[entry.word] = { entries: [] }
            }
            storyVocab[entry.word].entries.push({
                translation: entry.translation,
                type: entry.explanation
            });

        })
        dict[story.title.maori] = storyVocab;
    })

    return dict;
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
        for (let i = 1; i < properties.length; i++) {
            text = text[properties[i]]
        }

        option = document.createElement('option');
        option.value = index;
        option.text = text;
        select.appendChild(option);
    });
}

function loadStory(story) {
    // if (index != -1) {
        currentStory = story;//stories[index];
        currentIndex = 0;

        storyVocab = categoryVocab[currentStory.title.maori];
        loadVocab(storyVocab);
        showView(ui.views.story);

        document.getElementById('storyLabel').innerText = typeof currentStory.title === 'string' ? currentStory.title : currentStory.title.maori + ' (' + currentStory.title.english + ')';
        console.log('story', currentStory);

        displaySentence();
        updateButtons();
    
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
    ui.displays.sentenceContainer.innerHTML = '';
    if (maoriMode) {
        ui.displays.sentenceContainer.innerHTML = sentence.maori;
    } else {
        ui.displays.sentenceContainer.innerHTML = sentence.english;
    }
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
    showView(ui.views.category);
}

function showVocab() {
    showView(ui.views.vocabulary);
}

function closeVocab(){
    showView(ui.views.story);
}

function showHome(){
    showView(ui.views.categories);
}

function loadVocab(vocab){
    ui.displays.vocab.innerHTML = '';
    console.log('load this', vocab);
    let div;
    
    for(let key in vocab){
        const entry = vocab[key].entries[0];
        div = document.createElement('div');
        div.className = 'vocab-word-div';
        div.innerHTML = key;
        div.addEventListener('click', () => {
            alert(entry.type + ': ' + entry.translation);
        });
        ui.displays.vocab.appendChild(div);
    }
}

function showView(view) {
    for (let key in ui.views) {
        ui.views[key].style.display = ui.views[key] == view? 'flex' : 'none';
    };
}
