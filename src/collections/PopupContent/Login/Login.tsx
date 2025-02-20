import { GoogleBtn, Loader, TPopups } from "components";
import { FaDiscourse } from "react-icons/fa";
import { useRouter } from "next/router";
import React, { RefObject, useState } from "react";
import { firebaseApi, FirebaseErrors } from "services/firebase";
import { transformErrorMessage } from "utils";

interface LoginProps {
  closePopup: (type?: TPopups) => () => void;
  ref?: RefObject<HTMLDivElement>;
}

export const LoginPopup: React.FC<LoginProps> = ({ closePopup, ...props }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    const res = await firebaseApi.POST.signIn.withGoogle();

    if (res.type === "data") {
      router.push("/chats");
      closePopup("null")();
    } else {
      const message = transformErrorMessage(res.error.message);
      const error = FirebaseErrors[message];
      console.error(error);
      setError(error);
    }

    setIsLoading(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    setError(null);

    const result = await firebaseApi.POST.signIn.withPassword(e, {
      email,
      password,
    });

    if (result.type === "data") {
      router.push("/chats");
      closePopup("null")();
    } else {
      const message = transformErrorMessage(result.error.message);
      const error = FirebaseErrors[message];
      setError(error);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleLoginSubmit} className="form">
      <div className="form-demo-info">
        <FaDiscourse size={50} className="hidden md:block md:mb-[20px]" />
        <h1 className="text-[18px] mb-1 md:mb-6">Demo Account</h1>
        <span className="md:mb-1">email: user@gmail.com</span>
        <span>password: 123123</span>
      </div>
      <div className="flex flex-col">
        <h1 className="form-banner-h">Welcome back to Banjoshire!</h1>
        <span className="form-banner-span">
          Continiue with Google or enter your details.
        </span>
        <GoogleBtn handleGoogleSignIn={handleGoogleSignIn} />
        <div className="or-marker">
          <span className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-[10px] rounded-full bg-white">
            or
          </span>
        </div>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type Your Email..."
        />
        <label htmlFor="password" className="form-label mt-[10px]">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type Your Password..."
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
            Login To Banjoshire
          </button>
        )}
      </div>
    </form>
  );
};
