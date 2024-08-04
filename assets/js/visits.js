let startTime = Date.now();

async function saveVisit() {
    let apiBase = "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-4811387a-058d-4186-8e02-bf1535946a8a/default/visit";
    let api = new URL(apiBase);
    api.searchParams.append('path', window.location.pathname);
    // let durationSeconds = (Date.now() - startTime) / 1000;
    // durationSeconds = Math.round(durationSeconds);
    // console.log(`Duration: ${durationSeconds} seconds`);
    // api.searchParams.append('duration', durationSeconds);
    let response = await fetch(api);
    let data = await response.json();
    console.log(data);
}

window.addEventListener('beforeunload', async () => {
    await saveVisit();
});