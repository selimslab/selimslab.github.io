async function getNextSentence() {
    content = await getNextIdea();

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

document.addEventListener('DOMContentLoaded', async () => {
    let sentence = '';
    let typedText = '';

    const sentenceDiv = document.getElementById('sentence');
    const wpmDiv = document.getElementById('wpm');
    const medianWpmDiv = document.getElementById('medianWpm');
    const accuracyDiv = document.getElementById('typingAccuracy');

    let wpms = [];

    let startTime = null;
    let endTime = null;
    let idx = 0;
    let incorrect = 0;
    let isHandlingKeydown = false;

    function renderSentence() {
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
                    return
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

    async function reset() {
        typedText = '';
        startTime = null;
        endTime = null;
        idx = 0;
        incorrect = 0;
        isHandlingKeydown = false;
        sentence = await getNextSentence();
        renderSentence()
    }


    document.addEventListener('keydown', async (event) => {
        if (isHandlingKeydown) return;
        isHandlingKeydown = true;

        if (!startTime) {
            startTime = new Date();
        }

        if (event.key === "Enter") {
            reset();
            {
                if (event.ctrlKey && event.key === 'Backspace' && typedText.length > 0) {
                    let i = typedText.length - 1;
                    while (i >= 0 && typedText[i] !== ' ') {
                        i--;
                    }
                    typedText = typedText.slice(0, i + 1);
                } else if (event.key === 'Backspace') {
                    typedText = typedText.slice(0, -1);
                } else if (event.key.length === 1) {
                    typedText += event.key;
                    if (event.key !== sentence[idx]) {
                        incorrect++;
                    }
                } else {
                    isHandlingKeydown = false
                    return;
                }

                renderSentence();

                if (typedText.length === sentence.length && typedText === sentence) {
                    endTime = new Date();
                    const timeTaken = (endTime - startTime) / 1000 / 60; // time in minutes
                    const charactersTyped = sentence.length;
                    const wordsTyped = charactersTyped / 5; // average word length is 5 characters
                    const wpm = Math.round(wordsTyped / timeTaken);
                    wpms.push(wpm);
                    wpmDiv.textContent = `wpm: ${wpm}`;
                    medianWpm = wpms.sort()[Math.floor(wpms.length / 2)];
                    medianWpmDiv.textContent = `median wpm: ${medianWpm}`;
                    let correct = sentence.length;
                    let accuracy = Math.round((correct / (correct + incorrect)) * 100);
                    accuracyDiv.textContent = `accuracy: ${accuracy}%`;
                    // wait for 1 second before resetting
                    await new Promise(resolve => setTimeout(resolve, 400));
                    await reset();
                }
                isHandlingKeydown = false;

            });

    reset();
});
