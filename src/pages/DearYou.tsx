import "./DearYou.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRef, useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";
import { auth } from "../config/firebase-config";
import { Button } from "@heroui/react";

export default function DearYou() {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollTo = (element: HTMLDivElement | null) => {
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="main-container dear-you-background">
      <Header setOpenAuthModal={setOpenAuthModal} theme="secondary" />
      {openAuthModal && (
        <AuthenticationModal setOpenAuthModal={setOpenAuthModal} />
      )}

      <main className="flex flex-col items-center gap-12">
        <section className="main-content-container px-6 dear-you-message-container max-w-94 py-8">
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
            className="mt-2 mb-4 self-start rounded-none"
            onClick={() => scrollTo(aboutRef.current)}
          >
            Experience Dear You,
          </Button>
        </section>

        <section
          className="main-content-container px-6 gap-6 dear-you-message-container max-w-94 py-8"
          ref={aboutRef}
        >
          <h1 className="font-bold self-start text-xl italic">
            What is Dear You?
          </h1>
          <div>
            <p className="self-start pt-3">
              A real letter, written by a real person, sent just for you.
              Personalised to your life, your feelings, your story. Every month,
              something meaningful lands at your door.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full items-center">
            <div className="flex flex-row justify-between w-full">
              <div className="w-45 px-4 py-2">
                <h1 className="font-bold">1. Tell us about you</h1>
                <p className="text-sm">
                  Fill in your profile — interests, life moments, tone
                </p>
              </div>
              <div className="w-45 px-4 py-2">
                <h1 className="font-bold">2. We create your letter</h1>
                <p className="text-sm">
                  A real writer crafts something just for you
                </p>
              </div>
            </div>
            {/* Second row of features */}
            <div className="flex flex-row justify-between w-full">
              <div className="w-45 px-4 py-2">
                <h1 className="font-bold">3. It arrives at your door</h1>
                <p className="text-sm">
                  Physical letter delivered to your doorstep
                </p>
              </div>
              <div className="w-45 px-4 py-2">
                <h1 className="font-bold">Reply and connect</h1>
                <p className="text-sm">Build a real connection</p>
              </div>
            </div>
            <p className="text-[var(--color-text-secondary)]">And more!</p>
          </div>
        </section>
      </main>

      <Footer backgroundTheme="dark" />
    </div>
  );
}
