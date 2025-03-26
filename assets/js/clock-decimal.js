class DecimalClock extends BaseClock {
    setupClockType() {
        this.segmentNames = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        this.segmentCount = 10;
        this.segmentFractions = Array.from({length: 10}, (_, i) => i / 10);
        this.marks = Array.from({length: 100}, (_, i) => i);
    }

    drawClockDial() {
        super.drawClockDial();
        this.drawMarks();
    }

    drawMarks() {
        const { sizes, colors, opacities } = this.config;
        
        for (let i = 0; i < this.marks.length; i++) {
            const angle = (i / 100) * 2 * Math.PI;
            

            const innerPoint = this.getPointFromAngle(angle, this.config.radius - sizes.markLength/1.2);
            const outerPoint = this.getPointFromAngle(angle, this.config.radius - sizes.markLength);
            
            this.drawLine(
                innerPoint.x, innerPoint.y,
                outerPoint.x, outerPoint.y,
                colors.marks, 
                1,
                i % 5 === 0 ? opacities.marks : opacities.marks * 0.5
            );
            
        }
    }
}
