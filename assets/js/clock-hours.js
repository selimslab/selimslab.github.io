class HourClock extends BaseClock {
    setupClockType() {
        this.segmentNames = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
        this.segmentCount = 12;
        this.segmentFractions = Array.from({length: 12}, (_, i) => i / 12);
        this.minuteMarks = Array.from({length: 48}, (_, i) => i);
    }

    getCurrentPosition() {
        const now = moment();
        const hour = now.hour() % 12;
        const minute = now.minute();
        const second = now.second();
        return ((hour * 60 + minute + second/60) / 720) * 2 * Math.PI;
    }

    drawClockDial() {
        super.drawClockDial();
        this.drawMinuteMarks();
    }

    drawMinuteMarks() {
        const { sizes, colors } = this.config;
        
        for (let minute = 0; minute < this.minuteMarks.length; minute++) {
            if (minute % 4 === 0) continue;
            
            const minuteAngle = (minute / 48) * 2 * Math.PI;
            
            const innerPoint = this.getPointFromAngle(minuteAngle, this.config.radius - sizes.markLength/1.2);
            const outerPoint = this.getPointFromAngle(minuteAngle, this.config.radius - sizes.markLength);
            
            this.drawLine(
                innerPoint.x, innerPoint.y,
                outerPoint.x, outerPoint.y,
                colors.marks,
                1.0,
                0.8
            );
            
        }
    }
} 