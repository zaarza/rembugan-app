import React from "react";

import H1 from "@/components/Elements/Heading/H1";
import H2 from "@/components/Elements/Heading/H2";

type AuthTitleProps = {
    subtitle: string;
}

const AuthTitle = ({ subtitle }: AuthTitleProps) => {
    return (
        <div className="header flex flex-col gap-y-2">
            <img className="w-14" src="/assets/images/rembugan-logo.svg" alt="rembugan logo" />
            <H1 text="Welcome to Rembugan!" />
            <H2 text={subtitle} />
        </div>
    );
};

export default AuthTitle;
