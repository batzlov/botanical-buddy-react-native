import React from "react";
import {
    Text,
    View,
    StyleSheet
} from "react-native";
import Moment from "moment";
import { extendMoment } from "moment-range";
import {
    EVENT_TYPES,
    EVENT_TYPE_COLORS
} from "../constants/enums"
const moment = extendMoment(Moment);

const Calendar = ({month, year, events}) => {
    const getDaysInMonth = (month, year) => {
        return moment().month(month).year(year).daysInMonth();
    };

    const prepareDaysInMonth = (month, year) => {
        const daysInMonth = getDaysInMonth(month, year);
        const firstOfMonth = moment().date(1).month(month).year(year);
        const lastOfMonth = moment().date(daysInMonth).month(month).year(year);

        const weeks = [];
        for(let i = firstOfMonth.week(); i <= lastOfMonth.week(); i++) 
        {
            weeks.push(i);
        }

        let rangeStart = null;
        if(firstOfMonth.day() == 1) 
        {
            rangeStart = firstOfMonth;
        }
        else 
        {
            let m = month == 0 ? 11 : month - 1;
            let y = month == 0 ? year - 1 : year;
            rangeStart = moment().month(m).year(y).week(firstOfMonth.week()).day(1);
        }

        let rangeEnd = null;
        if(lastOfMonth.day() == 0) 
        {
            rangeEnd = lastOfMonth;
        }
        else 
        {
            let m = month == 11 ? 0 : month + 1;
            let y = month == 11 ? year + 1 : year;
            rangeEnd = moment().month(m).year(y).week(lastOfMonth.week()).day(7);
        }

        const range = moment.range(rangeStart, rangeEnd);
        const days = Array.from(range.by('day'));

        return days;
    };
    
    const dayHasEvent = (day, events) => {
        let filteredEvents = [];
        filteredEvents = events.filter((event) => {
            if(event.date.split('.')[0] == day.format('DD')) {
                return event;
            }
        });

        if(filteredEvents.length > 1) {
            // prefer fertilize events
            return filteredEvents[1].type == EVENT_TYPES.FERTILIZE ? filteredEvents[1] : filteredEvents[0]; 
        }

        return filteredEvents.length == 0 ? null : filteredEvents[0];
    };
    
    const generateDay = (day) => {
        let style = day.month() == month ? styles.column : [styles.column, styles.disabledColumn];

        const event = day.month() == month ? dayHasEvent(day, events) : null;
        if(event) 
        {
            style = [style, {
                backgroundColor: event.type == EVENT_TYPES.POUR ? EVENT_TYPE_COLORS.POUR : EVENT_TYPE_COLORS.FERTILIZE
            }]
        }

        return (
            <View
                style={style}
                key={Math.random()}
            >
                <Text>{day.date()}</Text>
            </View>
        );
    }

    const generateWeek = (days) => {
        const week = [];

        days.forEach((day) => {
            week.push(generateDay(day));
        });

        return (
            <View
                style={styles.row}
                key={Math.random()}
            >
                {week}
            </View>
        );
    }
    
    const generateCalendarLayout = () => {
        const days = prepareDaysInMonth(month, year);
        const rowsCount = days.length / 7;
        const layout = [];

        let from = 0;
        let to = 6;
        for(let i = 0; i < rowsCount; i++) 
        {
            const subArray = days.slice(from, to + 1);
            layout.push(generateWeek(subArray));
            from += 7;
            to += 7;
        }

        return layout;
    }
    
    return (
        <View>
            <View
                style={styles.row}
            >
                <View style={styles.column}><Text>Mo</Text></View>
                <View style={styles.column}><Text>Di</Text></View>
                <View style={styles.column}><Text>Mi</Text></View>
                <View style={styles.column}><Text>Do</Text></View>
                <View style={styles.column}><Text>Fr</Text></View>
                <View style={styles.column}><Text>Sa</Text></View>
                <View style={styles.column}><Text>So</Text></View>
            </View>
            {generateCalendarLayout()}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2
    },
    column: {
        width: 38,
        height: 38,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
        borderRadius: 5,
        backgroundColor: '#ececec',
        borderColor: '#ececec',
    }, 
    disabledColumn: {
        backgroundColor: '#555',
        borderColor: '#555',
    },
});
    
export default Calendar;