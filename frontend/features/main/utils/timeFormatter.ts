const timeFormatter = (utc: number, type?: 'date' | 'clock') => {
    const difference = new Date().getTime() - utc;
    const differenceInHours = difference / (60 * 60 * 1000);
    const time = new Date(utc);

    const clock = `${time.getHours()}:${
        time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    } ${time.getHours() <= 12 ? 'AM' : 'PM'}`;

    const date = `${time.getDate()}/${time.getMonth() + 1}/${
        time.getFullYear() - 2000
    }`;

    switch (type) {
        case 'date':
            return date;
        case 'clock':
            return date;
        default:
            if (differenceInHours > 24) {
                return date;
            } else {
                return clock;
            }
    }
};

export default timeFormatter;