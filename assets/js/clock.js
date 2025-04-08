// Clock Configuration
function createClockConfig() {
    return {
        radius: 0,
        center: { x: 0, y: 0 },
        colors: {
            dial: 'currentColor',
            marks: 'currentColor',
            hands: 'currentColor',
            highlight: 'red'
        },
        opacities: {
            marks: 1,
            labels: 0.9
        },
        sizes: {
            markWidth: 1,
            markLength: 20,
            handWidth: 1,
            handLength: 0.8,
            centerDotSize: 3,
            handCircleRadius: 0.016,
            labelFontSize: '0.6rem',
            labelRadius: 0.8,
            labelPadding: 20
        }
    };
}

function getCurrentPosition(type) {
    const positionFunctions = {
        'hour': getHourPosition,
        'month': getMonthPosition,
        'year': getYearPosition,
        'decimal': getDecimalPosition,
        'decade': getDecadePosition,
        'century': getCenturyPosition,
        'millennia': getMillenniaPosition
    };
    
    const positionFunction = positionFunctions[type] || positionFunctions['year'];
    return positionFunction();
}

function getClockSetup(type) {
    const setupFunctions = {
        'hour': getHourClockSetup,
        'month': getMonthClockSetup,
        'year': getYearClockSetup,
        'decimal': getDecimalClockSetup,
        'decade': getDecadeClockSetup,
        'century': getCenturyClockSetup,
        'millennia': getMillenniaClockSetup,
    };
    
    const setupFunction = setupFunctions[type]
    return setupFunction();
}

function drawLine(ctx, startX, startY, endX, endY, color, width, opacity = 1.0) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    return ctx;
}

function drawCircle(ctx, x, y, radius, color, fill = true, opacity = 1.0) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.globalAlpha = opacity;

    if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    return ctx;
}

