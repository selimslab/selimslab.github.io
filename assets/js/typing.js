



async function getNextSentence() {
    content = await getNextIdea();
    // convert to lowercase
    content = content.toLowerCase();
    // capitalize i 
    content = content.replace(/\si\s/g, ' I ');
    // capitalize first letter of the sentence
    content = content.charAt(0).toUpperCase() + content.slice(1);

    // turn new lines into commas 
    content = content.replace(/\n/g, ',');
    // remove if a space before a comma
    content = content.replace(/ ,/g, ',');
    // remove double commas 
    content = content.replace(/,,/g, ',');

    return content;
}

document.addEventListener('DOMContentLoaded', async () => {
    let sentence = await getNextSentence();
    const sentenceDiv = document.getElementById('sentence');
    const wpmDiv = document.getElementById('wpm');
    const medianWpmDiv = document.getElementById('medianWpm');
    const accuracyDiv = document.getElementById('typingAccuracy');

    let wpms = [];
    let typedText = '';
    let startTime = null;
    let endTime = null;
    let isHandlingKeydown = false;
    let correct = 0;
    let incorrect = 0;
    let idx = 0;

    function renderSentence() {
        let formattedSentence = '';

        for (let i = 0; i < sentence.length; i++) {
            if (i < typedText.length) {
                if (typedText[i] === sentence[i]) {
                    formattedSentence += `<span class="correct">${sentence[i]}</span>`;
                } else {
                    formattedSentence += `<span class="incorrect">${sentence[i]}</span>`;
                }
            } else {
                formattedSentence += sentence[i];
            }
        }

        sentenceDiv.innerHTML = formattedSentence;
    }

    async function reset() {
        sentence = await getNextSentence();
        typedText = '';
        startTime = null;
        endTime = null;
        sentenceDiv.textContent = sentence;
        idx = 0;
        isHandlingKeydown = false;
        correct = 0;
        incorrect = 0;
    }


    document.addEventListener('keydown', async (event) => {
        if (isHandlingKeydown) return;
        isHandlingKeydown = true;
        console.log("event.key:", event.key);
        
        if (!startTime) {
            startTime = new Date();
        }

        if (event.key === 'Backspace') {
            typedText = typedText.slice(0, -1);
        } else if (event.key.length === 1 && event.key.match(/^[a-zA-Z0-9'",;.:?!\/ ]$/)) {
            // only add the character if it is a letter or number or space or comma 
            typedText += event.key;
            expectedChar = sentence[idx];
            if (event.key === expectedChar) {
                correct++;
                idx++;
            } else {
                incorrect++;
            }
        }  else {
            isHandlingKeydown = false
            return;
        }

        renderSentence();
        console.log("typedText:", typedText);
        console.log("sentence:", sentence);

        if (typedText.length === sentence.length) {
            endTime = new Date();
            const timeTaken = (endTime - startTime) / 1000 / 60; // time in minutes
            const charactersTyped = sentence.length;
            const wordsTyped = charactersTyped / 5; // average word length is 5 characters
            const wpm = Math.round(wordsTyped / timeTaken);
            wpms.push(wpm);
            wpmDiv.textContent = `wpm: ${wpm}`;
            medianWpm = wpms.sort()[Math.floor(wpms.length / 2)];
            medianWpmDiv.textContent = `median wpm: ${medianWpm}`;
            let accuracy = Math.round((correct / (correct + incorrect)) * 100);
            accuracyDiv.textContent = `accuracy: ${accuracy}%`;
            // wait for 1 second before resetting
            await new Promise(resolve => setTimeout(resolve, 1000));
            await reset();
        }
        isHandlingKeydown = false;

    });

    reset();
});
