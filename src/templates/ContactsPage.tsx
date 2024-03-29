const ContactsPage = () => {
    return (
        <div className="relative flex h-full flex-col">
            <h3 className="p-[30px_0] text-center text-[18px] font-bold uppercase wishes-xs:p-[15px_0_25px] wishes-xs:text-[14px]">
                Contact
            </h3>

            <div className="absolute left-[50%] top-[50%] w-full translate-x-[-50%] translate-y-[-50%]">
                <div className="rounded-[10px] bg-white/[0.03] p-[30px] text-center text-white shadow-lg">
                    Email{" "}
                    <a
                        href="mailto:aga@nuah.org"
                        className="text-accent-green underline"
                    >
                        aga@nuah.org
                    </a>
                </div>
            </div>

            <div />
        </div>
    );
};

export default ContactsPage;
