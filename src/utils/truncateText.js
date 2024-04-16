export function truncateText(str) {
    if (str.toString().length < 60)
        return str;
    return str.substring(0, 60) + '...';
}