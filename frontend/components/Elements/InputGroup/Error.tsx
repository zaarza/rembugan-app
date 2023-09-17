type ErrorProps = {
    message: string;
};

const Error = ({ message }: ErrorProps) => {
    if (message && message.length > 0) {
        return <small className="self-end text-red-500 text-base">{message}</small>;
    }
};

export default Error;
