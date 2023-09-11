import { useState } from "react";
import MessageCard from "./MessageCard";
import { useFormik } from "formik";
import useAppStore from "@/store/app.store";

const Conversation = () => {
    const setShowConversation = useAppStore((state: any) => state.setShowConversation);
    const [showChatProfileDetail, setShowChatProfileDetail] = useState<boolean>(false);
    const [showChatProfileAction, setShowChatProfileAction] = useState<boolean>(false);
    
    const form = useFormik({
        initialValues: {
            content: "",
        },
        onSubmit: (values) => submit(values),
    });

    const submit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="absolute top-0 left-0 z-10 flex w-full h-full conversation lg:relative bg-background min-w-[380px]">
            <div className="w-full">
                {/* TITLE */}
                <div className="sticky top-0 flex items-center justify-between px-3 py-3 bg-white border border-l-0 title lg:px-8 border-b-black/10">
                    <div className="flex gap-x-4">
                        <button type="button" className="w-5 lg:hidden group" onClick={() => setShowConversation(false)}>
                            <svg className="fill-slate-800 group-hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                            </svg>
                        </button>
                        <img src="/assets/images/avatar2-dummy.png" className="w-12 rounded-lg aspect-square" />
                        <div className="flex flex-col justify-center gap-y-1">
                            <h1 className="text-sm font-medium text-slate-800">Samsudin</h1>
                            <h2 className="text-xs text-primary">Online</h2>
                        </div>
                    </div>
                    <button className="w-8 group" onClick={() => setShowChatProfileDetail(!showChatProfileDetail)}>
                        <svg className="fill-slate-800 group-hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M3 4.99509C3 3.89323 3.89262 3 4.99509 3H19.0049C20.1068 3 21 3.89262 21 4.99509V19.0049C21 20.1068 20.1074 21 19.0049 21H4.99509C3.89323 21 3 20.1074 3 19.0049V4.99509ZM6.35687 18H17.8475C16.5825 16.1865 14.4809 15 12.1022 15C9.72344 15 7.62182 16.1865 6.35687 18ZM12 13C13.933 13 15.5 11.433 15.5 9.5C15.5 7.567 13.933 6 12 6C10.067 6 8.5 7.567 8.5 9.5C8.5 11.433 10.067 13 12 13Z"></path>
                        </svg>
                    </button>
                </div>

                {/* CHAT */}
                <div className="flex flex-col h-full pb-96 px-5 pt-3 overflow-y-scroll border-r border-r-black/10 chat">
                    <span className="sticky z-10 top-0 px-3 py-1 mx-auto text-sm bg-white border rounded-lg pointer-events-none border-black/10">Yesterday</span>
                    <div className="self-end">
                        <MessageCard name="You" avatar="/assets/images/avatar-dummy.png" content="Hello world!" utcTime={1693812681367} is_readed={true} />
                    </div>
                    <MessageCard name="You" avatar="/assets/images/avatar-dummy.png" content="Hello world!" utcTime={1693812681367} flip />
                    <MessageCard name="You" avatar="/assets/images/avatar-dummy.png" content="Hello world!" utcTime={1693812681367} flip />
                    <MessageCard name="You" avatar="/assets/images/avatar-dummy.png" content="Hello world!" utcTime={1693812681367} flip />
                    <MessageCard name="You" avatar="/assets/images/avatar-dummy.png" content="Hello world!" utcTime={1693812681367} flip />
                    <MessageCard name="You" avatar="/assets/images/avatar-dummy.png" content="Hello world!" utcTime={1693812681367} flip />
                </div>
                {/* FORM */}
                <form className="sticky bottom-0 flex justify-between bg-white border-t border-r border-r-black/10 border-t-black/10" onSubmit={form.handleSubmit}>
                    <label htmlFor="content" className="w-full px-5 py-4">
                        <input id="content" type="text" className="w-full focus:outline-none text-slate-500 placeholder:text-sm" placeholder="Type to add your message" {...form.getFieldProps("content")} />
                    </label>
                    <button type="submit" className="flex justify-center px-5 group">
                        <svg className="w-6 group-hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M1.94631 9.31555C1.42377 9.14137 1.41965 8.86034 1.95706 8.6812L21.0433 2.31913C21.5717 2.14297 21.8748 2.43878 21.7268 2.95706L16.2736 22.0433C16.1226 22.5718 15.8179 22.5901 15.5946 22.0877L12.0002 14.0002L18.0002 6.00017L10.0002 12.0002L1.94631 9.31555Z"></path>
                        </svg>
                    </button>
                </form>
            </div>

            {/* CHAT SIDEBAR */}
            <div className={`flex fixed h-full flex-col gap-y-10 p-3 md:static right-0 top-0 border-l border-l-black/10 md:border-0 bg-white w-[80%] max-w-[340px] z-20 ${showChatProfileDetail ? "-mr-0 duration-300" : "-mr-[9999px] duration-300"}`}>
                {/* TITLE */}
                <div className="flex items-center justify-between title">
                    <button className="h-full pr-3 group flex" onClick={() => setShowChatProfileDetail(false)}>
                        <svg className="group-hover:fill-primary w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                        </svg>
                    </button>
                    <div className="flex flex-col gap-y-1">
                        <h1 className="text-sm font-semibold text-slate-800">Contact Information</h1>
                        <h2 className="text-xs text-slate-800">Detail information about this contact</h2>
                    </div>
                    <button type="button" className="h-full pr-3 group flex" onClick={() => setShowChatProfileAction(!showChatProfileAction)}>
                        <svg className="group-hover:fill-primary w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                        </svg>
                        <div className={`bg-white overflow-hidden rounded-lg border border-black/10 absolute right-0 top-[50px] ${showChatProfileAction ? "block" : "hidden"}`}>
                            <button className="py-3 px-5 text-red-500 whitespace-nowrap bg-white hover:brightness-95">Delete Contact</button>
                        </div>
                    </button>
                </div>
                {/* PROFILE */}
                <div className="flex flex-col gap-y-3">
                    <img className="rounded-lg self-center max-w-[100px] w-full min-w-[24px]" src="/assets/images/avatar2-dummy.png" alt="" />
                    <div className="flex flex-col items-center gap-y-1">
                        <h3 className="font-semibold text-slate-800">Samsudin</h3>
                        <h4 className="text-xs text-slate-800">Available</h4>
                    </div>
                </div>
                <div className="flex flex-col gap-y-1">
                    <h3 className="font-medium text-sm text-slate-800">Profile Description</h3>
                    <h4 className="text-xs text-slate-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum rhoncus est a euismod. In nec justo justo. Nulla ante libero.</h4>
                </div>
                <div className="flex flex-col gap-y-1">
                    <h3 className="font-medium text-sm text-slate-800">More Information</h3>
                    <div className="flex flex-col gap-y-2">
                        <span title="Email address" className="flex items-center gap-x-3">
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path>
                            </svg>
                            <p className="text-xs text-slate-800">samsudinemail@email.com</p>
                        </span>
                        <span title="Joined at" className="flex items-center gap-x-3">
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z"></path>
                            </svg>
                            <p className="text-xs text-slate-800">1693812681367</p>
                        </span>
                        <span title="Status" className="flex items-center gap-x-3">
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12H15C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12H7Z"></path>
                            </svg>
                            <p className="text-xs text-slate-800">Available</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conversation;
