import type { DayData } from "./Interfaces/DayData";
import type { StreamData } from "./Interfaces/StreamData";
import { GetMonthByID } from "./Utils";

var plannedStreams = new Map<number, StreamData[]>();
var dayData = new Map<number, DayData>();

export function initScheduleManager() {
    for (let i = 0; i < 7; i++) {
        plannedStreams.set(i, []);
    }

    document.dispatchEvent(new Event("resetSchedule"));
}

export function updateDayData(dayIndex: number, data: DayData) {
    dayData.set(dayIndex, data);
}

export function setScheduleForDay(dayIndex: number, streams: StreamData[]) {
    plannedStreams.set(dayIndex, streams);
}

export function generateSchedule(): boolean {
    try {
        let result = "";
        const offlineText = localStorage.getItem("defaultOfflineText") ?? "`Error 404: nan7s.exe not found`";

        for (let i = 1; i < plannedStreams.size; i++) {
            const streams = plannedStreams.get(i);
            const data: DayData = dayData.get(i)!;

            if (streams && streams.length > 0) {
                for (let j = 0; j < streams.length; j++) {
                    const stream = streams[j];
                    if (!stream) continue;

                    const streamHour = stream.time.split(":")[0];
                    const streamMinute = stream.time.split(":")[1];

                    if (streamMinute && streamHour) {
                        const streamDate = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate());
                        streamDate.setHours(parseInt(streamHour), parseInt(streamMinute));
                        const dateInUnix = streamDate.getTime() / 1000;

                        result += `<t:${dateInUnix}:F> - <t:${dateInUnix}:R> - ${stream.title}\n`;
                        if (j == streams.length - 1) result +="\n";
                    }
                    else {
                        result += `${data.dayName}, ${data.monthName} ${data.dayNumber} ${stream.time} - ${stream.title}\n`;
                        if (j == streams.length - 1) result +="\n";
                    }
                }
            }
            else {
                const streamDate = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate());
                result += `${data.dayName}, ${GetMonthByID(streamDate.getMonth() + 1)} ${streamDate.getDate()} - ${offlineText}\n\n`;
            }
        }

        result = result.slice(0, -2);
        navigator.clipboard.writeText(result);

        return true;
    }
    catch (e) {
        console.error(e);
    }

    return false;
}