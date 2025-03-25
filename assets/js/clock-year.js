class YearClock extends BaseClock {
    setupClockType() {
        this.segmentNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.segmentCount = 12;
        
        // Calculate segment positions based on actual days in each month
        this.segmentFractions = [];
        const daysInYear = moment().isLeapYear() ? 366 : 365;
        let dayCounter = 0;
        
        for (let month = 0; month < 12; month++) {
            this.segmentFractions.push(dayCounter / daysInYear);
            // Add days in current month
            const daysInMonth = moment().month(month).daysInMonth();
            dayCounter += daysInMonth;
        }
        
        // Calculate midpoints between segments for label positioning
        this.labelPositions = [];
        for (let i = 0; i < this.segmentCount; i++) {
            const nextIndex = (i + 1) % this.segmentCount;
            let midpoint;
            
            if (nextIndex === 0) {
                // For December to January, wrap around the circle
                midpoint = (this.segmentFractions[i] + 1 + this.segmentFractions[nextIndex]) / 2;
                if (midpoint > 1) midpoint -= 1;
            } else {
                // For all other months, simple midpoint
                midpoint = (this.segmentFractions[i] + this.segmentFractions[nextIndex]) / 2;
            }
            
            this.labelPositions.push(midpoint);
        }
    }

    getCurrentPosition() {
        const now = moment();
        const dayOfYear = now.dayOfYear();
        return (dayOfYear / 365) * 2 * Math.PI;
    }

    drawSegmentMark(segment) {
        const { sizes, colors, opacities } = this.config;
        const segmentAngle = this.segmentFractions[segment] * 2 * Math.PI;
        
        // Draw the segment mark (line)
        const innerPoint = this.getPointFromAngle(segmentAngle, this.config.radius - sizes.markLength);
        const outerPoint = this.getPointFromAngle(segmentAngle, this.config.radius - sizes.markLength/1.8);
        
        this.drawLine(
            innerPoint.x, innerPoint.y,
            outerPoint.x, outerPoint.y,
            colors.marks,
            sizes.markWidth,
            opacities.marks
        );
        
        // Draw the label at the midpoint
        const labelAngle = this.labelPositions[segment] * 2 * Math.PI;
        const labelPoint = this.getPointFromAngle(
            labelAngle, 
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
} 