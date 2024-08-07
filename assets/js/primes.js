function sieveOfEratosthenes(limit) {
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (let multiple = p * p; multiple <= limit; multiple += p) {
                isPrime[multiple] = false;
            }
        }
    }

    return isPrime.reduce((primes, value, index) => {
        if (value) primes.push(index);
        return primes;
    }, []);
}

function findLimitForNPrimes(n) {
    return Math.round(n * Math.log(n) * 1.2);
}

function drawPrimes(primes, scale) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const angleStep = 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(scale, 0, 0, scale, centerX, centerY); // Apply scaling transformation

    ctx.font = '1rem'; // Set font size
    ctx.fillStyle = 'green'; // Set text color to green

    for (let i = 0; i < primes.length; i++) {
        const prime = primes[i];
        const angle = angleStep * i;
        const radius = Math.sqrt(prime) * 1;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        ctx.fillText('.', x, y); // Draw the dot character
    }
}

function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Adjust canvas size on window resize
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial canvas size setup

let scale = 1;
const n = 10000;
const limit = findLimitForNPrimes(n);
const primes = sieveOfEratosthenes(limit).slice(0, n);

// Redraw on zoom
window.addEventListener('wheel', (event) => {
    if (event.deltaY < 0) {
        scale *= 1.1; // Zoom in
    } else {
        scale /= 1.1; // Zoom out
    }
    drawPrimes(primes, scale);
});

drawPrimes(primes, scale);