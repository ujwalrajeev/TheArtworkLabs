import "./Home.scss";
import {
  ArrowRightFromSquare,
  ArrowRightToSquare,
  Bars,
  Gear,
  Persons,
  Person,
} from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";

export default function Home() {
  const [userDetails, setUserDetails] = useState({
    id: "taluser1",
    name: "Ujwal Rajeev",
    email: "ujwalrajeev@theartworklabs.com",
    profile_picture: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(true);

  return (
    <div className="main-container">
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
                    <Avatar.Fallback
                      delayMs={600}
                      className="bg-[var(--color-primary)]"
                    >
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
                  <Dropdown.Item
                    id="dashboard"
                    textValue="Dashboard"
                    className="hover:bg-[var(--color-primary)]"
                  >
                    <Label>Dashboard</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="profile" textValue="Profile">
                    <Label>Profile</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="settings" textValue="Settings">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Settings</Label>
                      <Gear className="size-3.5 text-muted" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item id="new-project" textValue="New project">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Create Team</Label>
                      <Persons className="size-3.5 text-muted" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="logout"
                    textValue="Logout"
                    variant="danger"
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
                  <Dropdown.Item id="login" textValue="Login">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label className="text-[var(--color-positive)]">
                        Login / Sign Up
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

      {openAuthModal && (
        <AuthenticationModal setOpenAuthModal={setOpenAuthModal} />
      )}

      {!openAuthModal && <div className="main-news-container"></div>}

      <div className="footer-container">
        <p className="text-white text-xs">
          © 2026 The Artwork Labs. All rights reserved.
        </p>
      </div>
    </div>
  );
}
