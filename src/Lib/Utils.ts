export function addTypedEventListener<T>(
    type: string,
    listener: (event: CustomEvent<T>) => void
) {
    document.addEventListener(type, listener as EventListener);
}

export function removeTypedEventListener<T>(
    type: string,
    listener: (event: CustomEvent<T>) => void
) {
    document.removeEventListener(type, listener as EventListener);
}

export function emitEvent<T>(eventName: string, detail: any) {
    const event = new CustomEvent<T>(eventName, { detail });
    document.dispatchEvent(event);
}

export function getUrlParam(name: string): any {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

export function setUrlParam(name: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    history.pushState(null, '', url.toString());
}

export function GetDayOfTheWeekByID(id: number): string {
    switch (id) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        case 7: return "Sunday";
        default: return "Error";
    }
}

export function GetMonthByID(id: number): string {
    switch(id) {
        case 1: return "January";
        case 2: return "February";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
        default: return "Error";
    }
}