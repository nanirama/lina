/**
 * Form used for forgot my password functionality
 */

import React, { useState } from "react";
import { ErrorDialog } from "./ErrorDialog";

interface Props {
    handleSubmit: (email: string) => Promise<unknown>;
}

const ForgotPasswordForm: React.FC<Props> = ({ handleSubmit }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const onClick = () => {
        handleSubmit(email).catch((e) => setError(e.toString()));
    };
    return (
        <div className="bg-gray-300 p-8 lg:p-12 flex flex-col content-center items-center justify-center rounded-lg">
            <div className="text-2xl mb-4 text-gray-700 ">Password Reset</div>
            <div className="block uppercase text-gray-700 text-xs font-bold mb-2">
                Email
            </div>
            <input
                type="text"
                placeholder="Email"
                className="w-full mb-2 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-400 relative bg-white rounded text-sm shadow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {error ? <ErrorDialog error={error} close={() => setError("")} /> : null}
            <button className="primary-button-blue w-72" onClick={onClick}>
                Send Reset Link
            </button>
        </div>
    );
};

export default ForgotPasswordForm;
