import { Loader, TPopups } from "components";
import { useRouter } from "next/router";
import React, { RefObject, useState } from "react";
import { firebaseApi, FirebaseErrors } from "services/firebase";
import { transformErrorMessage } from "utils";
import { FaDiscourse } from "react-icons/fa";

interface SignUpProps {
  closePopup: (type?: TPopups) => () => void;
  ref?: RefObject<HTMLDivElement>;
}

export const SignUpPopup: React.FC<SignUpProps> = ({
  closePopup,
  ...props
}) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== rePassword) {
      setIsLoading(false);
      setError("Please confirm your password");
      return;
    }
    if (username.length <= 2) {
      setIsLoading(false);
      setError("Username shoud be at least 2 characters");
      return;
    }

    const result = await firebaseApi.POST.signUp.withPassword(e, {
      email,
      password,
      username,
    });

    if (result.type === "data") {
      router.push("/chats");
      closePopup("null")();
    } else {
      const message = transformErrorMessage(result.error.message);
      console.log(message);
      const error = FirebaseErrors[message];
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={(e) => handleSignUp(e)} className="form">
      <div className="form-demo-info">
        <FaDiscourse size={50} className="hidden md:block md:mb-[20px]" />
        <h1 className="text-[18px] mb-1 md:mb-6">Hint!</h1>
        <span className="md:mb-1 text-center">
          Get your demo account, when you try to Login.
        </span>
      </div>
      <div className="or-marker md:hidden">
        <span className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-[10px] rounded-full bg-white">
          or
        </span>
      </div>
      <div className="flex flex-col">
        <h1 className="form-banner-h mb-[20px]">
          Let&apos;s get you started today!
        </h1>
        <label htmlFor="signup-email" className="form-label">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type Your Email..."
        />
        <label htmlFor="signup-username" className="form-label">
          Username
        </label>
        <input
          className="input"
          type="text"
          id="signup-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type Your username..."
        />
        <label htmlFor="signup-password" className="form-label">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type Your Password..."
        />
        <label htmlFor="rePassword" className="form-label">
          Repeat Password
        </label>
        <input
          className="input"
          type="password"
          id="rePassword"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="Confirm Password..."
        />
        {error && <span className="form-error">{error}</span>}
        {isLoading ? (
          <div className="flex items-center justify-center mt-[10px]">
            <Loader />
          </div>
        ) : (
          <button
            type="submit"
            className="p-2 py-[15px] border-2 rounded-[10px] bg-black/90 text-white mt-[20px]"
          >
            Sign Up
          </button>
        )}
      </div>
    </form>
  );
};
