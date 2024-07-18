function animate(element, animation) {
    element.classList.add(animation);
    element.addEventListener('animationend', function() {
        element.classList.remove(animation);
    }, { once: true });
}
