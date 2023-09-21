import { useState, useEffect } from "react";
import { useFormik } from "formik";

import Button from "@/features/main/ui/reusable/Button";
import ButtonIcon from "@/features/main/ui/reusable/ButtonIcon";
import ConfirmRequest from "@/features/main/ui/reusable/ConfirmRequest";
import InputGroup from "@/features/main/ui/reusable/InputGroup";
import MenuItem from "@/features/main/ui/reusable/MenuItem";
import Searchbar from "@/features/main/ui/reusable/MenuSearchbar";
import Modal from "@/features/main/ui/reusable/Modal";
import PlusSvg from "@/shared/icons/Plus";

type groupType = {
    name: string;
    members: number;
    profilePicturePath?: string;
};

const MenuGroups = () => {
    const [groups, setGroups] = useState<groupType[]>([
        {
            name: "Class Discussion",
            members: 20,
            profilePicturePath: "/assets/images/avatar-dummy.png",
        },
    ]);
    const [groupInvitations, setGroupInvitations] = useState([
        {
            id: "1",
            name: "Classroom",
            time: 1694836137714,
            profilePicturePath: "/assets/images/avatar-dummy.png",
        },
        {
            id: "1",
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
                        <h1 className="text-xl font-semibold text-slate-800">Groups</h1>
                        <ButtonIcon icon={<PlusSvg />} action={() => setShowJoinGroupModal(!showJoinGroupModal)} />
                    </div>
                    <Searchbar name="contacts" placeholder="Search groups..." value={query} setValue={(event) => setQuery(event.target.value)} submitHandler={submitQuery} />
                </div>

                <div className="flex flex-col overflow-auto pb-36">
                    {groups.map((groupItem, index: number) => (
                        <MenuItem name={groupItem.name} message="Adi: Hello World" profilePicturePath={groupItem.profilePicturePath} key={`group-${index}`} action={() => {}} />
                    ))}
                </div>

                <div className="sticky flex flex-col p-6 mt-auto gap-y-2 mb-9 lg:mb-0">
                    <Button variant="PRIMARY" action={() => setShowGroupInvitationModal(!showGroupInvitationModal)}>
                        <div className="flex justify-center gap-x-5">
                            <svg className="w-5 fill-white aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                            </svg>
                            <span className="text-sm text-white">Group Invitation</span>
                        </div>
                    </Button>

                    <Button variant="PRIMARY" action={() => setShowCreateGroupModal(!showCreateGroupModal)}>
                        <div className="flex justify-center gap-x-5">
                            <div className="w-5 first:fill-white">
                                <PlusSvg />
                            </div>
                            <span className="text-sm text-white">Create a New Group</span>
                        </div>
                    </Button>
                </div>
            </div>

            <Modal title="Join a Group" show={showJoinGroupModal} toggleShow={() => setShowJoinGroupModal(!showJoinGroupModal)}>
                <form className="flex flex-col px-5 pb-5 gap-y-6" onSubmit={form.handleSubmit}>
                    <InputGroup name="pin" label="Insert group pin" placeholder="PIN Number..." type="text" formikObject={form} />
                    <div className="flex gap-x-5">
                        <Button displayText="Cancel" variant="BORDER-PRIMARY" action={() => setShowJoinGroupModal(!showJoinGroupModal)} />
                        <Button displayText="Join" variant="PRIMARY" type="submit" disabled={form.isSubmitting} />
                    </div>
                </form>
            </Modal>

            <Modal title="Group Invitation" show={showGroupInvitationModal} toggleShow={() => setShowGroupInvitationModal(!showGroupInvitationModal)}>
                <div className="flex flex-col overflow-y-auto max-h-72">
                    {groupInvitations.map((groupItem, index) => (
                        <ConfirmRequest id={groupItem.id} name={groupItem.name} time={groupItem.time} profilePicturePath={groupItem.profilePicturePath} type="GROUP" key={`group-invitation-request-${index}`} />
                    ))}
                </div>
            </Modal>

            <Modal title="Create a New Group" show={showCreateGroupModal} toggleShow={() => setShowCreateGroupModal(!showCreateGroupModal)}>
                <form className="flex flex-col px-5 pb-5 gap-y-6">
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

export default MenuGroups;
