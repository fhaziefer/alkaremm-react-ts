
export var dayNow = function () {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    return currentDay;
}

export var monthNow = function () {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    return currentMonth;
}

export var yearNow = function () {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear;
}

export var fullDate = function () {
    const currentFullDate = `${dayNow()}-${monthNow()}-${yearNow()}`
    return currentFullDate
}