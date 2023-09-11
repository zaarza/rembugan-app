import useAppStore from "@/store/app.store";

const ConversationItems = () => {
    const setShowConversation = useAppStore((state: any) => state.setShowConversation);

    return (
        <>
            <button className="bg-white hover:bg-primary/5 duration-300 flex py-4 px-6 gap-x-5 items-center" type="button" onClick={() => setShowConversation(true)}>
                <img className="w-13 aspect-square rounded-lg" src="/assets/images/avatar2-dummy.png" alt="" />
                <div className="flex flex-col items-start gap-y-1 w-full">
                    <div className="flex justify-between w-full items-start">
                        <h1 className="font-medium text-base text-slate-800">Samsudin</h1>
                        <small className="text-xs text-black/40">08.27</small>
                    </div>
                    <div className="flex justify-between w-full items-start">
                        <h2 className="text-sm text-slate-800 line-clamp-1 overflow-clip text-left max-w-[90%]">My code is not working Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis repellendus quaerat praesentium asperiores ipsam velit quos quidem, facere tempora deserunt temporibus ratione ex, aperiam cumque eum, hic molestiae? Beatae assumenda veritatis molestias quod adipisci quasi dolorum. Magnam magni, cum ea, quo quos deleniti repellendus qui harum temporibus odit nobis, veritatis libero aliquam. Repellendus veritatis dignissimos dolor cupiditate quas modi laudantium? Unde accusantium quibusdam officiis. Natus earum autem ipsum laboriosam et, nobis aperiam facilis sapiente dicta. Error vero repudiandae natus repellat exercitationem. Iste minima ipsum esse illo magni perspiciatis, autem debitis eveniet non sequi culpa sapiente qui inventore quia placeat animi.</h2>
                        <small className="bg-primary rounded-full w-5 aspect-square text-white flex justify-center items-center relative"><span className="absolute">1</span></small>
                    </div>
                </div>
            </button>
        </>
    )
}

export default ConversationItems;