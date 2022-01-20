/**
 * Forgot password page
 */
import { useRouter } from "next/router";
import React, { useState } from "react";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import { forgotPassword } from "../lib/api";

interface Props { }

const ForgotPassword: React.FC<Props> = () => {
    const router = useRouter();
    const handleSubmit = (email: string) =>
        forgotPassword(email).then(() => router.push("/reset-link-sent"));
    return (
        <div className="flex w-full bg-black content-center items-center justify-center h-screen">
            <ForgotPasswordForm handleSubmit={handleSubmit} />
        </div>
    );
};

export default ForgotPassword;
