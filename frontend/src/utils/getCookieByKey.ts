const getCookieByKey = (key: string): string | undefined => {
    const cookie: string | undefined = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${key}=`))
        ?.split('=')[1];

    return cookie;
};

export default getCookieByKey;
