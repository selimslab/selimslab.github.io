interface ClockColors {
    dial: string;
    marks: string;
    hands: string;
    highlight: string;
}

interface ClockConfig {
    radius: number;
    center: { x: number; y: number };
    colors: ClockColors;
    opacities: { marks: number; miniMarks: number; labels: number; dial: number };
    sizes: {
        markWidth: number;
        markLength: number;
        handWidth: number;
        centerDotSize: number;
        handCircleRadius: number;
        labelFontSize: number;
        labelPadding: number;
    };
    clockTypes: Record<string, ClockSetup>;
}

interface ClockSetup {
    segmentNames: string[];
    markCount: number;
}

interface ClockOptions {
    id?: string;
    type?: string;
}

interface Point {
    x: number;
    y: number;
}

const TAU = 2 * Math.PI;

const CLOCK_CONFIG: ClockConfig = {
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
            markCount: 48
        },
        month: {
            segmentNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            markCount: 48
        },
        year: {
            segmentNames: ['2000', '', '2010', '', '2020', '', '2030', '', '2040', '', '2050', ''],
            markCount: 60
        },
        decimal: {
            segmentNames: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            markCount: 100
        },
        decade: {
            segmentNames: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', ''],
            markCount: 20
        },
        century: {
            segmentNames: ['1200', '', '', '1500', '', '', '1800', '', '', '2100', '', '', ''],
            markCount: 48
        },
        millennia: {
            segmentNames: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
            markCount: 60
        }
    }
};

const POSITION_FUNCTIONS: Record<string, () => number> = {
    'hour': getHourPosition,
    'month': getMonthPosition,
    'year': getYearPosition,
    'decimal': getDecimalPosition,
    'decade': getDecadePosition,
    'century': getCenturyPosition,
    'millennia': getMillenniaPosition
};

function getCurrentPosition(type: string): number {
    return (POSITION_FUNCTIONS[type] || POSITION_FUNCTIONS['year'])();
}

function getClockSetup(type: string): ClockSetup {
    return CLOCK_CONFIG.clockTypes[type] || CLOCK_CONFIG.clockTypes.year;
}

function drawLine(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, color: string, width: number, opacity = 1.0): void {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, fill = true, opacity = 1.0): void {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, TAU);
    ctx.globalAlpha = opacity;

    if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, fontSize: number, opacity = 1.0): void {
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = opacity;
    ctx.fillText(text, x, y);
}

function getPointFromAngle(center: Point, angle: number, distance: number): Point {
    return {
        x: center.x + distance * Math.sin(angle),
        y: center.y - distance * Math.cos(angle)
    };
}

function getHourPosition(): number {
    const now = moment();
    const hour = now.hour() % 12;
    const minute = now.minute();
    const second = now.second();
    return ((hour * 60 + minute + second / 60) / 720) * TAU;
}

function getMonthPosition(): number {
    const now = moment();
    const month = now.month();
    const day = now.date();
    return (month + day / now.daysInMonth()) / 12 * TAU;
}

function getYearPosition(): number {
    const now = moment();
    const year = now.year();
    const month = now.month();
    const day = now.date();
    const yearsSince2000 = year - 2000;
    const fractionOfYear = (month * 30 + day) / 365;
    return ((yearsSince2000 + fractionOfYear) / 60) * TAU;
}

function getDecimalPosition(): number {
    return 0;
}

function getDecadePosition(): number {
    const now = moment();
    const year = now.year();
    const month = now.month();
    return (year + month / 12 - 2000) / 100 * TAU;
}

function getCenturyPosition(): number {
    const now = moment();
    const year = now.year();
    const month = now.month();
    return (year + month / 12 - 1200) / 1200 * TAU;
}

function getMillenniaPosition(): number {
    return moment().year() / 12000 * TAU;
}

function drawClockDial(ctx: CanvasRenderingContext2D, config: ClockConfig, clockSetup: ClockSetup): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawCircle(ctx, config.center.x, config.center.y, config.radius, config.colors.dial, false, config.opacities.dial);

    const segmentCount = clockSetup.segmentNames.length;
    for (let segment = 0; segment < segmentCount; segment++) {
        drawMarks(ctx, config, clockSetup, segment / segmentCount);
    }

    drawMiniMarks(ctx, config, clockSetup);
}

