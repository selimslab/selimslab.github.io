let lines: string[] | null = null;
let lineIndex = 0;

const shuffle = (arr: string[]): void => {
    for (let k = arr.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [arr[k], arr[j]] = [arr[j], arr[k]];
    }
}

const readLines = async (): Promise<void> => {
    if (!lines) {
        try {
            const corpus = await fetch(`/assets/data/lines.md`, { cache: "force-cache" });
            const text = await corpus.text();
            lines = text.split("\n")
                .map(l => l
                    .toLowerCase()
                    .replace(/#/g, '')
                    .replace(/\s([.,!?:;])/g, '$1') // no space before punctuation
                    .replace(/\si\s/g, ' I ')
                    .replace(/\s+/g, ' ')
                    .trim()
                )
                .filter(l => l.length > 0);
            shuffle(lines);
        } catch (error) {
            console.error("Error fetching ideas:", error);
            return;
        }
    }
}

const getNextLine = async (): Promise<string> => {
    await readLines();
    if (!lines || lines.length === 0) return "";
    const line = lines[lineIndex];
    lineIndex = (lineIndex + 1) % lines.length;
    return line;
}

let sentence = '';
let typedText = '';
let isHandlingKeydown = false;
let sentenceDiv: HTMLElement;

async function init(): Promise<void> {
    sentenceDiv = document.getElementById('sentence')!;
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', reset);
    await reset();
}

function renderSentence(): void {
    // length of the correctly typed prefix
    let i = 0;
    while (i < typedText.length && typedText[i] === sentence[i]) i++;

    let html = i > 0 ? `<span class="correct">${sentence.slice(0, i)}</span>` : '';

    if (i < typedText.length) {
        html += `<span class="incorrect">${typedText.slice(i)}</span>`;
    }
    if (i < sentence.length) {
        // no caret before typing starts
        html += typedText.length > 0 ? `<span class="caret">${sentence[i]}</span>` : sentence[i];
        html += sentence.slice(i + 1);
    }

    sentenceDiv.innerHTML = html;
}

async function reset(): Promise<void> {
    typedText = '';
    isHandlingKeydown = false;
    sentence = await getNextLine();
    renderSentence();
}

function deleteLastWord(): void {
    let i = typedText.length - 1;
    while (i >= 0 && typedText[i] === ' ') i--;
    while (i >= 0 && typedText[i] !== ' ') i--;
    typedText = typedText.slice(0, i + 1);
}

async function handleKeydown(event: KeyboardEvent): Promise<void> {
    event.preventDefault();

    if (isHandlingKeydown) return;
    isHandlingKeydown = true;

    try {
        if (event.key === 'Enter') {
            await reset();
        } else if ((event.ctrlKey || event.altKey || event.metaKey) && event.key === 'Backspace') {
            deleteLastWord();
        } else if (event.key === 'Backspace') {
            typedText = typedText.slice(0, -1);
        } else if (event.key.length === 1) {
            typedText += event.key;
        } else {
            return;
        }

        renderSentence();

        if (typedText === sentence) {
            // pause on the completed sentence before moving on
            await new Promise(resolve => setTimeout(resolve, 400));
            await reset();
        }
    } finally {
        isHandlingKeydown = false;
    }
}

document.addEventListener('DOMContentLoaded', init);
