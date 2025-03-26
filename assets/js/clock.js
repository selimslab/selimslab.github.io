class BaseClock {
    constructor(options) {
        this.canvas = null;
        this.ctx = null;
        this.type = options.type || 'year';
        this.id = options.id || 'default';
        this.segmentNames = [];
        this.segmentCount = 0;
        this.segmentFractions = [];
        this.dialImageData = null;
        this.minuteMarks = [];

        this.config = {
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
                dialWidth: 2,
                markWidth: 1,
                markLength: 16,
                handWidth: 1,
                handLength: 0.83,
                centerDotSize: 3,
                handCircleRadius: 0.02,
                labelFontSize: ratio => Math.max(10, ratio / 15),
                labelRadius: 0.75,
                labelPadding: 15
            }
        };
    }

    init() {
        this.canvas = document.getElementById(`clockCanvas-${this.id}`);
        this.ctx = this.canvas.getContext('2d');
        this.setupClockType();
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.updateThemeColors();
        this.watchThemeChanges();
        this.startClock();
    }

    setupClockType() {
        throw new Error('setupClockType must be implemented by child class');
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        // Calculate the maximum square dimension that fits in the container
        const size = Math.min(rect.width, rect.height);

        // Set physical canvas size with CSS to be a square
        this.canvas.style.width = `${size}px`;
        this.canvas.style.height = `${size}px`;

        // Set actual canvas dimensions for high DPR
        this.canvas.width = size * dpr;
        this.canvas.height = size * dpr;
        this.ctx.scale(dpr, dpr);

        // Calculate and cache dimensions
        this.config.radius = size * 0.45;
        this.config.center = { x: size / 2, y: size / 2 };

        // Reset cached image data
        this.dialImageData = null;
    }

    drawLine(startX, startY, endX, endY, color, width, opacity = 1.0) {
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.globalAlpha = opacity;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
        return this;
    }

    drawCircle(x, y, radius, color, fill = true, opacity = 1.0) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.globalAlpha = opacity;

        if (fill) {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        } else {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
        return this;
    }

    drawText(text, x, y, color, fontSize, opacity = 1.0) {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.globalAlpha = opacity;
        this.ctx.fillText(text, x, y);
        return this;
    }

    getPointFromAngle(angle, distance) {
        return {
            x: this.config.center.x + distance * Math.sin(angle),
            y: this.config.center.y - distance * Math.cos(angle)
        };
    }

    drawClockDial() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawCircle(
            this.config.center.x,
            this.config.center.y,
            this.config.radius,
            this.config.colors.dial,
            false,
            1.0
        );

        if (!this.dialImageData && this.type === this.id) {
            this.dialImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        } else if (this.dialImageData && this.type === this.id) {
            this.ctx.putImageData(this.dialImageData, 0, 0);
        }

        for (let segment = 0; segment < this.segmentCount; segment++) {
            this.drawSegmentMark(segment);
        }
    }

    drawSegmentMark(segment) {
        const { sizes, colors, opacities } = this.config;
        const segmentAngle = this.segmentFractions[segment] * 2 * Math.PI;

        const innerPoint = this.getPointFromAngle(segmentAngle, this.config.radius - sizes.markLength);
        const outerPoint = this.getPointFromAngle(segmentAngle, this.config.radius - sizes.markLength / 1.8);

        this.drawLine(
            innerPoint.x, innerPoint.y,
            outerPoint.x, outerPoint.y,
            colors.marks,
            sizes.markWidth,
            opacities.marks
        );

        const labelPoint = this.getPointFromAngle(
            segmentAngle,
            this.config.radius - sizes.markLength - sizes.labelPadding
        );

        this.drawText(
            this.segmentNames[segment],
            labelPoint.x, labelPoint.y,
            colors.marks,
            sizes.labelFontSize(this.config.radius),
            opacities.marks
        );
    }

    drawHand(angle) {
        const { sizes, colors } = this.config;
        const handLength = this.config.radius * sizes.handLength;

        const handEnd = this.getPointFromAngle(angle, handLength);

        this.drawLine(
            this.config.center.x, this.config.center.y,
            handEnd.x, handEnd.y,
            colors.hands,
            sizes.handWidth,
            1.0
        );

        const circleRadius = this.config.radius * sizes.handCircleRadius;
        const circleDistance = handLength * 0.94;
        const circlePoint = this.getPointFromAngle(angle, circleDistance);

        this.drawCircle(
            circlePoint.x, circlePoint.y,
            circleRadius,
            colors.highlight,
            true,
            1.0
        );
    }

    drawCenterDot() {
        const dotSize = Math.max(2, Math.min(4, this.config.radius / 75));

        this.drawCircle(
            this.config.center.x, this.config.center.y,
            dotSize,
            this.config.colors.dial,
            true,
            1.0
        );
    }

    drawTime() {
        this.ctx.lineCap = 'round';
        const currentAngle = this.getCurrentPosition();
        this.drawHand(currentAngle);
        this.drawCenterDot();
    }

    updateThemeColors() {
        const bodyColor = window.getComputedStyle(document.body).color;
        const isDarkTheme = document.documentElement.getAttribute('data-theme') !== 'light';

        this.config.colors = {
            dial: bodyColor,
            marks: bodyColor,
            hands: bodyColor,
            highlight: isDarkTheme ? '#ffc800' : '#FF530D'
        };
    }

    watchThemeChanges() {
        this.checkTheme = () => {
            this.updateThemeColors();
        };
    }

    updateClock() {
        this.checkTheme();
        this.drawClockDial();
        this.drawTime();
        requestAnimationFrame(() => this.updateClock());
    }

    startClock() {
        this.updateClock();
    }
}

function draw_clock(options) {
    let clock;
    switch (options.type) {
        case 'hour':
            clock = new HourClock(options);
            break;
        case 'month':
            clock = new MonthClock(options);
            break;
        case 'year':
            clock = new YearsClock(options);
            break;
        case 'century':
            clock = new CenturyClock(options);
            break;
    }
    clock.init();
}