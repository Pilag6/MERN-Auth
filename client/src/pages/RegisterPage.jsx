/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useAuth } from "@contexts/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import registerImg from "../assets/register.webp";

// Icons
import { FaUserAstronaut } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { PiLockKey } from "react-icons/pi";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { signup, isAuthenticated, authError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            // Redirect the user to the home page if they are authenticated
            navigate("/tasks");
        }
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        await signup(values);
        reset(); // Reset the form after successful submission
    });

    return (
        <div className="mx-auto flex h-screen bg-zinc-800">
            <div className="h-screen flex-1">
                <img
                    className="h-screen object-cover object-center"
                    src={registerImg}
                    alt=""
                />
            </div>

            <div className="flex h-screen flex-1 flex-col justify-center">
                <h2 className="text-center text-4xl font-semibold mb-10">Register</h2>
                {authError.map((err, index) => (
                    <span
                        key={index}
                        className="w-2/4 bg-red-500 px-2 py-2 text-left text-white mx-auto"
                    >
                        {err}
                    </span>
                ))}
                <form
                    onSubmit={onSubmit}
                    className="mx-auto flex w-2/4 flex-col items-center justify-center"
                >
                    <div
                        className={`mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-white`}
                    >
                        <FaUserAstronaut />
                        <input
                            className="w-full bg-transparent text-white outline-none "
                            type="text"
                            {...register("username", { required: true })}
                            placeholder={`Username`}
                        />
                    </div>

                    {errors.username && (
                        <span className="w-full bg-red-500 px-2 py-2 text-left text-white">
                            This field is required
                        </span>
                    )}

                    <div
                        className={`mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-white`}
                    >
                        <MdAlternateEmail />
                        <input
                            className="w-full bg-transparent text-white outline-none "
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Email"
                        />
                    </div>

                    {errors.email && (
                        <span className="w-full bg-red-500 px-2 py-2 text-left text-white">
                            This field is required
                        </span>
                    )}

                    <div
                        className={`mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-white`}
                    >
                        <PiLockKey />
                        <input
                            className="w-full bg-transparent text-white outline-none "
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Password"
                        />
                    </div>

                    {errors.password && (
                        <span className="w-full bg-red-500 px-2 py-2 text-left text-white">
                            This field is required
                        </span>
                    )}

                    <button className="mt-7 w-full py-4 text-2xl font-semibold text-white outline-none outline-white transition-all hover:bg-[#B3C4A2] hover:text-zinc-800 hover:outline-2">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
