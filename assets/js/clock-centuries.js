class CenturyClock extends BaseClock {
    setupClockType() {
        this.segmentNames = ['1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300'];
        this.segmentCount = 12;
        this.segmentFractions = Array.from({length: 12}, (_, i) => i / 12);
        this.centuryMarks = Array.from({length: 120}, (_, i) => i);
    }

    getCurrentPosition() {
        const now = moment();
        const year = now.year();
        const month = now.month();
        const day = now.date();
        
        const century = Math.floor(year / 100);
        const yearInCentury = year % 100;
        const fractionOfYear = (month * 30 + day) / 365;
        
        // Calculate position within the 1200-year span (12 centuries)
        const centuriesSince1200 = century - 12;
        const position = centuriesSince1200 + (yearInCentury + fractionOfYear) / 100;
        
        return (position / 12) * 2 * Math.PI;
    }

    drawClockDial() {
        super.drawClockDial();
        this.drawCenturyMarks();
    }

    drawCenturyMarks() {
        const { sizes, colors, opacities } = this.config;
        
        for (let i = 0; i < this.centuryMarks.length; i++) {
            const angle = (i / 120) * 2 * Math.PI;
            

            const innerPoint = this.getPointFromAngle(angle, this.config.radius - sizes.markLength/1.2);
            const outerPoint = this.getPointFromAngle(angle, this.config.radius - sizes.markLength);
            
            this.drawLine(
                innerPoint.x, innerPoint.y,
                outerPoint.x, outerPoint.y,
                colors.marks, 
                1,
                opacities.marks
            );
            
        }
    }
}
