const truncate = (string: string, start = 8, end = 5) => {
    return `${string.substring(0, start)}...${string.substring(
        string.length - end,
        string.length,
    )}`;
};

export default truncate;
