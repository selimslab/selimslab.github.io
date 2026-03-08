
let sentence = '';
let typedText = '';
let wpms: number[] = [];
let startTime: Date | null = null;
let endTime: Date | null = null;
let idx = 0;
let incorrect = 0;
let isHandlingKeydown = false;

let sentenceDiv: HTMLElement;
let wpmDiv: HTMLElement;
let medianWpmDiv: HTMLElement;
let accuracyDiv: HTMLElement;


// Initialize the typing test
async function init(): Promise<void> {
    sentenceDiv = document.getElementById('sentence')!;
    wpmDiv = document.getElementById('wpm')!;
    medianWpmDiv = document.getElementById('medianWpm')!;
    accuracyDiv = document.getElementById('typingAccuracy')!;

    sentenceDiv.focus();
    document.addEventListener('keydown', handleKeydown);
    await reset();
}

async function getNextSentence(): Promise<string> {
    let content = await getNextIdea();

    // convert to lowercase
    content = content.toLowerCase();

    // remove spaces before a punctuation
    content = content.replace(/\s([.,!?:;])/g, '$1');

    // capitalize i
    content = content.replace(/\si\s/g, ' I ');

    // remove multiple spaces
    content = content.replace(/\s+/g, ' ');

    return content;
}

function renderSentence(): void {
    let caret = false;
    let formattedSentence = '';

    for (let i = 0; i < sentence.length; i++) {
        if (i < typedText.length) {
            if (typedText[i] === sentence[i]) {
                formattedSentence += `<span class="correct">${sentence[i]}</span>`;
                idx = i + 1;
            } else {
                // the rest of typed text is incorrect
                formattedSentence += `<span class="incorrect">${typedText.slice(i)}</span>`;
                formattedSentence += `<span class="caret">${sentence[i]}</span>`;
                formattedSentence += `<span>${sentence.slice(i + 1)}</span>`;
                i = typedText.length;
                sentenceDiv.innerHTML = formattedSentence;
                return;
            }
        } else {
            if (!caret) {
                formattedSentence += `<span class="caret">${sentence[i]}</span>`;
                caret = true;
            } else {
                formattedSentence += sentence[i];
            }
        }
    }

    sentenceDiv.innerHTML = formattedSentence;
}

async function reset(): Promise<void> {
    typedText = '';
    startTime = null;
    endTime = null;
    idx = 0;
    incorrect = 0;
    isHandlingKeydown = false;
    sentence = await getNextSentence();
    renderSentence();
}

function calculateStats(): void {
    const timeTaken = (endTime!.getTime() - startTime!.getTime()) / 1000 / 60; // time in minutes
    const charactersTyped = sentence.length;
    const wordsTyped = charactersTyped / 5; // average word length is 5 characters
    const wpm = Math.round(wordsTyped / timeTaken);

    wpms.push(wpm);
    // wpmDiv.textContent = `wpm: ${wpm}`;

    const medianWpm = getMedian(wpms);
    medianWpmDiv.textContent = `median wpm: ${medianWpm}`;
    (document.getElementById('typingStats') as HTMLElement).style.visibility = 'visible';

    const correct = sentence.length;
    const accuracy = Math.round((correct / (correct + incorrect)) * 100);
    accuracyDiv.textContent = `accuracy: ${accuracy}%`;
}

function getMedian(values: number[]): number {
    const sortedValues = [...values].sort((a, b) => a - b);
    return sortedValues[Math.floor(sortedValues.length / 2)];
}

function handleEnterKey(): Promise<void> {
    return reset();
}

function handleSpaceKey(): void {
    typedText += ' ';
}

function handleControlBackspace(): void {
    let i = typedText.length - 1;
    while (i >= 0 && typedText[i] == ' ') {
        i--;
    }
    while (i >= 0 && typedText[i] !== ' ') {
        i--;
    }
    typedText = typedText.slice(0, i + 1);
}

function handleBackspace(): void {
    typedText = typedText.slice(0, -1);
}

function handleCharacterKey(key: string): void {
    typedText += key;
    if (key !== sentence[idx]) {
        incorrect++;
    }
}

function startTimerIfNeeded(): void {
    if (!startTime) {
        startTime = new Date();
    }
}

async function checkCompletion(): Promise<void> {
    if (typedText.length === sentence.length && typedText === sentence) {
        endTime = new Date();
        calculateStats();
        // wait for 400ms before resetting
        await new Promise(resolve => setTimeout(resolve, 400));
        await reset();
    }
}

async function handleKeydown(event: KeyboardEvent): Promise<void> {
    event.preventDefault();

    if (isHandlingKeydown) return;
    isHandlingKeydown = true;

    try {
        if (event.key === "Enter") {
            await handleEnterKey();
        } else if (event.key === 'Space') {
            handleSpaceKey();
        } else if ((event.ctrlKey || event.altKey || event.metaKey) && event.key === 'Backspace' && typedText.length > 0) {
            handleControlBackspace();
        } else if (event.key === 'Backspace') {
            handleBackspace();
        } else if (event.key.length === 1) {
            handleCharacterKey(event.key);
        } else {
            isHandlingKeydown = false;
            return;
        }

        startTimerIfNeeded();
        renderSentence();
        await checkCompletion();

    } finally {
        isHandlingKeydown = false;
    }
}

document.addEventListener('DOMContentLoaded', init);
