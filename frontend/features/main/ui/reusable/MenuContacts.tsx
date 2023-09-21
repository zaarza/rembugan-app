import { useState, useEffect } from "react";

import confirmRequestType from "@/features/main/type/confirmRequest";
import ModalAddContact from "@/features/main/ui/reusable/ModalAddContact";
import ModalFriendRequest from "@/features/main/ui/reusable/ModalFriendRequest";
import contactType from "@/features/main/type/contact";
import Button from "@/features/main/ui/reusable/Button";
import ButtonIcon from "@/features/main/ui/reusable/ButtonIcon";
import Searchbar from "@/features/main/ui/reusable/MenuSearchbar";
import UserAddSvg from "@/shared/icons/UserAdd";
import MenuItem from "@/features/main/ui/reusable/MenuItem";
import MailSvg from "@/shared/icons/Mail";

const MenuContacts = () => {
    const [contacts, setContacts] = useState<contactType[]>([
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
    const [showModalFriendRequest, setShowModalFriendRequest] = useState<boolean>(false);
    const [friendRequests, setFriendRequests] = useState<confirmRequestType[]>([
        {
            name: "Samsudin",
            time: 1694836137714,
            profilePicturePath: "/assets/images/avatar-dummy.png",
            type: "FRIEND",
        },
        {
            name: "Bagas",
            time: 1694836137714,
            profilePicturePath: "/assets/images/avatar2-dummy.png",
            type: "FRIEND",
        },
    ]);

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
                        <h1 className="text-xl font-semibold text-slate-800">Contacts</h1>
                        <ButtonIcon
                            icon={<UserAddSvg />}
                            action={() => {
                                setShowAddContactModal(!showAddContactModal);
                            }}
                            active={false}
                        />
                    </div>
                    <Searchbar name="contacts" placeholder="Search contact..." value={query} setValue={(event) => setQuery(event.target.value)} submitHandler={submitQuery} />
                </div>

                <div className="flex flex-col overflow-auto pb-36">
                    {contacts.map((contactItem, index: number) => (
                        <MenuItem name={contactItem.name} message={contactItem.status} profilePicturePath={contactItem.profilePicturePath} key={`message-${index}`} action={() => {}} />
                    ))}
                </div>

                <div className="mt-auto p-6">
                    <Button variant="PRIMARY" action={() => setShowModalFriendRequest(!showModalFriendRequest)}>
                        <div className="flex gap-x-5 justify-center">
                            <div className="w-5 first:fill-white">
                                <MailSvg />
                            </div>
                            <span className="text-white text-sm">Friend Request</span>
                        </div>
                    </Button>

                    <ModalFriendRequest data={friendRequests} show={showModalFriendRequest} toggleShow={() => setShowModalFriendRequest(!setShowModalFriendRequest)} />
                </div>

                <ModalAddContact show={showAddContactModal} toggleShow={() => setShowAddContactModal(!showAddContactModal)} />
            </div>
        </>
    );
};

export default MenuContacts;
