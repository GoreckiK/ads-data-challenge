export const kFormatter = (value: string | number) => {
    if (typeof(value) === "string") {
        return parseInt(value) / 1000 + "k";
    }
    return value / 1000 + "k";
}