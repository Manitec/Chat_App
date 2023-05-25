import { PayloadAction } from "@reduxjs/toolkit";
import {
  CreateRoomForm,
  EditProfileAvatar,
  EditProfileBanner,
} from "collections/Forms";
import { EmptyPopup, LoginPopup, SignUpPopup } from "collections/PopupContent";
import UserInfo from "collections/PopupContent/UserInfo/UserInfo";
import { useAppSelector } from "hooks";
import React, { RefObject } from "react";
import { createPortal } from "react-dom";

export type TPopups =
  | "login"
  | "signUp"
  | "null"
  | "createRoom"
  | "editProfile"
  | "editBanner"
  | "userInfo";

const popups = {
  null: EmptyPopup,
  login: LoginPopup,
  signUp: SignUpPopup,
  createRoom: CreateRoomForm,
  editProfile: EditProfileAvatar,
  editBanner: EditProfileBanner,
  userInfo: UserInfo,
};

interface PopupProps {
  closePopup: (type?: TPopups) => PayloadAction<TPopups>;
  popupType: TPopups;
  ref?: RefObject<HTMLDivElement>;
}

export const Popup: React.FC<PopupProps> = ({
  popupType,

  closePopup,
  ...props
}) => {
  const CurrentPopup = popups[popupType || "null"];
  const { userInfo } = useAppSelector((state) => state.counter);

  return (
    <>
      <div
        {...props}
        onClick={() => closePopup("null")}
        className={
          popupType !== "null"
            ? "z-[110] flex items-center fixed justify-center bg-slate-900 opacity-[0.5]  w-full h-full top-0 left-0"
            : "hidden"
        }
      />
      <div className={"form-container"}>
        <CurrentPopup closePopup={() => closePopup} userInfo={userInfo} />
      </div>
    </>
  );
};
