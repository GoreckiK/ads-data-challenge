export const kFormatter = (value: string) => {
    const intValue = parseInt(value);
    const kCount = intValue / 1000;
    return intValue / 1000 + "k";
}