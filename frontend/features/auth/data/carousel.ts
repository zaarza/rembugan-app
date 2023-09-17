interface CarouselItem {
    image: string,
    title: string,
    description: string,
}

const carouselData: CarouselItem[] = [
    {
        image: "/assets/images/carousel-private.png",
        title: "Start Conversation Effortlessly",
        description: "Discover new friends and begin talking about things you love.",
    },
    {
        image: "/assets/images/carousel-group.png",
        title: "Interactive Group Chats",
        description: "Communicate with groups of friends in lively and dynamic group chats.",
    },
    {
        image: "/assets/images/carousel-notification.png",
        title: "Real-Time Notifications",
        description: "Never miss important messages with instant notifications send directly to your inbox",
    },
];

export default carouselData;