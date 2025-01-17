import React, { useReducer } from "react";
import signupBanner from "../../assets/images/signupBanner.png";
import { Link } from "react-router-dom";
import { signupReducer, initialStateSignup } from "../../reducers/SignupReducer";
import InputField from "./Units/InputField";
import UserType from "./Units/UserType";
import { useGlobalContext } from "../../context/Context";

const SignUp = () => {
    const [state, dispatch] = useReducer(signupReducer, initialStateSignup);
    const { toggleSpinner, setMessage } = useGlobalContext();

    const { name, email, password, confirmPassword, formValid, userType } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.hasError || email.hasError || password.hasError || confirmPassword.hasError || formValid === false) {
            // If there are errors in the form, do nothing
            setMessage(true, "error", "Please fill out all fields correctly!");
            return;
        }
        // Form is valid, proceed with the API call
        toggleSpinner()

        const formData = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            userType: userType,
        };

        console.log(formData);
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="drop-shadow-xl border rounded-2xl bg-white flex flex-col md:flex-row">
                <div className="flex flex-col items-center justify-center p-8 md:w-1/2">
                    <h1 className="uppercase font-extrabold text-3xl mb-6">Register</h1>

                    <form className="w-full space-y-4" onSubmit={handleSubmit}>

                        <InputField state={state} dispatch={dispatch} />
                        <UserType state={state} dispatch={dispatch} />

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-br from-[#9181F4] to-[#5038ED] hover:from-[#9181F4] hover:to-[#5038ED] focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-white text-xs px-5 py-3.5 shadow-lg"
                            >
                                Create Account
                            </button>
                        </div>

                    </form>
                    
                    <div className="flex flex-col flex-grow justify-end items-center pt-10">
                        <p className="text-sm">Already have an account?</p>
                        <p>
                            <Link to="/auth/signin" className="font-bold text-blue-700 hover:text-blue-800 transition-colors">Login</Link>{" "}
                            <span className="text-sm">Now</span>
                        </p>

                        <p className="text-xs mt-10 text-gray-400">Go back to <Link to="/" className="underline underline-offset-2">Home</Link> </p>
                    </div>
                </div>
                <div className="hidden md:block overflow-hidden rounded-r-2xl md:w-1/2">
                    <img src={signupBanner} alt="signupBanner" className="max-w-full h-auto" />
                </div>
            </div>
        </div>
    )
}

export default SignUp;