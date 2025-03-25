class YearClock extends BaseClock {
    setupClockType() {
        this.segmentNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.segmentCount = 12;
        this.segmentFractions = [0, 0.0849, 0.1644, 0.2493, 0.3288, 0.4137, 0.4986, 0.5836, 0.6685, 0.7534, 0.8384, 0.9233];
    }

    getCurrentPosition() {
        const now = moment();
        const dayOfYear = now.dayOfYear();
        return (dayOfYear / 365) * 2 * Math.PI;
    }
} 