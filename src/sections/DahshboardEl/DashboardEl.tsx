import { icons } from "collections";
import { useUser } from "contexts";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi, IRoom, togglePopup } from "services";
import { hasUserJoined } from "utils";
import { exploreBackground, stars } from "assets";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "hooks";

interface DashboardProps {
  ref?: RefObject<HTMLDivElement>;
}

export const DashboardEl: React.FC<DashboardProps> = ({ ...props }) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const router = useRouter();
  const { user } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    firebaseApi.GET.allRooms(setRooms);
  }, []);

  const handleGoToRoom = (roomName: string, userJoined: boolean) => () => {
    if (!userJoined) {
      firebaseApi.POST.room.join(roomName);
    }
    if (router.pathname === "/chats") {
      router.push(`chats/${roomName}`);
    } else {
      router.push(roomName);
    }
  };

  return (
    <>
      <section className="dashboard" {...props}>
        <div className="w-full h-[40vw] top-0 max-h-[400px] flex items-center justify-center flex-col">
          <h1 className="dashboard-greeting z-[10]">Explore Rooms</h1>
          <span className="z-[10] my-[10px] text-white md:my-[20px] md:text-[20px]">
            Or
          </span>
          <button
            onClick={() => dispatch(togglePopup("createRoom"))}
            className="create-room-button z-[10]"
            type="button"
          >
            Create A New Room
          </button>
          <Image
            className="pointer-events-none"
            src={exploreBackground}
            alt="explore-background"
            fill
            style={{
              objectFit: "cover",
            }}
          />
          <Image
            className="pointer-events-none absolute left-10 top-10 animate-starsLeft"
            src={stars}
            alt="stars-background"
          />
          <Image
            className="pointer-events-none absolute left-[-100px] top-[40%] animate-starsLeft"
            src={stars}
            alt="stars-background"
          />
          <Image
            className="pointer-events-none absolute bottom-0 right-0 animate-starsRight"
            src={stars}
            alt="stars-background"
          />
          <Image
            className="pointer-events-none absolute bottom-[40%] right-[-200px] animate-starsRight"
            src={stars}
            alt="stars-background"
          />
        </div>
        <div className="dashboard-info">
          <h3 className="dashboard-greeting-info">
            Click on a room to join the conversation!
          </h3>
          <div className="dashboard-rooms-container">
            {rooms.map((room, i) => {
              const Icon = icons[room.icon];
              if (room.icon === undefined) return null;
              const userHasJoined = hasUserJoined(room, user?.uid || "!user!");
              return (
                <div
                  key={i}
                  className="dashboard-room"
                  onClick={handleGoToRoom(room.name, userHasJoined)}
                >
                  <Icon size={20} />
                  <div className="dashboard-room-tooltip">{room.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
