class CenturyClock extends BaseClock {
    setupClockType() {
        this.segmentNames = ['2000', '2010', '2020', '2030', '2040', '2050', ''];
        this.segmentCount = 7;
        this.segmentFractions = Array.from({length: 7}, (_, i) => i / 6);
        this.yearMarks = Array.from({length: 60}, (_, i) => i);
    }

    getCurrentPosition() {
        const now = moment();
        const year = now.year();
        const month = now.month();
        const day = now.date();
        
        const yearsSince2000 = year - 2000;
        const fractionOfYear = (month * 30 + day) / 365;
        
        return ((yearsSince2000 + fractionOfYear) / 60) * 2 * Math.PI;
    }

    drawClockDial() {
        super.drawClockDial();
        this.drawYearMarks();
    }

    drawYearMarks() {
        const { sizes, colors, opacities } = this.config;
        const now = moment();
        const currentYear = now.year();
        const currentYearShort = currentYear % 100;
        
        for (let year = 0; year < this.yearMarks.length; year++) {
            const yearAngle = (year / 60) * 2 * Math.PI;
            
            const innerPoint = this.getPointFromAngle(yearAngle, this.config.radius - sizes.markLength/2);
            const outerPoint = this.getPointFromAngle(yearAngle, this.config.radius);
            
            const is5YearMark = year % 5 === 0;
            
            this.drawLine(
                innerPoint.x, innerPoint.y,
                outerPoint.x, outerPoint.y,
                colors.marks, 
                1, 
                is5YearMark ? 0.9 : opacities.yearMarks
            );
            
            if (year === currentYearShort - 2000) {
                const labelPoint = this.getPointFromAngle(yearAngle, this.config.radius * sizes.labelRadius);
                
                this.drawText(
                    currentYearShort,
                    labelPoint.x, labelPoint.y,
                    colors.highlight,
                    sizes.yearLabelFontSize(this.config.radius),
                    opacities.labels
                );
            }
        }
    }
} 