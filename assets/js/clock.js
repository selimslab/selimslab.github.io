"use strict";
const CLOCK_CONFIG = {
    radius: 144,
    center: { x: 0, y: 0 },
    colors: {
        dial: 'currentColor',
        marks: 'currentColor',
        hands: 'currentColor',
        highlight: 'red'
    },
    opacities: {
        marks: 1,
        miniMarks: 0.48,
        labels: 1,
        dial: 0
    },
    sizes: {
        markWidth: 1.6,
        markLength: 16,
        handWidth: 1.6,
        centerDotSize: 3,
        handCircleRadius: 0.0144,
        labelFontSize: 14,
        labelPadding: 24
    },
    clockTypes: {
        hour: {
            segmentNames: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
            segmentCount: 12,
            segmentFractions: Array.from({ length: 12 }, (_, i) => i / 12),
            markCount: 48
        },
        month: {
            segmentNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            segmentCount: 12,
            segmentFractions: Array.from({ length: 12 }, (_, i) => i / 12),
            markCount: 48
        },
        year: {
            segmentNames: ['2000', '', '2010', '', '2020', '', '2030', '', '2040', '', '2050', ''],
            segmentCount: 12,
            segmentFractions: Array.from({ length: 12 }, (_, i) => i / 12),
            markCount: 60
        },
        decimal: {
            segmentNames: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            segmentCount: 10,
            segmentFractions: Array.from({ length: 10 }, (_, i) => i / 10),
            markCount: 100
        },
        decade: {
            segmentNames: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', ''],
            segmentCount: 10,
            segmentFractions: Array.from({ length: 10 }, (_, i) => i / 10),
            markCount: 20
        },
        century: {
            segmentNames: ['1200', '', '', '1500', '', '', '1800', '', '', '2100', '', '', ''],
            segmentCount: 12,
            segmentFractions: Array.from({ length: 12 }, (_, i) => i / 12),
            markCount: 48
        },
        millennia: {
            segmentNames: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
            segmentCount: 12,
            segmentFractions: Array.from({ length: 12 }, (_, i) => i / 12),
            markCount: 60
        }
    }
};
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
    return CLOCK_CONFIG.clockTypes[type] || CLOCK_CONFIG.clockTypes.year;
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
    }
    else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    return ctx;
}
function drawText(ctx, text, x, y, color, fontSize, opacity = 1.0) {
    ctx.font = `${fontSize}px sans-serif`;
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
function getHourPosition() {
    const now = moment();
    const hour = now.hour() % 12;
    const minute = now.minute();
    const second = now.second();
    return ((hour * 60 + minute + second / 60) / 720) * 2 * Math.PI;
}
function getMonthPosition() {
    const now = moment();
    const month = now.month();
    const day = now.date();
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
    const now = moment();
    const year = now.year();
    const month = now.month();
    return (year + month / 12 - 2000) / 100 * 2 * Math.PI;
}
function getCenturyPosition() {
    const now = moment();
    const year = now.year();
    const month = now.month();
    return (year + month / 12 - 1200) / 1200 * 2 * Math.PI;
}
function getMillenniaPosition() {
    const year = moment().year();
    return (year) / 12000 * 2 * Math.PI;
}
function drawClockDial(ctx, config, clockSetup) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawCircle(ctx, config.center.x, config.center.y, config.radius, config.colors.dial, false, config.opacities.dial);
    for (let segment = 0; segment < clockSetup.segmentCount; segment++) {
        drawMarks(ctx, config, clockSetup, segment);
    }
    drawMiniMarks(ctx, config, clockSetup);
}
function drawMarks(ctx, config, clockSetup, segment) {
    const { sizes, colors, opacities } = config;
    const segmentAngle = clockSetup.segmentFractions[segment] * 2 * Math.PI;
    const innerPoint = getPointFromAngle(config.center, segmentAngle, config.radius - sizes.markLength);
    const outerPoint = getPointFromAngle(config.center, segmentAngle, config.radius - sizes.markLength / 2);
    drawLine(ctx, innerPoint.x, innerPoint.y, outerPoint.x, outerPoint.y, colors.marks, sizes.markWidth, opacities.marks);
    const labelPoint = getPointFromAngle(config.center, segmentAngle, config.radius - sizes.markLength - sizes.labelPadding);
    drawText(ctx, clockSetup.segmentNames[segment], labelPoint.x, labelPoint.y, colors.marks, sizes.labelFontSize, opacities.labels);
}
function drawMiniMarks(ctx, config, clockSetup) {
    const { sizes, colors, opacities } = config;
    for (let i = 0; i < clockSetup.markCount; i++) {
        const angle = (i / clockSetup.markCount) * 2 * Math.PI;
        const innerPoint = getPointFromAngle(config.center, angle, config.radius - sizes.markLength);
        const outerPoint = getPointFromAngle(config.center, angle, config.radius - sizes.markLength * 0.5);
        drawLine(ctx, innerPoint.x, innerPoint.y, outerPoint.x, outerPoint.y, colors.marks, sizes.markWidth, opacities.miniMarks);
    }
}
function drawHand(ctx, config, angle) {
    const { sizes, colors } = config;
    const handLength = config.radius * (1 - sizes.markLength / config.radius / 2);
    const tip = 0.9;
    const handStart = getPointFromAngle(config.center, angle, handLength * -0.1);
    const handPoint = getPointFromAngle(config.center, angle, handLength * tip);
    const handEnd = getPointFromAngle(config.center, angle, handLength);
    drawLine(ctx, config.center.x, config.center.y, handStart.x, handStart.y, colors.hands, sizes.handWidth, 1.0);
    drawLine(ctx, config.center.x, config.center.y, handPoint.x, handPoint.y, colors.hands, sizes.handWidth, 1.0);
    drawLine(ctx, handPoint.x, handPoint.y, handEnd.x, handEnd.y, colors.highlight, sizes.handWidth * 0.5, 1.0);
    const circleRadius = config.radius * sizes.handCircleRadius;
    const circleDistance = handLength * tip;
    const circlePoint = getPointFromAngle(config.center, angle, circleDistance);
    drawCircle(ctx, circlePoint.x, circlePoint.y, circleRadius, colors.highlight, true, 1.0);
}
function drawCenterDot(ctx, config) {
    const dotSize = Math.max(2, Math.min(4, config.radius / 75));
    drawCircle(ctx, config.center.x, config.center.y, dotSize, config.colors.dial, true, 1.0);
}
function syncThemeColors(config) {
    const bodyColor = window.getComputedStyle(document.body).color;
    const isDarkTheme = document.documentElement.getAttribute('data-theme') !== 'light';
    config.colors = {
        dial: bodyColor,
        marks: bodyColor,
        hands: bodyColor,
        highlight: isDarkTheme ? '#ffc800' : '#FF530D'
    };
}
function updateClock(ctx, config, clockSetup, type) {
    drawClockDial(ctx, config, clockSetup);
    const currentAngle = getCurrentPosition(type);
    drawHand(ctx, config, currentAngle);
    drawCenterDot(ctx, config);
    requestAnimationFrame(() => updateClock(ctx, config, clockSetup, type));
}
function initClock(options) {
    const id = options.id || 'default';
    const type = options.type || 'year';
    const canvas = document.getElementById(`clockCanvas-${id}`);
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    const config = Object.assign(Object.assign({}, CLOCK_CONFIG), { center: { x: CLOCK_CONFIG.radius, y: CLOCK_CONFIG.radius } });
    const clockSetup = getClockSetup(type);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.height = config.radius * 2 * dpr;
    ctx.scale(dpr, dpr);
    syncThemeColors(config);
    const observer = new MutationObserver(() => syncThemeColors(config));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    updateClock(ctx, config, clockSetup, type);
}
function draw_clock(options) {
    initClock(options);
}
