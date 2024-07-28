const sentenceElement = document.getElementById('sentence');
const typingArea = document.getElementById('typingArea');
const wpmElement = document.getElementById('wpm');

let sentence = '';
let startTime;
let typing = false;
let currentIndex = 0;

function updateSentenceDisplay() {
    sentenceElement.innerHTML = sentence
        .split('')
        .map((char, index) => {
            if (index < currentIndex) {
                return `<span class="typed">${char}</span>`;
            } else if (index === currentIndex) {
                return `<span class="highlight">${char}</span>`;
            } else {
                return char;
            }
        })
        .join('');
}

// Function to start a new sentence
async function startNewSentence() {
    sentence = await getNextIdea();
    sentence = sentence.replace(/[^a-zA-Z0-9 ]/g, ''); // Remove special characters
    sentence = sentence.toLowerCase();
    typingArea.value = '';
    typing = false;
    currentIndex = 0;
    updateSentenceDisplay();

}

// Initialize the first sentence
startNewSentence();

typingArea.addEventListener('input', () => {
    if (!typing) {
        typing = true;
        startTime = new Date().getTime();
    }

    const typedText = typingArea.value;
    const currentChar = sentence[currentIndex];

    if (typedText[currentIndex] !== currentChar) {
        typingArea.style.backgroundColor = 'pink';
    } else {
        typingArea.style.backgroundColor = 'white';
        currentIndex++;
        updateSentenceDisplay();
    }

    if (typedText === sentence) {
        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        const wordsTyped = sentence.split(' ').length;
        const wpm = Math.round((wordsTyped / timeTaken) * 60);

        wpmElement.textContent = `Your WPM: ${wpm}`;

        // Start a new sentence
        startNewSentence();
    }
});