function drawMarks(ctx: CanvasRenderingContext2D, config: ClockConfig, clockSetup: ClockSetup, fraction: number): void {
    const { sizes, colors, opacities } = config;
    const segmentAngle = fraction * TAU;

    const innerPoint = getPointFromAngle(config.center, segmentAngle, config.radius - sizes.markLength);
    const outerPoint = getPointFromAngle(config.center, segmentAngle, config.radius - sizes.markLength / 2);

    drawLine(ctx, innerPoint.x, innerPoint.y, outerPoint.x, outerPoint.y, colors.marks, sizes.markWidth, opacities.marks);

    const labelPoint = getPointFromAngle(config.center, segmentAngle, config.radius - sizes.markLength - sizes.labelPadding);
    const segmentIndex = Math.round(fraction * clockSetup.segmentNames.length) % clockSetup.segmentNames.length;
    drawText(ctx, clockSetup.segmentNames[segmentIndex], labelPoint.x, labelPoint.y, colors.marks, sizes.labelFontSize, opacities.labels);
}

function drawMiniMarks(ctx: CanvasRenderingContext2D, config: ClockConfig, clockSetup: ClockSetup): void {
    const { sizes, colors, opacities } = config;

    for (let i = 0; i < clockSetup.markCount; i++) {
        const angle = (i / clockSetup.markCount) * TAU;
        const innerPoint = getPointFromAngle(config.center, angle, config.radius - sizes.markLength);
        const outerPoint = getPointFromAngle(config.center, angle, config.radius - sizes.markLength * 0.5);
        drawLine(ctx, innerPoint.x, innerPoint.y, outerPoint.x, outerPoint.y, colors.marks, sizes.markWidth, opacities.miniMarks);
    }
}

function drawHand(ctx: CanvasRenderingContext2D, config: ClockConfig, angle: number): void {
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
    const circlePoint = getPointFromAngle(config.center, angle, handLength * tip);
    drawCircle(ctx, circlePoint.x, circlePoint.y, circleRadius, colors.highlight, true, 1.0);
}

function drawCenterDot(ctx: CanvasRenderingContext2D, config: ClockConfig): void {
    const dotSize = Math.max(2, Math.min(4, config.radius / 75));
    drawCircle(ctx, config.center.x, config.center.y, dotSize, config.colors.dial, true, 1.0);
}

function syncThemeColors(config: ClockConfig): void {
    const bodyColor = window.getComputedStyle(document.body).color;
    const isDarkTheme = document.documentElement.getAttribute('data-theme') !== 'light';

    config.colors = {
        dial: bodyColor,
        marks: bodyColor,
        hands: bodyColor,
        highlight: isDarkTheme ? '#ffc800' : '#FF530D'
    };
}

function updateClock(ctx: CanvasRenderingContext2D, config: ClockConfig, clockSetup: ClockSetup, type: string): void {
    drawClockDial(ctx, config, clockSetup);

    const currentAngle = getCurrentPosition(type);
    drawHand(ctx, config, currentAngle);
    drawCenterDot(ctx, config);

    requestAnimationFrame(() => updateClock(ctx, config, clockSetup, type));
}

let themeObserver: MutationObserver | null = null;

function draw_clock(options: ClockOptions): void {
    const id = options.id || 'default';
    const type = options.type || 'year';

    const canvas = document.getElementById(`clockCanvas-${id}`) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    ctx.lineCap = 'round';

    const config = { ...CLOCK_CONFIG, center: { x: CLOCK_CONFIG.radius, y: CLOCK_CONFIG.radius } };
    const clockSetup = getClockSetup(type);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.height = config.radius * 2 * dpr;
    ctx.scale(dpr, dpr);

    syncThemeColors(config);

    themeObserver?.disconnect();
    themeObserver = new MutationObserver(() => syncThemeColors(config));
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    updateClock(ctx, config, clockSetup, type);
}
