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

// Drawing Utilities
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

// Clock Type Configurations
function getClockSetup(type) {
    switch (type) {
        case 'hour':
            return {
                segmentNames: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
                segmentCount: 12,
                segmentFractions: Array.from({length: 12}, (_, i) => i / 12),
                marks: Array.from({length: 48}, (_, i) => i)
            };
        case 'month':
            const monthSetup = {
                segmentNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                segmentCount: 12,
                segmentFractions: [],
                labelPositions: []
            };
            
            // Calculate segment positions based on actual days in each month
            const daysInYear = moment().isLeapYear() ? 366 : 365;
            let dayCounter = 0;
            
            for (let month = 0; month < 12; month++) {
                monthSetup.segmentFractions.push(dayCounter / daysInYear);
                // Add days in current month
                const daysInMonth = moment().month(month).daysInMonth();
                dayCounter += daysInMonth;
            }
            
            // Calculate midpoints between segments for label positioning
            for (let i = 0; i < monthSetup.segmentCount; i++) {
                const nextIndex = (i + 1) % monthSetup.segmentCount;
                let midpoint;
                
                if (nextIndex === 0) {
                    // For December to January, wrap around the circle
                    midpoint = (monthSetup.segmentFractions[i] + 1 + monthSetup.segmentFractions[nextIndex]) / 2;
                    if (midpoint > 1) midpoint -= 1;
                } else {
                    // For all other months, simple midpoint
                    midpoint = (monthSetup.segmentFractions[i] + monthSetup.segmentFractions[nextIndex]) / 2;
                }
                
                monthSetup.labelPositions.push(midpoint);
            }
            
            return monthSetup;
            
        case 'year':
            return {
                segmentNames: ['2000', '2010', '2020', '2030', '2040', '2050', ''],
                segmentCount: 7,
                segmentFractions: Array.from({length: 7}, (_, i) => i / 6),
                marks: Array.from({length: 60}, (_, i) => i)
            };
        case 'century':
            return {
                segmentNames: ['1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300'],
                segmentCount: 12,
                segmentFractions: Array.from({length: 12}, (_, i) => i / 12),
                marks: Array.from({length: 120}, (_, i) => i)
            };
        case 'decimal':
            return {
                segmentNames: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                segmentCount: 10,
                segmentFractions: Array.from({length: 10}, (_, i) => i / 10),
                marks: Array.from({length: 100}, (_, i) => i)
            };
        default:
            return getClockSetup('year');
    }
}

// Get current position for different clock types
function getCurrentPosition(type) {
    const now = moment();
    
    switch (type) {
        case 'hour':
            const hour = now.hour() % 12;
            const minute = now.minute();
            const second = now.second();
            return ((hour * 60 + minute + second/60) / 720) * 2 * Math.PI;
            
        case 'month':
            const dayOfYear = now.dayOfYear();
            return (dayOfYear / 365) * 2 * Math.PI;
            
        case 'year':
            const year = now.year();
            const month = now.month();
            const day = now.date();
            
            const yearsSince2000 = year - 2000;
            const fractionOfYear = (month * 30 + day) / 365;
            
            return ((yearsSince2000 + fractionOfYear) / 60) * 2 * Math.PI;
            
        case 'century':
            const centuryYear = now.year();
            const centuryMonth = now.month();
            const centuryDay = now.date();
            
            const century = Math.floor(centuryYear / 100);
            const yearInCentury = centuryYear % 100;
            const fractionOfCenturyYear = (centuryMonth * 30 + centuryDay) / 365;
            
            // Calculate position within the 1200-year span (12 centuries)
            const centuriesSince1200 = century - 12;
            const position = centuriesSince1200 + (yearInCentury + fractionOfCenturyYear) / 100;
            
            return (position / 12) * 2 * Math.PI;
        case 'decimal':
            return 0;
        default:
            return getCurrentPosition('year');
    }
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
        1.0
    );

    for (let segment = 0; segment < clockSetup.segmentCount; segment++) {
        if (type === 'month') {
            drawMonthSegmentMark(ctx, config, clockSetup, segment);
        } else {
            drawSegmentMark(ctx, config, clockSetup, segment);
        }
    }
    
    // Draw additional marks based on clock type
    switch (type) {
        case 'hour':
            drawMinuteMarks(ctx, config, clockSetup);
            break;
        case 'year':
            drawYearMarks(ctx, config, clockSetup);
            break;
        case 'century':
        case 'decimal':
            drawMarks(ctx, config, clockSetup);
            break;
    }
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
        sizes.labelFontSize(config.radius),
        opacities.marks
    );
}

