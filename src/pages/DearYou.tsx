import "./DearYou.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";
import { Button } from "@heroui/react";
import CaseStudyCard from "../components/animata/card/case-study-card";
import { Separator } from "@heroui/react";

const LetterCover = () => {
  return (
    <div className="flex flex-col w-full h-full bg-[var(--pastel-wheat)] rounded-lg p-4 gap-1 cursor-pointer">
      <span className="flex w-full justify-end">
        <img src="/Design-elements/van_gogh.png" alt="stamp" className="w-16" />
      </span>
      <div className="letter-cover-text flex flex-col gap-1 w-full">
        <div className="flex flex-col">
          <p>To</p>
          <p>Ujwal Rajeev</p>
        </div>
        <div className="flex flex-col items-end w-full">
          <p>From</p>
          <p>The Artwork Labs</p>
        </div>
      </div>
      <Separator className="mt-6 h-[0.1rem] bg-[var(--dy-dark-text-muted)]" />
      <p className="text-xs letter-cover-text text-[var(--dy-paper-text-body)] !mt-5">
        Click or hover over the letter to open it.
      </p>
    </div>
  );
};

export default function DearYou() {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  return (
    <div className="main-container">
      {/*--------------------------- Header Section ---------------------------*/}

      <Header setOpenAuthModal={setOpenAuthModal} backgroundTheme="dark" />

      {/*--------------------------- Authentication Section ---------------------------*/}

      {openAuthModal && (
        <AuthenticationModal setOpenAuthModal={setOpenAuthModal} />
      )}

      {/*--------------------------- Main Content Section ---------------------------*/}
      <main className="main-content-container">
        {/*--------------------------- Hero Section ---------------------------*/}
        <section className="dy-hero-container">
          <div className="flex flex-col gap-3">
            <span className="dy-hero-title flex flex-col gap-1 items-start">
              <p>DEAR YOU,</p>
              <p className="text-[12px]">BY THE ARTWORK LABS</p>
            </span>
            <div className="dy-hero-subtitle flex flex-col items-start">
              <p>Some letters are</p>
              <p className="text-[var(--dy-paper-text-body)]">
                worth waiting for.
              </p>
            </div>
            <p className="dy-hero-text">
              Real letters. Real people. Written only for you. In a world of
              notifications, we bring back the quiet joy of something meaningful
              in your letterbox.
            </p>
            <div className="mt-5">
              <CaseStudyCard
                type="content"
                children={<LetterCover />}
              ></CaseStudyCard>
            </div>

            <Button
              variant="outline"
              className={
                "border-[var(--dy-paper-text-body)] text-[var(--dy-paper-text-heading)] mt-5 border-1 hover:text-white"
              }
            >
              Experience Dear You
            </Button>
          </div>
        </section>
      </main>

      {/*--------------------------- Footer Section ---------------------------*/}
      <Footer backgroundTheme="dark" />
    </div>
  );
}

//TODO: Add this
//------------------------------------ Delete after use later ------------------------------------------
// Dear Ujwal Rajeev,
// There was a time when opening the mailbox felt exciting.

// A handwritten envelope.

// Your name carefully written on the front.

// A few pages carrying thoughts meant only for you.

// Today, most words arrive instantly and disappear just as quickly. Notifications fill our screens, yet meaningful connection often feels further away than ever.

// “Dear You,” was born from the belief that some feelings should never become outdated.

// The feeling of unfolding a letter.

// The feeling of being thought about.

// The feeling of slowing down, even for a moment.

// Yours lovingly,

// The Artwork Labs

// What is Dear You?
// A real letter, written by a real person, sent just for you. Personalised to your life, your feelings, your story. Every month, something meaningful lands at your door.

// 1. Tell us about you
// Fill in your profile — interests, life moments, tone

// 2. We create your letter
// A real writer crafts something just for you

// 3. It arrives at your door
// Physical letter delivered to your doorstep

// Reply and connect
// Build a real connection

// And more
