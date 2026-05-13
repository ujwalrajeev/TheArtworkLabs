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
import { Avatar, Button, Dropdown, Label, Separator } from "@heroui/react";
import { useEffect, useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";
import { logout } from "../services/firebase-auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useAuthStore } from "../utils/state-machine";

export default function Home() {
  const [userDetails, setUserDetails] = useState({
    id: "taluser1",
    name: "Ujwal Rajeev",
    email: "ujwalrajeev@theartworklabs.com",
    photoURL: "",
  });
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [openAuthModal, setOpenAuthModal] = useState(false);

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
    <div className="main-container">
      {/*--------------------------- Header Section ---------------------------*/}

      <header className="header-container">
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
                      src={userDetails.photoURL}
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
      </header>

      {/*--------------------------- Authentication Section ---------------------------*/}

      {openAuthModal && (
        <AuthenticationModal setOpenAuthModal={setOpenAuthModal} />
      )}

      {/*--------------------------- Main Content Section ---------------------------*/}
      <main className="main-content-container">
        {!openAuthModal && (
          <section className="main-news-container">
            <div className="mnc-left">
              <h1 className="dear-you-main-text">Dear You.</h1>
              <p className="dear-you-tagline">
                “Bringing back the feeling of receiving something truly
                personal.”
              </p>
              <Button variant="primary" className="mt-4 ">
                Experience It Now
              </Button>
            </div>

            <div className="mnc-right pl-3">
              <div className="flex justify-end">
                <div className="stamp-box">
                  <img
                    src="/Design-elements/monkey_tree.png"
                    alt="Stamp Icon"
                    className="stamp-image"
                  />
                </div>
              </div>
              <div className="flex flex-col divide-dashed divide-[var(--color-secondary-accent)] divide-y-1">
                <div className="w-full h-12"></div>
                <div className="w-full h-fit">
                  <h2 className="dear-you-description">
                    "Dear You." delivers thoughtful, personalised letters
                    written by real people.
                  </h2>
                </div>
                <div className="w-full h-fit">
                  <p className="dear-you-description">
                    For those who miss the feeling of opening something
                    meaningful. In a world full of notifications, we bring back
                    the quiet excitement of receiving a letter made just for
                    you.
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/*--------------------------- Footer Section ---------------------------*/}

      <footer className="footer-container">
        <p className="text-white text-xs">
          © 2026 The Artwork Labs. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
