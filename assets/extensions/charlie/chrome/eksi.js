(function() {
    function setNice() {
        let r = new URL(window.location.href);
        if (r.searchParams.get('a') === 'nice') {
            return;
        }
        r.searchParams.set('a', 'nice');
        window.location.href = r.href;
    }

    function setDailyNice() {
        let r = new URL(window.location.href);
        if (r.searchParams.get('a') === 'nice' || r.searchParams.get('a') === 'dailynice') {
            return;
        }
        r.searchParams.set('a', 'dailynice');
        window.location.href = r.href;
    }

    document.addEventListener('keydown', function(event) {
        console.log(`key pressed: ${event.key}`);
        if (event.shiftKey && (event.key === 'T' || event.key === 't')) {
            setNice();
        }
    });

    // on new page load
    setDailyNice();
})();