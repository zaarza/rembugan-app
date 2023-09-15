import React, { useState } from "react";
import MenuHeader from "../MenuHeader";
import MessageItem from "./MessageItem";

type PrivateMenuProps = {
    show: boolean;
};

const PrivateMenu = ({ show }: PrivateMenuProps) => {
    const searchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(search);
    };

    const [search, setSearch] = useState<string>("");

    if (show) {
        return (
            <div className="flex flex-col w-full h-full">
                <MenuHeader value={search} setValue={(event) => setSearch(event.target.value)} title="Messages" submitHandler={searchSubmit} />
                <div className="flex flex-col overflow-auto pb-36">
                    <MessageItem name="Samsudin" message="Hello world" time={1693812681367} profilePicturePath="assets/images/avatar-dummy.png" />
                    <MessageItem name="Samsudin" message="Hello world" time={1693812681367} profilePicturePath="assets/images/avatar2-dummy.png" />
                    <MessageItem name="Samsudin" message="Hello world" time={1693812681367} profilePicturePath="assets/images/avatar-dummy.png" />
                    <MessageItem name="Samsudin" message="Hello world" time={1693812681367} profilePicturePath="assets/images/avatar-dummy.png" />
                </div>
            </div>
        );
    }
};

export default PrivateMenu;
