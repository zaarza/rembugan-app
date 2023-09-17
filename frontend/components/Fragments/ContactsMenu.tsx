import { useEffect, useState } from "react";
import Searchbar from "@/components/Elements/Menu/Searchbar";
import Title from "@/components/Elements/Menu/Title";
import Item from "@/components/Elements/Menu/Item/";
import ButtonIcon from "../Elements/Button/ButtonIcon";
import AddNewContactModal from "./AddNewContactModal";
import Button from "../Elements/Button";
import Modal from "../Elements/Modal";
import MenubarInboxFriendRequest from "../Elements/Menubar/Button/Inbox/FriendRequest";
import FriendRequestItem from "../Elements/ConfirmRequest";
import FriendRequestModal from "./FriendRequestModal";
import FriendRequest from "@/type/FriendRequest";

type Contact = {
    name: string;
    status: string;
    profilePicturePath?: string;
};

const ContactsMenu = () => {
    const [contacts, setContacts] = useState<Contact[]>([
        {
            name: "Samsudin",
            status: "Available",
            profilePicturePath: "/assets/images/avatar-dummy.png",
        },
        {
            name: "Budi",
            status: "Busy",
            profilePicturePath: "/assets/images/avatar2-dummy.png",
        },
    ]);
    const [query, setQuery] = useState<string>("");
    const [showAddContactModal, setShowAddContactModal] = useState<boolean>(false);
    const [showFriendRequestModal, setShowFriendRequestModal] = useState<boolean>(false);
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
        {
            name: "Samsudin",
            time: 1694836137714,
            profilePicturePath: "/assets/images/avatar-dummy.png"
        },
        {
            name: "Bagas",
            time: 1694836137714,
            profilePicturePath: "/assets/images/avatar2-dummy.png"
        }
    ])

    const submitQuery = (event: any) => {
        event.preventDefault();
    };

    useEffect(() => {
        // TODO: Api integration for query
    }, [query]);

    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="sticky top-0 z-10 flex flex-col p-6 bg-white gap-y-5">
                    <div className="flex justify-between">
                        <Title text="Contacts" />
                        <ButtonIcon action={() => {setShowAddContactModal(!showAddContactModal)}} active={false}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z"></path></svg></ButtonIcon>
                    </div>
                    <Searchbar name="contacts" placeholder="Search contact..." value={query} setValue={(event) => setQuery(event.target.value)} submitHandler={submitQuery} />
                </div>

                <div className="flex flex-col overflow-auto pb-36">
                    {contacts.map((contactItem, index: number) => (
                        <Item name={contactItem.name} message={contactItem.status} profilePicturePath={contactItem.profilePicturePath} key={`message-${index}`} action={() => {}} />
                    ))}
                </div>

                <div className="mt-auto p-6">
                    <Button variant="PRIMARY" action={() => setShowFriendRequestModal(!showFriendRequestModal)}>
                        <div className="flex gap-x-5 justify-center">
                            <svg className="fill-white w-5 aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                            </svg>
                            <span className="text-white text-sm">Friend Request</span>
                        </div>
                    </Button>

                    <FriendRequestModal data={friendRequests} show={showFriendRequestModal} toggleShow={() => setShowFriendRequestModal(!setShowFriendRequestModal)} />
                </div>

                <AddNewContactModal show={showAddContactModal} toggleShow={() => setShowAddContactModal(!showAddContactModal)} />
            </div>
        </>
    );
};

export default ContactsMenu;
