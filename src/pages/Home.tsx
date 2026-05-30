import "./Home.scss";

import { Button } from "@heroui/react";
import { useRef, useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import { Separator } from "@heroui/react";
//import CaseStudyCard from "../components/animata/card/case-study-card";
import AnimatedGradientText from "../components/animata/text/animated-gradient-text";
import Counter from "../components/animata/text/counter";
import { scrollTo } from "../utils/tal-utils";

export default function Home() {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const navigate = useNavigate();
  const dearYouRef = useRef<HTMLDivElement>(null);

  const navigateTo = (route: string) => {
    setOpenAuthModal(false);
    navigate(route);
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
          <div className="flex flex-col gap-2">
            <h1 className="home-hero-title">THE ARTWORK LABS</h1>
            <div className="flex flex-col items-center">
              <span className="flex gap-1.5">
                <p className="home-hero-subtitle text-[var(--dy-dark-text-body)]">
                  "Where
                </p>
                <AnimatedGradientText
                  className={"home-hero-subtitle"}
                  children={"Creativity"}
                />
                <p className="home-hero-subtitle text-[var(--dy-dark-text-body)]">
                  meets
                </p>
              </span>

              <span className="flex gap-1.5">
                {/* <AnimatedGradientText
                className={"home-hero-subtitle"}
                children={"Human"}
              /> */}
                <p className="home-hero-subtitle text-[var(--dy-dark-text-body)]">
                  Human Connection"
                </p>
              </span>
            </div>

            <h3 className="home-hero-text">
              A creative studio making handcrafted experiences that feel slow,
              personal, and genuinely human — starting with Dear You.
            </h3>

            <div className="flex gap-4 w-full justify-center">
              <Button
                variant="primary"
                className="mt-4 bg-[var(--pastel-moss)]"
                onClick={() => scrollTo(dearYouRef)}
              >
                Explore Dear You,
              </Button>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => navigateTo("/about/")}
              >
                About us
              </Button>
            </div>
          </div>

          <div className="news-container">
            <span className="flex items-center gap-3">
              <Counter
                targetValue={100}
                className="text-[var(--pastel-moss)] text-7xl"
              />
              <div className="flex flex-col gap-2 ">
                <p className="text-[var(--dy-dark-text-body)]">Trees planted</p>
                <Button variant="outline">Be a part</Button>
              </div>
            </span>
            {/* <img
              src="/Design-elements/red_squirrel_2.png"
              alt="red squirrel"
              className="news-container-image"
            /> */}
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

        <section className="dy-news-main-container" ref={dearYouRef}>
          <div className="dy-news-container">
            <div className="dy-news-left">
              <h1 className="dear-you-main-text">Dear You.</h1>
              <p className="dear-you-tagline">
                Bringing back the feeling of receiving something truly personal.
              </p>
              <Button
                variant="outline"
                className="mt-2 rounded-xs border-[2px] text-[var(--dy-paper-text-body)] border-[var(--dy-dark-text-muted)] 
                hover:bg-[var(--dy-dark-bg-secondary)] hover:text-[var(--dy-dark-text-heading)] hover:border-none"
                onClick={() => navigateTo("/dearyou/")}
              >
                Experience It Now
              </Button>
              <div className="flex flex-col mt-3">
                <p className="text-[var(--pastel-terracotta-light)] text-[0.6rem] font-light">
                  THE ARTWORK LABS
                </p>
                <p className="text-[var(--pastel-terracotta-light)] text-[0.6rem] font-light">
                  SCOTLAND . EST. 2026
                </p>
              </div>
            </div>

            <div className="dy-news-right pl-3">
              <div className="flex justify-end">
                <img
                  src="/Design-elements/van_gogh.png"
                  alt="Stamp Icon"
                  className="stamp-image"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="dear-you-description">
                  "Dear You." delivers thoughtful, personalised letters written
                  by real people.
                </h2>
                <Separator className="bg-[var(--dy-dark-text-muted)]" />
                <p className="dear-you-description">
                  For those who miss the feeling of opening something
                  meaningful. In a world full of notifications, we bring back
                  the quiet excitement of receiving a letter made just for you.
                </p>
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
