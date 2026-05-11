import "./Home.scss";
import {
  ArrowRightFromSquare,
  ArrowRightToSquare,
  Bars,
  Persons,
  Person,
  PersonWorker,
  Folders,
} from "@gravity-ui/icons";
import { Avatar, Dropdown, Label, Separator } from "@heroui/react";
import { useEffect, useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";
import { logout } from "../services/firebase-auth";

export default function Home() {
  const [userDetails, setUserDetails] = useState({
    id: "taluser1",
    name: "Ujwal Rajeev",
    email: "ujwalrajeev@theartworklabs.com",
    profile_picture: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const signOut = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // TODO: Check if user is logged in
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserDetails(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="main-container">
      {/*--------------------------- Header Section ---------------------------*/}

      <div className="header-container">
        <img
          className="first-look-logo"
          src="/Logo/logo_v3_2.png"
          alt="The Artwork Labs Logo"
        />
        <span className="flex gap-2 items-center">
          <div className="bg-[var(--color-primary)] w-14 flex justify-end px-[2px]">
            <p className="text-[var(--color-text-secondary)] font-[500]">
              Menu
            </p>
          </div>
          <Dropdown>
            <Dropdown.Trigger className="rounded-full">
              <Bars className="text-[var(--color-text-primary)] size-7" />
            </Dropdown.Trigger>
            <Dropdown.Popover className="min-w-[250px]">
              <div className="px-3 pt-3 pb-1">
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <Avatar.Image
                      alt="Profile Picture"
                      src={userDetails.profile_picture}
                    />
                    <Avatar.Fallback className="bg-[var(--color-primary)]">
                      <Person />
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm leading-5 font-medium">
                      {isLoggedIn ? userDetails.name : "Guest"}
                    </p>

                    <p className="text-xs leading-none text-muted">
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
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label className="text-[var(--color-positive)]">
                        Login / Sign up
                      </Label>
                      <ArrowRightToSquare className="size-3.5 text-[var(--color-positive)]" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown.Popover>
          </Dropdown>
        </span>
      </div>

      {/*--------------------------- Authentication Section ---------------------------*/}

      {openAuthModal && (
        <AuthenticationModal setOpenAuthModal={setOpenAuthModal} />
      )}

      {/*--------------------------- Main News Section ---------------------------*/}

      {!openAuthModal && (
        <div className="main-news-container">
          <div className="mnc-left">
            <p className="dear-you-main-text">Dear You.</p>
            <p className="dear-you-tagline">Personalised letters send to you</p>
          </div>

          <div className="mnc-right pl-3">
            <div className="flex justify-end">
              <div className="stamp-box"></div>
            </div>
            <div className="flex flex-col divide-dashed divide-[var(--color-secondary-accent)] divide-y-1">
              <div className="w-full h-12"></div>
              <div className="w-full h-12"></div>
              <div className="w-full h-12"></div>
              <div className="w-full h-12"></div>
            </div>
          </div>
        </div>
      )}

      {/*--------------------------- Footer Section ---------------------------*/}

      <div className="footer-container">
        <p className="text-white text-xs">
          © 2026 The Artwork Labs. All rights reserved.
        </p>
      </div>
    </div>
  );
}
