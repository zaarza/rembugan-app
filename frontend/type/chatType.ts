type chatType = {
    id?: string;
    conversation_id: string;
    sender_id: string;
    message: string;
    sent_at: number;
    is_seen: 0 | 1;
};

export default chatType;
