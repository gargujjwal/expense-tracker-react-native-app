export const getFormattedDate = (date: Date) => date.toISOString().slice(0, 10);

export const getDateMinusDays = (date: Date, days: number) => {
    return new Date(date.setDate(date.getDate() - days));
};
