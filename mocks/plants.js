import reminderIntervalTypes from "../constants/ReminderIntervalTypes"

export default plants = [{
    id: 1,
    name: "Kopriva",
    description: "Peče dok pehneš",
    reminders: [{
        id: 1,
        name: "Zaliti",
        interval: reminderIntervalTypes.DAILY,
        startDate: new Date()
    },
    {
        id: 2,
        name: "Pognojiti",
        interval: reminderIntervalTypes.WEEKLY,
        startDate: new Date()
    }]
}, {
    id: 2,
    name: "Kaktus",
    description: "Piče dok pehneš",
    reminders: [{
        id: 3,
        name: "Presaditi",
        interval: reminderIntervalTypes.MONTHLY,
        startDate: new Date()
    },
    ]
}]