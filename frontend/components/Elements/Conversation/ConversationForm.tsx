
type ConversationFormProps = {
    form: any;
};

const ConversationForm = ({form}: ConversationFormProps) => {
    return (
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
    );
};

export default ConversationForm;
