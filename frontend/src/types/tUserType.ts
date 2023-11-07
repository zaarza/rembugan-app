type tUserType = {
    id: string;
    name: string;
    email: string;
    description: string | null;
    status: string | null;
    avatar: string | null;
    is_online: 0 | 1;
    last_seen: number;
    joined_at: number;
};

export default tUserType;
