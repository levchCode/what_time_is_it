window.onload = () => {
    clock = new Clock()
    window.setInterval(updateTime, 1000)
}



function updateTime()
{
    let text = "";
    const nums = ["zero", "one","two", "three", "four", "five", "six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","twenty-one",
    "twenty-two","twenty-three","twenty-four","twenty-five","twenty-six","twenty-seven","twenty-eight","twenty-nine","thirty","thirty-one","thirty-two","thirty-three","thirty-four","thirty-five","thirty-six",
    "thirty-seven","thirty-eight","thirty-nine", "forty", "forty-one", "forty-two", "forty-three", "forty-four", "forty-five", "forty-six", "forty-seven", "forty-eight", "forty-nine","fifty", "fifty-one", "fifty-two", "fifty-three", "fifty-four", "fifty-five", "fifty-six", "fifty-seven", "fifty-eight", "fifty-nine" ]

    currentDate = new Date();
    let hour = currentDate.getHours();

    getTimeOfTheDay(hour)

    let dayPartMarker = hour >= 12 ? 'PM' : 'AM';
    hour %= 12

    let minute = currentDate.getMinutes();
    let second = currentDate.getSeconds();

    clock.update(hour, minute, second)

    switch (true)
    {
        case minute == 0:
            text = nums[hour] + " o'clock";
            break;
        case minute < 30:
            text = nums[minute] + " past " + nums[hour];
            break;
        case minute == 15:
            text = " a quarter past " + nums[hour];
            break;
        case minute == 30:
            text = " half past " + nums[hour];
            break;
        case minute == 45:
            text = " a quarter to " + nums[hour + 1];
            break;
        case minute > 30:
            text = nums[60 - minute] + " to " + nums[hour + 1]; 
            break;
    }

    text += " " + dayPartMarker

    if(second !== 1) {
        text += " and " + nums[second] + " seconds";
    } else {
        text += " and " + nums[second] + " second";
    }

    document.getElementById("text").innerHTML = text;
}

function getTimeOfTheDay(hour) {
    let text = ''

    switch (true)
    {
        case hour < 12:
            text = 'morning';
        case hour <= 12 && hour < 16:
            text = 'afternoon';
        default:
            text = 'evening';
    }

    document.getElementById("daypart").innerHTML = text;
}



