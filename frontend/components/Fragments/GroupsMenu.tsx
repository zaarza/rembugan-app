import { useEffect, useState } from "react";
import Searchbar from "@/components/Elements/Menu/Searchbar";
import Title from "@/components/Elements/Menu/Title";
import Item from "@/components/Elements/Menu/Item/";
import ButtonIcon from "../Elements/Button/ButtonIcon";
import Button from "../Elements/Button";
import Modal from "../Elements/Modal";
import InputGroup from "../Elements/InputGroup";
import { useFormik } from "formik";
import ConfirmRequest from "../Elements/ConfirmRequest";

type Group = {
    name: string;
    members: number;
    profilePicturePath?: string;
};

const GroupsMenu = () => {
    const [groups, setGroups] = useState<Group[]>([
        {
            name: "Class Discussion",
            members: 20,
            profilePicturePath: "/assets/images/avatar-dummy.png",
        },
    ]);
    const [groupInvitations, setGroupInvitations] = useState([
        {
            name: "Classroom",
            time: 1694836137714,
            profilePicturePath: "/assets/images/avatar-dummy.png",
        },
        {
            name: "Basketball Club",
            time: 1694836137714,
            profilePicturePath: "/assets/images/avatar-dummy.png",
        },
    ]);
    const [showGroupInvitationModal, setShowGroupInvitationModal] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [showJoinGroupModal, setShowJoinGroupModal] = useState<boolean>(false);
    const [showFriendRequestModal, setShowFriendRequestModal] = useState<boolean>(false);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState<boolean>(false);

    const form = useFormik({
        initialValues: {
            pin: "",
        },
        onSubmit: (values) => submit(values),
    });

    const createGroupForm = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        onSubmit: (values) => submitCreateGroup(values),
    });

    const submitCreateGroup = (values: any) => {
        console.log(values);
    };

    const submit = (values: any) => {
        console.log(values);
    };

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
                        <Title text="Groups" />
                        <ButtonIcon action={() => setShowJoinGroupModal(!showJoinGroupModal)} active={false}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z"></path>
                            </svg>
                        </ButtonIcon>
                    </div>
                    <Searchbar name="contacts" placeholder="Search groups..." value={query} setValue={(event) => setQuery(event.target.value)} submitHandler={submitQuery} />
                </div>

                <div className="flex flex-col overflow-auto pb-36">
                    {groups.map((groupItem, index: number) => (
                        <Item name={groupItem.name} message="Adi: Hello World" profilePicturePath={groupItem.profilePicturePath} key={`group-${index}`} action={() => {}} />
                    ))}
                </div>

                <div className="mt-auto p-6 flex flex-col gap-y-2">
                    <Button variant="PRIMARY" action={() => setShowGroupInvitationModal(!showGroupInvitationModal)}>
                        <div className="flex gap-x-5 justify-center">
                            <svg className="fill-white w-5 aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                            </svg>
                            <span className="text-white text-sm">Group Invitation</span>
                        </div>
                    </Button>

                    <Button variant="PRIMARY" action={() => setShowCreateGroupModal(!showCreateGroupModal)}>
                        <div className="flex gap-x-5 justify-center">
                            <svg className="fill-white w-5 aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                            </svg>
                            <span className="text-white text-sm">Create a New Group</span>
                        </div>
                    </Button>
                </div>
            </div>

            <Modal title="Join a Group" show={showJoinGroupModal} toggleShow={() => setShowJoinGroupModal(!showJoinGroupModal)}>
                <form className="flex px-5 pb-5 flex-col gap-y-6" onSubmit={form.handleSubmit}>
                    <InputGroup name="pin" label="Insert group pin" placeholder="PIN Number..." type="text" formikObject={form} />
                    <div className="flex gap-x-5">
                        <Button displayText="Cancel" variant="BORDER-PRIMARY" action={() => setShowJoinGroupModal(!showJoinGroupModal)} />
                        <Button displayText="Join" variant="PRIMARY" type="submit" disabled={form.isSubmitting} />
                    </div>
                </form>
            </Modal>

            <Modal title="Group Invitation" show={showGroupInvitationModal} toggleShow={() => setShowGroupInvitationModal(!showGroupInvitationModal)}>
                <div className="flex flex-col max-h-72 overflow-y-auto">
                    {groupInvitations.map((groupItem, index) => (
                        <ConfirmRequest name={groupItem.name} time={groupItem.time} profilePicturePath={groupItem.profilePicturePath} type="GROUP" key={`group-invitation-request-${index}`}/>
                    ))}
                </div>
            </Modal>

            <Modal title="Create a New Group" show={showCreateGroupModal} toggleShow={() => setShowCreateGroupModal(!showCreateGroupModal)}>
                <form className="flex px-5 pb-5 flex-col gap-y-6">
                    <InputGroup name="name" type="text" label="Group name" placeholder="Group name" formikObject={createGroupForm} />
                    <InputGroup name="description" type="text" label="Description" placeholder="Description" formikObject={createGroupForm} />
                    <div className="flex gap-x-5">
                        <Button displayText="Cancel" variant="BORDER-PRIMARY" action={() => setShowCreateGroupModal(!showCreateGroupModal)} />
                        <Button displayText="Create" variant="PRIMARY" type="submit" disabled={createGroupForm.isSubmitting} />
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default GroupsMenu;
