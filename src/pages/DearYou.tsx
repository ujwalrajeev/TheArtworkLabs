import "./DearYou.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";
import { auth } from "../config/firebase-config";
import { Button } from "@heroui/react";

export default function DearYou() {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<string>("about");

  return (
    <div className="main-container dear-you-background">
      <Header setOpenAuthModal={setOpenAuthModal} theme="secondary" />
      {openAuthModal && (
        <AuthenticationModal setOpenAuthModal={setOpenAuthModal} />
      )}

      {showMessage === "intro" && (
        <main className="main-content-container px-6 text-[var(--color-text-secondary)]">
          <h1 className="dear-you-title self-start">
            Dear {auth.currentUser?.displayName?.trim() || "You"},
            {/* FIXME: Reloading the page causes the name to disappear */}
          </h1>
          <p className="dear-you-message self-start pt-3">
            There was a time when opening the mailbox felt exciting.
          </p>
          <p className="dear-you-message self-start pt-4">
            A handwritten envelope.
          </p>
          <p className="dear-you-message self-start">
            Your name carefully written on the front.
          </p>
          <p className="dear-you-message self-start">
            A few pages carrying thoughts meant only for you.
          </p>
          <p className="dear-you-message self-start pt-4">
            Today, most words arrive instantly and disappear just as quickly.
            Notifications fill our screens, yet meaningful connection often
            feels further away than ever.
          </p>
          <p className="dear-you-message self-start pt-4">
            <strong>“Dear You,”</strong> was born from the belief that some
            feelings should never become outdated.
          </p>
          <p className="dear-you-message self-start pt-4">
            The feeling of unfolding a letter.
          </p>
          <p className="dear-you-message self-start">
            The feeling of being thought about.
          </p>
          <p className="dear-you-message self-start">
            The feeling of slowing down, even for a moment.
          </p>
          <p className="dear-you-message self-start pt-4">Yours lovingly,</p>
          <p className="dear-you-title self-start font-bold">
            The Artwork Labs
          </p>
          <Button
            variant="primary"
            className="mt-2 mb-4 self-start"
            onClick={() => setShowMessage("about")}
          >
            Experience Dear You,
          </Button>
        </main>
      )}

      {showMessage === "about" && (
        <main className="main-content-container px-6 text-[var(--color-text-secondary)]">
          <h1 className="dear-you-title self-start">Dear You,</h1>
          <p className="dear-you-message self-start pt-3">
            Dear You is a digital letter experience that brings back the joy of
            receiving heartfelt messages. It’s a space where you can write and
            receive letters that are meant to be cherished, not just read and
            forgotten.
          </p>
          <p className="dear-you-message self-start pt-4">
            Whether it’s a note to your future self, a message to a loved one,
            or a reflection on your journey, Dear You is designed to create
            moments of connection and introspection in our fast-paced world.
          </p>
          <Button
            variant="primary"
            className="mt-2 mb-4 self-start"
            onClick={() => setShowMessage("intro")}
          >
            Back to Introduction
          </Button>
        </main>
      )}

      <Footer theme="secondary" />
    </div>
  );
}
