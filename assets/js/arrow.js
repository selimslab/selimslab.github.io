
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        if (window.history.length > 1) {
            window.history.back();
        }
    } else if (e.key === 'ArrowRight') {
        window.history.forward();
    }
});
