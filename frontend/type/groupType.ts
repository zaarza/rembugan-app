type groupType = {
    id: string;
    name: string;
    description: string | null;
    avatar: string | null;
    created_by: string;
    created_at: number;
    members: {
        is_admin: 0 | 1;
        joined_at: number;
        group_id: string;
        user_id: string;
    }[];
    messages: {
        id: string;
        content: string;
        sender_id: string;
        group_id: string;
        sent_at: number;
    }[];
};

export default groupType;
