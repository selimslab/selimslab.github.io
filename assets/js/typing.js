

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

    // remove ; and : and . and ! and ? and " 
    content = content.replace(/[;:.!?"]/g, '');

    return content;
}

document.addEventListener('DOMContentLoaded', async () => {
    let sentence = await getNextSentence();
    const sentenceDiv = document.getElementById('sentence');
    const wpmDiv = document.getElementById('wpm');

    let typedText = '';
    let startTime = null;
    let endTime = null;
    let isHandlingKeydown = false;

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
        } else if (event.key.length === 1 && event.key.match(/^[a-zA-Z0-9, ]$/)) {
            // only add the character if it is a letter or number or space or comma 
            typedText += event.key;
        }  else {
            isHandlingKeydown = false
            return;
        }

        renderSentence();
        console.log("typedText:", typedText);
        console.log("sentence:", sentence);

        if (typedText === sentence) {
            endTime = new Date();
            const timeTaken = (endTime - startTime) / 1000 / 60; // time in minutes
            const charactersTyped = sentence.length;
            const wordsTyped = charactersTyped / 5; // average word length is 5 characters
            const wpm = Math.round(wordsTyped / timeTaken);
            wpmDiv.textContent = `wpm: ${wpm}`;
            await reset();
        } else if (typedText.length === sentence.length) {
            console.error("typedText:", typedText);
            console.error("sentence:", sentence);
        }

        isHandlingKeydown = false;

    });

    reset();
});
