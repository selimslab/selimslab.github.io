(function() {
    function modifyUrl() {
        let r = new URL(window.location.href);
        console.log(`modifying url: ${r.href}`);
        if (r.hostname.includes("stackexchange")){
            // trim trailing slash
            r.pathname = r.pathname.replace(/\/$/, '');
            r.pathname = `${r.pathname}/questions`;
            r.searchParams.set('tab', 'Votes');
            window.location.href = r.href;
        }
    }

    document.addEventListener('keydown', function(event) {
        console.log(`key pressed: ${event.key}`);
        if (event.shiftKey && (event.key === 'T' || event.key === 't')) {
            modifyUrl();
        }
    });
})();