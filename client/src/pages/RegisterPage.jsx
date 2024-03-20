import { useForm } from "react-hook-form";
import { registerRequest } from "@api/auth.js";

const inputsClassName =
    "w-full px-4 py-2 mb-6 text-white outline-none bg-zinc-700 focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50";

const RegisterPage = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async (values) => {
        // console.log(values);
        const res = await registerRequest(values);
        console.log(res);
    });

    return (
        <div className="mx-auto max-w-md bg-zinc-800 p-10">
            <h2 className="mb-6 text-center text-2xl font-semibold uppercase ">
                {" "}
                Register Page
            </h2>
            <form onSubmit={onSubmit}>
                <input
                    className={inputsClassName}
                    type="text"
                    {...register("username", { required: true })}
                    placeholder="Username"
                />
                <input
                    className={inputsClassName}
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                />
                <input
                    className={inputsClassName}
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                />

                <button className="w-full bg-slate-500 py-2 text-xl uppercase outline-none transition-all hover:bg-slate-600">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
