interface Point {
    x: number;
    y: number;
}

interface Hand {
    position: () => number;
    color: string;
}

const TAU = 2 * Math.PI;

const RADIUS = 144;
const CENTER: Point = { x: RADIUS, y: RADIUS };
const MARKS = 12;
const MARK_LENGTH = 4;
const HAND_LENGTH = 12;
const MARK_WIDTH = 2;
const HAND_WIDTH = 2;
const HAND_RADIUS = 2.4;

const HANDS: Hand[] = [
    { position: getHourPosition, color: '#ef4444' },
    { position: getMonthPosition, color: '#f59e0b' },
    { position: getYearPosition, color: '#6366f1' },
];

// Canvas doesn't understand the CSS 'currentColor' keyword, so resolve the
// element's computed text color at draw time. This tracks the active theme
// (data-theme on <html>) automatically.
function getMarkColor(el: Element): string {
    return getComputedStyle(el).color || '#000';
}

function getPointFromAngle(angle: number, distance: number): Point {
    return {
        x: CENTER.x + distance * Math.sin(angle),
        y: CENTER.y - distance * Math.cos(angle)
    };
}

function drawLine(ctx: CanvasRenderingContext2D, from: Point, to: Point, color: string, width: number, opacity = 1): void {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

function drawDot(ctx: CanvasRenderingContext2D, at: Point, radius: number, color: string): void {
    ctx.beginPath();
    ctx.arc(at.x, at.y, radius, 0, TAU);
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.fill();
}

function getHourPosition(): number {
    const now = new Date();
    return ((now.getHours() % 12) * 60 + now.getMinutes() + now.getSeconds() / 60) / 720 * TAU;
}

function getMonthPosition(): number {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return (now.getMonth() + now.getDate() / daysInMonth) / 12 * TAU;
}

function getYearPosition(): number {
    const now = new Date();
    const fractionOfYear = (now.getMonth() * 30 + now.getDate()) / 365;
    return (now.getFullYear() - 2000 + fractionOfYear) / 60 * TAU;
}

function drawMark(ctx: CanvasRenderingContext2D, angle: number, length: number, width: number, opacity: number, color: string): void {
    const inner = getPointFromAngle(angle, RADIUS);
    const outer = getPointFromAngle(angle, RADIUS - length);
    drawLine(ctx, inner, outer, color, width, opacity);
}

function drawMarks(ctx: CanvasRenderingContext2D): void {
    const markColor = getMarkColor(ctx.canvas);
    for (let i = 0; i < MARKS; i++) {
        const isQuarter = i % 3 === 0;
        const scale = isQuarter ? 5 : 3;
        const opacity = isQuarter ? 0.96 : 0.72;
        drawMark(ctx, i / MARKS * TAU, MARK_LENGTH * scale, MARK_WIDTH, opacity, markColor);
    }
}

function drawHand(ctx: CanvasRenderingContext2D, angle: number, color: string): void {
    const tip = getPointFromAngle(angle, RADIUS - HAND_LENGTH);
    const end = getPointFromAngle(angle, RADIUS);
    drawLine(ctx, tip, end, color, HAND_WIDTH);
    drawDot(ctx, tip, HAND_RADIUS, color);
}

function updateClock(ctx: CanvasRenderingContext2D, hands: Hand[]): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawMarks(ctx);
    hands.forEach(hand => drawHand(ctx, hand.position(), hand.color));

    requestAnimationFrame(() => updateClock(ctx, hands));
}

function startClock(id: string, hands: Hand[] = HANDS): void {
    const canvas = document.getElementById(`clockCanvas-${id}`) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    ctx.lineCap = 'round';

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.height = RADIUS * 2 * dpr;
    ctx.scale(dpr, dpr);

    updateClock(ctx, hands);
}
