import "./Header.scss";
import { Avatar, Dropdown, Label, Separator } from "@heroui/react";
import {
  ArrowRightFromSquare,
  ArrowRightToSquare,
  Bars,
  Persons,
  Person,
  PersonWorker,
  Folders,
} from "@gravity-ui/icons";

import { useAuthStore } from "../utils/state-machine";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "../services/firebase-auth";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  subHeaderText?: string;
  subHeaderClassName?: string;
  backgroundTheme?: "paper" | "dark";
};

export default function Header({
  setOpenAuthModal,
  subHeaderText,
  subHeaderClassName,
  backgroundTheme,
}: HeaderProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [userDetails, setUserDetails] = useState({
    id: "taluser1",
    name: "Ujwal Rajeev",
    email: "ujwalrajeev@theartworklabs.com",
    photoURL: "",
  });
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(route);
  };

  const signOut = async () => {
    try {
      await logout();
      useAuthStore.getState().setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails({
          id: user.uid,
          name: user.displayName || "No Name",
          email: user.email || "",
          photoURL: user.photoURL || "",
        });
        useAuthStore.getState().setIsLoggedIn(true);
      } else {
        useAuthStore.getState().setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <header className="header-container">
      <span className="flex items-center">
        <img
          className="first-look-logo"
          src="/Logo/logo_v3_3.png"
          alt="The Artwork Labs Logo"
          onClick={() => navigateTo("/")}
        />
        {subHeaderText && (
          <h1 className={subHeaderClassName}>{subHeaderText}</h1>
        )}
      </span>

      <span className="flex gap-2 items-center">
        {/* <div className="bg-[var(--dy-dark-text-heading)] w-14 flex justify-end px-[2px]">
          <p className="text-[var(--dy-paper-text-heading)] font-[500]">Menu</p>
        </div> */}
        <Dropdown>
          <Dropdown.Trigger className="rounded-full">
            <Bars
              style={{ color: `var(--dy-${backgroundTheme}-text-heading)` }}
              className={"size-7"}
            />
          </Dropdown.Trigger>
          <Dropdown.Popover className="min-w-[250px]">
            <div className="px-3 pt-3 pb-1">
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <Avatar.Image
                    alt="Profile Picture"
                    src={userDetails.photoURL}
                  />
                  <Avatar.Fallback className="bg-[var(--pastel-sage)] text-[var(--dy-${backgroundTheme}-text-heading)]">
                    <Person />
                  </Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col gap-0 text-[var(--dy-${backgroundTheme}-text-heading)]">
                  <p className="text-sm leading-5 font-medium">
                    {isLoggedIn ? userDetails.name : "Guest"}
                  </p>

                  <p className="text-xs">
                    {isLoggedIn
                      ? userDetails.email
                      : "Log in to access all features!"}
                  </p>
                </div>
              </div>
            </div>
            {isLoggedIn && (
              <Dropdown.Menu>
                <Dropdown.Item id="profile" textValue="Profile">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>Profile</Label>
                    <Person className="size-3.5 text-muted" />
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="about" textValue="about">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>About Us</Label>
                    <Persons className="size-3.5 text-muted" />
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="portfolio" textValue="portfolio">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>Portfolio</Label>
                    <Folders className="size-3.5 text-muted" />
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="help" textValue="help">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>Help</Label>
                    <PersonWorker className="size-3.5 text-muted" />
                  </div>
                </Dropdown.Item>
                <Separator className="opacity-50" />
                <Dropdown.Item
                  id="logout"
                  textValue="Logout"
                  variant="danger"
                  className="hover:bg-red-100"
                  onClick={signOut}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>Log Out</Label>
                    <ArrowRightFromSquare className="size-3.5 text-danger" />
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            )}

            {!isLoggedIn && (
              <Dropdown.Menu>
                <Dropdown.Item
                  id="login"
                  textValue="Login"
                  onClick={() => setOpenAuthModal(true)}
                  className="bg-[var(--pastel-sage)] hover:bg-[var(--pastel-sage-dark)]"
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label className="text-[var(--dy-${backgroundTheme}-text-heading)]">
                      Login / Sign up
                    </Label>
                    <ArrowRightToSquare className="size-3.5 text-[var(--dy-${backgroundTheme}-text-heading)]" />
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown.Popover>
        </Dropdown>
      </span>
    </header>
  );
}
