import Lesson from "../model/lesson";
import Schedule from "../model/schedule";

export const getLessons = (
    schedule: Schedule,
    date: Date,
    showEnded: Boolean = false,
    showCurrent: Boolean = true,
    showNotStarted: Boolean = false
): Array<Lesson> =>
    filterByDate(
        schedule.dailySchedules[date.getDay()],
        date,
        showEnded,
        showCurrent,
        showNotStarted
    );

export const filterByDate = (
    dailySchedule: Array<Lesson>,
    date: Date,
    showEnded: Boolean,
    showCurrent: Boolean,
    showNotStarted: Boolean
): Array<Lesson> => 
    dailySchedule.filter(it => {
        if (showEnded && showCurrent && showNotStarted) return true;
        if (!showEnded && !showCurrent && !showNotStarted) return true;

        if (showEnded && !showCurrent && !showNotStarted) return date > it.dateTo;
        if (showEnded && showCurrent && !showNotStarted) return date >= it.dateFrom;

        if (!showEnded && !showCurrent && showNotStarted) return date < it.dateFrom;
        if (!showEnded && showCurrent && showNotStarted) return date <= it.dateTo;

        if (!showEnded && showCurrent && !showNotStarted)
            return date >= it.dateFrom && date <= it.dateTo;

        if (showEnded && !showCurrent && showNotStarted)
            return date < it.dateFrom || date > it.dateTo;

        return true;
    });

const normilizeDates = (schedule: Schedule | undefined): Schedule | undefined => {
    if (!schedule) return undefined;

    return undefined;
}