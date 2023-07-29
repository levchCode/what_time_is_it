// -- Clock ---

const eiatf = 'translateZ(0); animation-timing-function: ease-in';
const eoatf = 'translateZ(0); animation-timing-function: ease-out';
const modifiers = {
    hour: {
        '30%': 1,
        '45%': 0.4,
        '60%': 1,
        '70%': 0.5,
        '80%': 1
    },
    minute: {
        '30%': 6,
        '45%': 4,
        '60%': 6,
        '70%': 5,
        '80%': 6
    },
    second: {        
        '30%': 6,
        '45%': 4.8,
        '60%': 6,
        '70%': 5.5,
        '80%': 6
    }
};

class Clock {

    constructor() {
        this.hourHand = new ClockHand('hour', (hour, minute, second) => {
            return (hour * 30) + (minute / 2);
        }, modifiers.hour);

        this.minuteHand = new ClockHand('minute', (hour, minute, second) => {
            return (minute-1) * 6;
        }, modifiers.minute);

        this.secondHand = new ClockHand('second', (hour, minute, second) => {
            return (second-1) * 6;
        }, modifiers.second);
    }

    update(hour, minute, second) {
        this.hourHand.update(hour, minute, second)
        this.minuteHand.update(hour, minute, second)
        this.secondHand.update(hour, minute, second)
    }

}

class ClockHand {
    constructor(name, degreeFunction, degreeModifiers) {
        this.name = name;
        this.degreeFunction = degreeFunction;
        this.modifiers = degreeModifiers
    }

    update(hour, minute, second) {
        const styleName = 'tmp' + this.name + 'Sheet';
        const styleSheet = document.getElementById(styleName);
        if (styleSheet) {
            styleSheet.parentNode.removeChild(styleSheet);
        }

        const hDeg = this.degreeFunction(hour, minute, second)

        const p1 = hDeg;
        const p2 = hDeg + this.modifiers['30%'];
        const p3 = hDeg + this.modifiers['45%'];
        const p4 = hDeg + this.modifiers['60%'];
        const p5 = hDeg + this.modifiers['70%']; 
        const p6 = hDeg + this.modifiers['80%']; 
        const frames = '@keyframes ' + this.name + '1gen { '
        +'0% { transform: rotate(' + p1 + 'deg) ' + eiatf + ';}'
        +'30% { transform: rotate(' + p2 + 'deg) ' + eoatf + ';}'
        +'45% { transform: rotate(' + p3 + 'deg) ' + eiatf + ';}'
        +'60% { transform: rotate(' + p4 + 'deg) ' + eoatf + ';}' 
        +'70% { transform: rotate(' + p5 + 'deg) ' + eiatf +';}'
        +'80%,100% { transform: rotate(' + p6 + 'deg) ' + eoatf + ';}}';

        var styleElement = document.createElement('style');
        styleElement.setAttribute('id', styleName);
        styleElement.innerHTML = frames;
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
}
