import "./Home.scss";

import { Button } from "@heroui/react";
import { useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import { Separator } from "@heroui/react";
//import CaseStudyCard from "../components/animata/card/case-study-card";

export default function Home() {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const navigate = useNavigate();

  const navigateToDearYou = () => {
    setOpenAuthModal(false);
    navigate("/dearyou");
  };

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
        <section className="home-hero-container">
          <h1 className="home-hero-title">THE ARTWORK LABS</h1>
          <div className="flex flex-col items-center">
            <h2 className="home-hero-subtitle text-[var(--dy-dark-text-body)]">
              "Where creativity meets
            </h2>
            <h2 className="home-hero-subtitle text-[var(--pastel-sage)] italic">
              human connection."
            </h2>
          </div>

          <h3 className="home-hero-text">
            A creative studio making handcrafted experiences that feel slow,
            personal, and genuinely human — starting with Dear You.
          </h3>

          <div className="flex gap-4 w-full justify-center">
            <Button
              variant="primary"
              className="mt-4"
              onClick={navigateToDearYou}
            >
              Explore Dear You,
            </Button>
            <Button
              variant="outline"
              className="mt-4"
              onClick={navigateToDearYou}
            >
              About us
            </Button>
          </div>
        </section>

        {/*--------------------------- About Section ---------------------------*/}

        <section className="about-us-main-container">
          <div className="flex flex-col items-center gap-3">
            <Separator className="w-10" />
            <h3 className="text-[var(--dy-paper-text-body)] text-xs who-we-are">
              WHO WE ARE
            </h3>
          </div>
          <div className="about-us-container">
            <h2>We make things that feel personal.</h2>
            <p>
              The Artwork Labs is a creative studio where every product begins
              with one question — what does it feel like to truly receive
              something?
            </p>
            <p>
              We work slowly, carefully, and always by hand. No automation. No
              shortcuts. Just thoughtful things made for real people.
            </p>
            <Separator className="bg-[var(--dy-paper-card-border)]" />
            <p className="italic !text-[var(--pastel-rose-light)]">
              Based in Scotland. Made with Love
            </p>
          </div>
        </section>

        {/*--------------------------- Dear You Section ---------------------------*/}

        <section className="dy-news-main-container">
          <div className="dy-news-container">
            <div className="dy-news-left">
              <h1 className="dear-you-main-text">Dear You.</h1>
              <p className="dear-you-tagline">
                “Bringing back the feeling of receiving something truly
                personal.”
              </p>
              <Button
                variant="outline"
                className="mt-4 rounded-xs border-[2px] text-[var(--dy-paper-text-body)] border-[var(--dy-dark-text-muted)] 
                hover:bg-[var(--dy-dark-bg-secondary)] hover:text-[var(--dy-dark-text-heading)] hover:border-none"
                onClick={navigateToDearYou}
              >
                Experience It Now
              </Button>
            </div>

            <div className="dy-news-right pl-3">
              <div className="flex justify-end">
                <div className="stamp-box">
                  <img
                    src="/Design-elements/monkey_tree.png"
                    alt="Stamp Icon"
                    className="stamp-image"
                  />
                </div>
              </div>
              <div className="flex flex-col divide-dashed divide-[var(--dy-dark-border)] divide-y-1">
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
          </div>
        </section>
      </main>

      {/*--------------------------- Footer Section ---------------------------*/}

      <Footer backgroundTheme="dark" />
    </div>
  );
}
