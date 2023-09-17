type ConversationDateProps = {
    time: number | string;
}

const ConversationDate = ({time}: ConversationDateProps) => {
    return <span className="sticky z-10 top-0 px-3 py-1 mx-auto text-sm bg-white border rounded-lg pointer-events-none border-black/10">{time}</span>;
};

export default ConversationDate;