function drawMonthSegmentMark(ctx, config, clockSetup, segment) {
    const { sizes, colors, opacities } = config;
    const segmentAngle = clockSetup.segmentFractions[segment] * 2 * Math.PI;
    
    // Draw the segment mark (line)
    const innerPoint = getPointFromAngle(config.center, segmentAngle, config.radius - sizes.markLength);
    const outerPoint = getPointFromAngle(config.center, segmentAngle, config.radius - sizes.markLength/1.8);
    
    drawLine(
        ctx,
        innerPoint.x, innerPoint.y,
        outerPoint.x, outerPoint.y,
        colors.marks,
        sizes.markWidth,
        opacities.marks
    );
    
    // Draw the label at the midpoint
    const labelAngle = clockSetup.labelPositions[segment] * 2 * Math.PI;
    const labelPoint = getPointFromAngle(
        config.center,
        labelAngle, 
        config.radius - sizes.markLength - sizes.labelPadding
    );
    
    drawText(
        ctx,
        clockSetup.segmentNames[segment],
        labelPoint.x, labelPoint.y,
        colors.marks,
        sizes.labelFontSize(config.radius),
        opacities.marks
    );
}

function drawMinuteMarks(ctx, config, clockSetup) {
    const { sizes, colors } = config;
    
    for (let minute = 0; minute < clockSetup.marks.length; minute++) {
        if (minute % 4 === 0) continue;
        
        const minuteAngle = (minute / 48) * 2 * Math.PI;
        
        const innerPoint = getPointFromAngle(config.center, minuteAngle, config.radius - sizes.markLength/1.2);
        const outerPoint = getPointFromAngle(config.center, minuteAngle, config.radius - sizes.markLength);
        
        drawLine(
            ctx,
            innerPoint.x, innerPoint.y,
            outerPoint.x, outerPoint.y,
            colors.marks,
            1.0,
            0.8
        );
    }
}

function drawYearMarks(ctx, config, clockSetup) {
    const { sizes, colors, opacities } = config;
    const now = moment();
    const currentYear = now.year();
    const currentYearShort = currentYear % 100;
    
    for (let year = 0; year < clockSetup.marks.length; year++) {
        const yearAngle = (year / 60) * 2 * Math.PI;
        
        const is5YearMark = year % 5 === 0;

        const innerPoint = getPointFromAngle(config.center, yearAngle, config.radius - sizes.markLength/(is5YearMark ? 2 : 1.2));
        const outerPoint = getPointFromAngle(config.center, yearAngle, config.radius - sizes.markLength);
        
        drawLine(
            ctx,
            innerPoint.x, innerPoint.y,
            outerPoint.x, outerPoint.y,
            colors.marks, 
            1,
            is5YearMark ? 1 : opacities.marks
        );
        
        if (year === currentYearShort - 2000) {
            const labelPoint = getPointFromAngle(config.center, yearAngle, config.radius * sizes.labelRadius);
            
            drawText(
                ctx,
                currentYearShort,
                labelPoint.x, labelPoint.y,
                colors.highlight,
                sizes.labelFontSize(config.radius),
                opacities.labels
            );
        }
    }
}

function drawMarks(ctx, config, clockSetup) {
    const { sizes, colors, opacities } = config;
    
    for (let i = 0; i < clockSetup.marks.length; i++) {
        const angle = (i / clockSetup.marks.length) * 2 * Math.PI;

        const innerPoint = getPointFromAngle(config.center, angle, config.radius - sizes.markLength/1.2);
        const outerPoint = getPointFromAngle(config.center, angle, config.radius - sizes.markLength);
        
        drawLine(
            ctx,
            innerPoint.x, innerPoint.y,
            outerPoint.x, outerPoint.y,
            colors.marks, 
            1,
            i % 5 === 0 ? opacities.marks : opacities.marks * 0.5
        );
    }
}

function drawHand(ctx, config, angle) {
    const { sizes, colors } = config;
    const handLength = config.radius * sizes.handLength;

    const handEnd = getPointFromAngle(config.center, angle, handLength);

    drawLine(
        ctx,
        config.center.x, config.center.y,
        handEnd.x, handEnd.y,
        colors.hands,
        sizes.handWidth,
        1.0
    );

    const circleRadius = config.radius * sizes.handCircleRadius;
    const circleDistance = handLength * 0.94;
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
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Calculate the maximum square dimension that fits in the container
    const size = Math.min(rect.width, rect.height);

    // Set physical canvas size with CSS to be a square
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // Set actual canvas dimensions for high DPR
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Calculate and cache dimensions
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