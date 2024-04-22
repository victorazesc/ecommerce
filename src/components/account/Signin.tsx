"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Signin = () => {
    const labelStyles = "w-full text-sm";
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            window.location.reload();
        }
    }, [session]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (res?.error) {
            setError(res.error as string)
        };

        if (!res?.error) {
            return router.push("/")
        };
    };

    return (
        <section className="flex items-center justify-center w-full pt-12 xs:h-80vh">
            <form
                className="p-6 xs:p-10	w-full max-w-350 flex flex-col justify-between items-center gap-2.5	
                border border-solid border-[#2E2E2E] bg-[#0A0A0A] rounded-md"
                onSubmit={handleSubmit}
            >
                {error && <div className="text-[#FF6166] flex items-center justify-center gap-2">
                    <svg
                        data-testid="geist-icon"
                        height="16"
                        strokeLinejoin="round"
                        viewBox="0 0 16 16"
                        width="16"
                        style={{ color: 'currentColor' }}
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.30761 1.5L1.5 5.30761L1.5 10.6924L5.30761 14.5H10.6924L14.5 10.6924V5.30761L10.6924 1.5H5.30761ZM5.10051 0C4.83529 0 4.58094 0.105357 4.3934 0.292893L0.292893 4.3934C0.105357 4.58094 0 4.83529 0 5.10051V10.8995C0 11.1647 0.105357 11.4191 0.292894 11.6066L4.3934 15.7071C4.58094 15.8946 4.83529 16 5.10051 16H10.8995C11.1647 16 11.4191 15.8946 11.6066 15.7071L15.7071 11.6066C15.8946 11.4191 16 11.1647 16 10.8995V5.10051C16 4.83529 15.8946 4.58093 15.7071 4.3934L11.6066 0.292893C11.4191 0.105357 11.1647 0 10.8995 0H5.10051ZM8.75 3.75V4.5V8L8.75 8.75H7.25V8V4.5V3.75H8.75ZM8 12C8.55229 12 9 11.5523 9 11C9 10.4477 8.55229 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                    <div className="text-sm">{error}</div>
                </div>}
                <h1 className="w-full mb-5 text-2xl font-bold">Conecte-se</h1>

                <label className={labelStyles}>Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full text-[#A1A1A1] h-8 border border-solid border-[#2E2E2E] py-1 px-2.5 rounded bg-black text-13"
                    name="email"
                />

                <label className={labelStyles}>Senha:</label>
                <div className="flex w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full text-[#A1A1A1] h-8 border border-solid border-[#2E2E2E] py-1 px-2.5 rounded-l bg-black text-13"
                        name="password"
                    />
                    <button
                        className="flex text-[#A1A1A1] items-center justify-center w-2/12 transition duration-150 bg-black border-r border-solid rounded-r border-y border-[#2E2E2E] ease hover:bg-[#1F1F1F]"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword)
                        }}
                        type='button'
                    >
                        {showPassword
                            ? <EyeIcon />
                            : <EyeOffIcon />}
                    </button>
                </div>
                <button
                    className="w-full bg-black border border-solid border-[#2E2E2E] py-1.5 mt-2.5 rounded transition-all hover:bg-[#1F1F1F] hover:border-[#454545] text-13"
                    type='submit'
                >
                    Entrar
                </button>

                <div className="relative flex items-center justify-center w-full h-10">
                    <div className="absolute w-full h-px top-2/4 bg-[#2E2E2E]"></div>
                    <p className="z-10 flex items-center justify-center w-8 h-6 bg-[#0A0A0A]">ou</p>
                </div>

                <button
                    className="flex text-[#A1A1A1] items-center gap-3 px-4 py-2 text-sm align-middle transition-all bg-black border border-solid rounded border-[#2E2E2E] ease hover:bg-[#1F1F1F] hover:border-[#454545]"
                    onClick={(e) => {
                        e.preventDefault();
                        signIn("google")
                    }}
                    type='button'
                >
                    <svg
                        data-testid="geist-icon"
                        height="20"
                        strokeLinejoin="round"
                        viewBox="0 0 16 16"
                        width="20"
                        style={{ color: 'currentColor' }}
                    >
                        <path
                            d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
                            fill="#4285F4"
                        ></path>
                        <path
                            d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
                            fill="#34A853"
                        ></path>
                        <path
                            d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
                            fill="#FBBC05"
                        ></path>
                        <path
                            d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
                            fill="#EA4335"
                        ></path>
                    </svg>
                    Faça login no Google
                </button>
                <Link href="/register" className="text-sm transition duration-150 text-[#A1A1A1] ease hover:text-white">Não tem uma conta?</Link>
            </form>
        </section>
    );
}

export default Signin;
