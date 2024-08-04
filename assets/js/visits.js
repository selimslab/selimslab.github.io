let startTime = Date.now();

const apiBase = "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-4811387a-058d-4186-8e02-bf1535946a8a/default";

async function addVisit() {
    let url = new URL(apiBase+"/addVisit");
    url.searchParams.append('path', window.location.pathname);
    await fetch(url);
}

async function getVisit() {
    let url = new URL(apiBase+"/getVisit");
    url.searchParams.append('path', window.location.pathname);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}


window.addEventListener('beforeunload', async () => {
    // await saveVisit();
});