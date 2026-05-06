import "./Home.scss";
import {
  ArrowRightFromSquare,
  ArrowRightToSquare,
  PersonPlus,
  Gear,
  Persons,
  Person,
} from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { useState } from "react";

export default function Home() {
  const [userDetails, setUserDetails] = useState({
    id: "taluser1",
    name: "Ujwal Rajeev",
    email: "ujwalrajeev@theartworklabs.com",
    profile_picture: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="main-container">
      <div className="header-container">
        <img
          className="first-look-logo"
          src="/Logo/logo_v3_2.png"
          alt="The Artwork Labs Logo"
        />
        <Dropdown>
          <Dropdown.Trigger className="rounded-full">
            <Avatar>
              <Avatar.Image
                alt="Profile Picture"
                src={userDetails.profile_picture}
              />
              <Avatar.Fallback
                delayMs={600}
                className="bg-[var(--color-primary)]"
              >
                <Person className="text-[var(--color-secondary)]" />
              </Avatar.Fallback>
            </Avatar>
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
                <Dropdown.Item id="logout" textValue="Logout" variant="danger">
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
                      Login
                    </Label>
                    <ArrowRightToSquare className="size-3.5 text-[var(--color-positive)]" />
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="signup" textValue="Sign Up">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label className="text-[var(--color-positive)]">
                      Sign Up
                    </Label>
                    <PersonPlus className="size-3.5 text-[var(--color-positive)]" />
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </div>
  );
}
