import { eachDayOfInterval, format, parse, startOfDay } from "date-fns";

export const FormattedDate = (date: string) => {
    const dateToday = new Date();
    let today = startOfDay(dateToday);
    const input = parse(date, "yyyy-MM-dd", new Date());
    const distance = eachDayOfInterval({ start: input, end: today });

    if (distance.length <= 1) {
        return "Today";
    }
    if (distance.length === 2) {
        return "Yesterday";
    }
    if (distance.length >= 3) {
        return format(input, "MMM dd yyyy");
    }
};

export const FormattedTime = (time: string) => {
    return;
};
