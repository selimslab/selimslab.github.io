(function() {

    // window.location.href = 'https://leetcode.com/studyplan/top-interview-150/';

    function modifyUrl() {
        let r = new URL(window.location.href);
        console.log(`modifying url: ${r.href}`);
        if (r.hostname === 'www.reddit.com' && r.pathname.startsWith('/r/') && !r.pathname.includes('/top')){
            // trim trailing slash
            r.pathname = r.pathname.replace(/\/$/, '');
            r.pathname = `${r.pathname}/top/`;
            r.searchParams.set('t', 'all');
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