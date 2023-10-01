type confirmRequest = {
    id: string;
    name: string;
    time: number;
    profilePicturePath: string;
    type: "FRIEND" | "GROUP";
}

export default confirmRequest;