function drawText(ctx, text, x, y, color, fontSize, opacity = 1.0) {
    // Convert rem to pixels
    let pixelSize;
    if (typeof fontSize === 'string' && fontSize.endsWith('rem')) {
        const remValue = parseFloat(fontSize);
        // 1rem = 16px (browser default)
        pixelSize = remValue * 16;
    } else {
        pixelSize = fontSize;
    }
    
    ctx.font = `${pixelSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = opacity;
    ctx.fillText(text, x, y);
    return ctx;
}

function getPointFromAngle(center, angle, distance) {
    return {
        x: center.x + distance * Math.sin(angle),
        y: center.y - distance * Math.cos(angle)
    };
}

// Clock Type Setup Functions
function getHourClockSetup() {
    return {
        segmentNames: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        segmentCount: 12,
        segmentFractions: Array.from({length: 12}, (_, i) => i / 12),
        marks: Array.from({length: 48}, (_, i) => i)
    };
}

function getMonthClockSetup() {
    return {
        segmentNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        segmentCount: 12,
        segmentFractions: Array.from({length: 12}, (_, i) => i / 12),
        marks: Array.from({length: 48}, (_, i) => i)
    };
}

function getYearClockSetup() {
    return {
        segmentNames: ['2000', '', '2010','','2020', '','2030','', '2040','', '2050', '',],
        segmentCount: 12,
        segmentFractions: Array.from({length: 12}, (_, i) => i / 12),
        marks: Array.from({length: 60}, (_, i) => i)
    };
}


function getDecimalClockSetup() {
    return {
        segmentNames: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        segmentCount: 10,
        segmentFractions: Array.from({length: 10}, (_, i) => i / 10),
        marks: Array.from({length: 100}, (_, i) => i)
    };
}

function getDecadeClockSetup() {
    return {
        segmentNames: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', ''],
        segmentCount: 10,
        segmentFractions: Array.from({length: 10}, (_, i) => i / 10),
        marks: Array.from({length: 100}, (_, i) => i)
    };
}

function getCenturyClockSetup() {
    return {
        segmentNames: ['1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', ''],
        segmentCount: 12,
        segmentFractions: Array.from({length: 12}, (_, i) => i / 12),
        marks: Array.from({length: 60}, (_, i) => i)
    };
}

function getMillenniaClockSetup() {
    return {
        segmentNames: ['0 CE', '', '', '3000', '', '', '6000 BC', '', '', '3000 BC', '', '', ''],
        segmentCount: 12,
        segmentFractions: Array.from({length: 12}, (_, i) => i / 12),
        marks: Array.from({length: 60}, (_, i) => i)
    };
}


// Position Calculation Functions
function getHourPosition() {
    const now = moment();
    const hour = now.hour() % 12;
    const minute = now.minute();
    const second = now.second();
    return ((hour * 60 + minute + second/60) / 720) * 2 * Math.PI;
}

function getMonthPosition() {
    const now = moment();
    const month = now.month(); // 0-11
    const day = now.date(); // 1-31
    
    return (month + day / now.daysInMonth()) / 12 * 2 * Math.PI;
}

function getYearPosition() {
    const now = moment();
    const year = now.year();
    const month = now.month();
    const day = now.date();
    
    const yearsSince2000 = year - 2000;
    const fractionOfYear = (month * 30 + day) / 365;
    
    return ((yearsSince2000 + fractionOfYear) / 60) * 2 * Math.PI;
}

function getDecimalPosition() {
    return 0;
}

function getDecadePosition() {
    const year = moment().year();
    return (year-2000)/100 * 2 * Math.PI;
}

function getCenturyPosition() {
    const year = moment().year();
    return (year-1200)/1200 * 2 * Math.PI;
}

function getMillenniaPosition() {
    const year = moment().year();
    return (year)/12000 * 2 * Math.PI;
}



// Draw the clock components
function drawClockDial(ctx, config, clockSetup, type) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawCircle(
        ctx,
        config.center.x,
        config.center.y,
        config.radius,
        config.colors.dial,
        false,
        0.5
    );

    // Draw main segments
    for (let segment = 0; segment < clockSetup.segmentCount; segment++) {
        drawSegmentMark(ctx, config, clockSetup, segment);
    }
    
    drawMarks(ctx, config, clockSetup);
}



function drawSegmentMark(ctx, config, clockSetup, segment) {
    const { sizes, colors, opacities } = config;
    const segmentAngle = clockSetup.segmentFractions[segment] * 2 * Math.PI;

    const innerPoint = getPointFromAngle(config.center, segmentAngle, config.radius - sizes.markLength);
    const outerPoint = getPointFromAngle(config.center, segmentAngle, config.radius - sizes.markLength / 1.8);

    drawLine(
        ctx,
        innerPoint.x, innerPoint.y,
        outerPoint.x, outerPoint.y,
        colors.marks,
        sizes.markWidth,
        opacities.marks
    );

    const labelPoint = getPointFromAngle(
        config.center,
        segmentAngle,
        config.radius - sizes.markLength - sizes.labelPadding
    );

    drawText(
        ctx,
        clockSetup.segmentNames[segment],
        labelPoint.x, labelPoint.y,
        colors.marks,
        sizes.labelFontSize,
        opacities.marks
    );
}

function drawMarks(ctx, config, clockSetup) {
    const { sizes, colors, opacities } = config;
    
    for (let i = 0; i < clockSetup.marks.length; i++) {
        let angle = (i / clockSetup.marks.length) * 2 * Math.PI;
        
        const innerPoint = getPointFromAngle(config.center, angle, config.radius - sizes.markLength/1.2);
        const outerPoint = getPointFromAngle(config.center, angle, config.radius - sizes.markLength);
        
        drawLine(
            ctx,
            innerPoint.x, innerPoint.y,
            outerPoint.x, outerPoint.y,
            colors.marks, 
            1,
            opacities.marks * 0.5
        );
    }
}

function drawHand(ctx, config, angle) {
    const { sizes, colors } = config;
    const handLength = config.radius * sizes.handLength;

    const tip = 0.9;
    const handStart = getPointFromAngle(config.center, angle, handLength * -0.12);
    const handPoint = getPointFromAngle(config.center, angle, handLength * tip);
    const handEnd = getPointFromAngle(config.center, angle, handLength);

    drawLine(
        ctx,
        config.center.x, config.center.y,
        handStart.x, handStart.y,
        colors.hands,
        sizes.handWidth,
        1.0
    );

    drawLine(
        ctx,
        config.center.x, config.center.y,
        handPoint.x, handPoint.y,
        colors.hands,
        sizes.handWidth,
        1.0
    );

    drawLine(
        ctx,
        handPoint.x, handPoint.y,
        handEnd.x, handEnd.y,
        colors.highlight,
        sizes.handWidth * 0.8,
        1.0
    );

    const circleRadius = config.radius * sizes.handCircleRadius;
    const circleDistance = handLength * tip;
    const circlePoint = getPointFromAngle(config.center, angle, circleDistance);

    drawCircle(
        ctx,
        circlePoint.x, circlePoint.y,
        circleRadius,
        colors.highlight,
        true,
        1.0
    );
}

function drawCenterDot(ctx, config) {
    const dotSize = Math.max(2, Math.min(4, config.radius / 75));

    drawCircle(
        ctx,
        config.center.x, config.center.y,
        dotSize,
        config.colors.dial,
        true,
        1.0
    );
}

function updateThemeColors(config) {
    const bodyColor = window.getComputedStyle(document.body).color;
    const isDarkTheme = document.documentElement.getAttribute('data-theme') !== 'light';

    config.colors = {
        dial: bodyColor,
        marks: bodyColor,
        hands: bodyColor,
        highlight: isDarkTheme ? '#ffc800' : '#FF530D'
    };
    
    return config;
}

// Main function to resize the canvas
function resizeCanvas(canvas, config) {
    const container = canvas.parentElement;
    const size = Math.min(container.clientWidth, container.clientHeight);
    const dpr = window.devicePixelRatio || 1;
    
    // Set display size (CSS pixels)
    canvas.style.width = canvas.style.height = `${size}px`;
    
    // Set actual size (scaled for high DPI)
    canvas.width = canvas.height = size * dpr;
    
    // Scale rendering for high DPI
    canvas.getContext('2d').scale(dpr, dpr);
    
    // Update config with new dimensions
    config.radius = size * 0.45;
    config.center = { x: size / 2, y: size / 2 };
    
    return config;
}

// Main function to update the clock
function updateClock(ctx, config, clockSetup, type) {
    config = updateThemeColors(config);
    drawClockDial(ctx, config, clockSetup, type);
    
    ctx.lineCap = 'round';
    const currentAngle = getCurrentPosition(type);
    drawHand(ctx, config, currentAngle);
    drawCenterDot(ctx, config);
    
    requestAnimationFrame(() => updateClock(ctx, config, clockSetup, type));
}

// Initialize and start a clock
function initClock(options) {
    const id = options.id || 'default';
    const type = options.type || 'year';
    
    const canvas = document.getElementById(`clockCanvas-${id}`);
    const ctx = canvas.getContext('2d');
    
    // Initialize config
    let config = createClockConfig();
    
    // Set up clock type
    const clockSetup = getClockSetup(type);
    
    // Resize and start
    config = resizeCanvas(canvas, config);
    
    // Add resize event listener
    window.addEventListener('resize', () => {
        config = resizeCanvas(canvas, config);
    });
    
    // Start the clock
    updateClock(ctx, config, clockSetup, type);
}

// Main function to draw a clock
function draw_clock(options) {
    initClock(options);
}