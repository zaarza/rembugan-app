import useConversationForm from "@/features/main/hooks/useConversationForm";
import ButtonIcon from "@/features/main/ui/reusable/ButtonIcon";
import SendSvg from "@/shared/icons/Send";

const ConversationForm = () => {
    const form = useConversationForm();

    return (
        <form className="sticky bottom-0 flex justify-between bg-white border-t border-r border-r-black/10 border-t-black/10" onSubmit={form.handleSubmit}>
            <label htmlFor="content" className="w-full px-5 py-4">
                <input id="content" type="text" className="w-full focus:outline-none text-slate-500 placeholder:text-sm" placeholder="Type to add your message" {...form.getFieldProps("content")} />
            </label>
            <div className="flex items-center pr-5">
                <ButtonIcon icon={<SendSvg />} type="submit" />
            </div>
        </form>
    );
};

export default ConversationForm;
