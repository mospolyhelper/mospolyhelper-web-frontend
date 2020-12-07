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
        let dateFixed = new Date(date.getTime());
        dateFixed.setHours(0, 0, 0, 0);

        if (showEnded && showCurrent && showNotStarted) return true;
        if (!showEnded && !showCurrent && !showNotStarted) return true;

        if (showEnded && !showCurrent && !showNotStarted) return dateFixed > it.dateTo;
        if (showEnded && showCurrent && !showNotStarted) return dateFixed >= it.dateFrom;

        if (!showEnded && !showCurrent && showNotStarted) return dateFixed < it.dateFrom;
        if (!showEnded && showCurrent && showNotStarted) return dateFixed <= it.dateTo;

        if (!showEnded && showCurrent && !showNotStarted)
            return dateFixed >= it.dateFrom && dateFixed <= it.dateTo;

        if (showEnded && !showCurrent && showNotStarted)
            return dateFixed < it.dateFrom || dateFixed > it.dateTo;

        return true;
    });

const normilizeDates = (schedule: Schedule | undefined): Schedule | undefined => {
    if (!schedule) return undefined;

    return undefined;
}