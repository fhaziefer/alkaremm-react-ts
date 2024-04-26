import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    relativeTime: {
        future: "%s lagi",
        past: "%s yang lalu",
        s: 'beberapa detik',
        m: "beberapa menit",
        mm: "%d menit",
        h: "satu jam",
        hh: "%d jam",
        d: "satu hari",
        dd: "%d hari",
        M: "satu bulan",
        MM: "%d bulan",
        y: "satu tahun",
        yy: "%d tahun"
    },
    months: [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
        "Agustus", "September", "Oktober", "November", "Desember"
    ],
    monthsShort: [
          "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
          "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
        ],
    weekdays: [
        "Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"
    ],
    weekdaysShort: ["Ahad", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
})

const timeNow = new Date()

export var getGreeting = function () {
    const hour = dayjs().hour();

    if (hour >= 0 && hour < 10) {
        return "Pagi";
    } else if (hour >= 10 && hour < 15) {
        return "Siang";
    } else if (hour >= 15 && hour < 18) {
        return "Sore";
    } else {
        return "Malam";
    }
}

export var getDayNowNumber = function () {
    const newDate = dayjs(timeNow).format('D')
    return newDate;
}

export var getDayNowString = function () {
    const newDate = dayjs(timeNow).format('dddd')
    return newDate;
}

export var getMonthNowNumber = function () {
    const newDate = dayjs(timeNow).format('M')
    return newDate;
}

export var getMonthNowString = function () {
    const newDate = dayjs(timeNow).format('MMMM')
    return newDate;
}

export var getYearNow = function () {
    const newDate = dayjs(timeNow).format('YYYY')
    return newDate;
}

export var getDate = function (date: string | undefined) {
    const newDate = dayjs(date!).format('DD-MM-YYYY')
    return newDate
}

export var getShortStringDate = function (date: string | undefined) {
    const newDate = dayjs(date!).format('DD-MMM-YYYY')
    return newDate
}

export var getStringDate = function (date: string | undefined) {
    const newDate = dayjs(date!).format('D MMMM YYYY')
    return newDate
}

export var getLongStringDate = function (date: string | undefined) {
    const newDate = dayjs(date!).format('h:mm A, D MMMM YYYY')
    return newDate
}

export var getAge = function (date: string | undefined) {
    const newDate = dayjs(date!).fromNow(true)
    return newDate
}

export var getTimeAgo = function (date: string | undefined) {
    const newDate = dayjs(date!).fromNow()
    return newDate
}

export var getBirthdayStatus = function (date: string | undefined) {
    const now = dayjs(new Date().toString()).format('D-M')
    const user = dayjs(date!).format('D-M')
    if (now !== user) {
        return false
    } else {
        return true
    }
}