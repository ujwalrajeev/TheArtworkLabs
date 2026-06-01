import "./DearYou.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRef, useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";
import { Button, Card } from "@heroui/react";
import CaseStudyCard from "../components/animata/card/case-study-card";
import { Separator } from "@heroui/react";
import { scrollTo } from "../utils/tal-utils";
import { ArrowDown } from "@gravity-ui/icons";
import Tags from "../components/Tags";

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

const PersonalisationItems = ({
  color,
  heading,
  description,
}: {
  color: string;
  heading: string;
  description: string;
}) => {
  return (
    <div
      className="flex flex-row gap-4 py-2 rounded-lg px-5 py-7 w-40"
      style={{
        borderLeft: `2px solid ${color}`,
        backgroundColor: `${color}66`,
      }}
    >
      <div className="flex flex-col gap-2">
        <p style={{ color: color }} className="font-bold">
          {heading}
        </p>
        <p className="text-xs" style={{ color: color }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default function DearYou() {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [openLetter, setOpenLetter] = useState<boolean>(false);
  const aboutDYRef = useRef(null);
  const tags = [
    { color: "#d4a898", tag: "writing" },
    { color: "#c4c0d8", tag: "photography" },
    { color: "#d4b870", tag: "morning coffee" },
    { color: "#b8bdd4", tag: "cinema" },
    { color: "#a8ccc4", tag: "travel" },
    { color: "#c8d5c0", tag: "nature" },
    { color: "#c8a8b8", tag: "art" },
    { color: "#e0c080", tag: "music" },
    { color: "#f0c4a0", tag: "cooking" },
    { color: "#c8b0d8", tag: "poetry" },
    { color: "#a8b89c", tag: "books" },
    { color: "#d4a882", tag: "diy" },
    { color: "#b8d4c8", tag: "mindfulness" },
    { color: "#a8b89c", tag: "Smell after rain" },
    { color: "#d4a898", tag: "and more..." },
  ];
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
        <section className="dy-hero-main-container">
          {!openLetter && (
            <div className="dy-hero-container">
              <span className="dy-hero-title flex flex-col gap-1">
                <p>DEAR YOU,</p>
                <p className="text-[12px]">BY THE ARTWORK LABS</p>
              </span>
              <div className="dy-hero-subtitle flex flex-col">
                <p>Some letters are</p>
                <p className="text-[var(--dy-paper-text-body)]">
                  worth waiting for.
                </p>
              </div>
              <p className="dy-hero-text">
                Real letters. Real people. Written only for you. In a world of
                notifications, we bring back the quiet joy of something
                meaningful in your letterbox.
              </p>
              <div className="mt-5">
                <CaseStudyCard
                  type="content"
                  children={<LetterCover />}
                  functions={[
                    {
                      functionText: "Open Letter",
                      functionStatment: () => setOpenLetter(true),
                    },
                  ]}
                ></CaseStudyCard>
              </div>
              <Button
                variant="outline"
                className={
                  "border-[var(--dy-paper-text-body)] text-[var(--dy-paper-text-heading)] mt-6 border-1 hover:text-white active:text-white"
                }
                onClick={() => scrollTo(aboutDYRef)}
              >
                Begin your Dear You Experience
              </Button>
              {/*TODO: Change the onClick to the register page*/}
              <div className="flex self-center !mt-14 gap-2 text-[var(--dy-paper-text-body)]">
                <p className="text-sm">Or scroll down to know more</p>
                <ArrowDown />
              </div>
            </div>
          )}

          {openLetter && (
            <div className="flex flex-col w-fit h-full">
              <div
                className="flex flex-col items-start bg-[var(--pastel-wheat)] w-90 h-fit 
              pt-10 pl-5 pr-5 pb-10 rounded-lg gap-8"
              >
                <p className="font-[family-name:var(--font-dear-you)] text-xl">
                  Dear Ujwal,
                </p>
                <p>
                  There was a time when opening the mailbox felt exciting.
                  <br /> A handwritten envelope.
                  <br /> Your name carefully written on the front.
                  <br /> A few pages carrying thoughts meant only for you.
                  <br /> Today, most words arrive instantly and disappear just
                  as quickly. Notifications fill our screens, yet meaningful
                  connection often feels further away than ever.
                  <br /> “Dear You,” was born from the belief that some feelings
                  should never become outdated. The feeling of unfolding a
                  letter. The feeling of being thought about. The feeling of
                  slowing down, even for a moment.
                </p>
                <div className="flex flex-col gap-2">
                  <p>Yours lovingly,</p>
                  <p className="font-[family-name:var(--font-dear-you)] text-xl">
                    Dear You Team
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className={
                  "border-[var(--dy-paper-text-body)] text-[var(--dy-paper-text-heading)] mt-5 border-1 hover:text-white"
                }
                onClick={() => setOpenLetter(false)}
              >
                go back and get started
              </Button>
            </div>
          )}
        </section>

        <section ref={aboutDYRef} className="dy-about-section">
          {/*--------------------------- What Is Dear You ---------------------------*/}
          <div className="flex flex-col items-center gap-3">
            <Separator className="w-15 h-1 bg-[var(--dy-dark-text-body)]" />
            <p className="dy-about-heading">WHAT IS DEAR YOU</p>
          </div>
          <div className="dy-about-description">
            <p className="dy-about-tagline">
              The feeling of a letter <br /> never became outdated.
            </p>
            <p className="dy-about-text">
              Dear You is a letter service built on a simple belief — that
              receiving something written only for you, by a real human who read
              your story, is one of the most quietly powerful feelings in the
              world. Every letter is personalised to your life, your interests,
              your current moment. You can reply. You can build a real
              connection. Everything shared with us stays completely
              confidential — always.
            </p>
            <Separator className="w-full h-[0.1rem] bg-[var(--dy-dark-text-muted)] my-5" />
          </div>

          {/*--------------------------- How It Works ---------------------------*/}

          <div className="flex flex-col items-center gap-3">
            <Separator className="w-15 h-1 bg-[var(--dy-dark-text-body)]" />
            <p className="dy-about-heading">HOW IT WORKS</p>
            <p className="dy-about-tagline">
              Four simple steps to your first letter
            </p>
            <div className="dy-cards-column-container">
              <div className="dy-cards-row-container">
                <Card className="dy-card-container" variant="default">
                  <div className="dy-steps-card-number">1</div>
                  <div className="flex flex-1 flex-col justify-center gap-1">
                    <Card.Title className="text-sm">
                      Tell us about you
                    </Card.Title>
                    <Card.Description className="text-xs text-[var(--dy-paper-text-body)]">
                      Share your interests, life moments and how you want your
                      letters to feel.
                    </Card.Description>
                  </div>
                </Card>
                <Card className="dy-card-container" variant="default">
                  <div className="dy-steps-card-number">2</div>
                  <div className="flex flex-1 flex-col justify-center gap-1">
                    <Card.Title className="text-sm">
                      We write your letter
                    </Card.Title>
                    <Card.Description className="text-xs text-[var(--dy-paper-text-body)]">
                      A real writer reads your profile and crafts something just
                      for you.
                    </Card.Description>
                  </div>
                </Card>
              </div>
              <div className="dy-cards-row-container">
                <Card className="dy-card-container" variant="default">
                  <div className="dy-steps-card-number">3</div>
                  <div className="flex flex-1 flex-col justify-center gap-1">
                    <Card.Title className="text-sm">
                      It arrives at your door
                    </Card.Title>
                    <Card.Description className="text-xs text-[var(--dy-paper-text-body)]">
                      A real envelope with your name on the front lands at your
                      address.
                    </Card.Description>
                  </div>
                </Card>
                <Card className="dy-card-container" variant="default">
                  <div className="dy-steps-card-number">4</div>
                  <div className="flex flex-1 flex-col justify-center gap-1">
                    <Card.Title className="text-sm">
                      Reply and connect
                    </Card.Title>
                    <Card.Description className="text-xs text-[var(--dy-paper-text-body)]">
                      Write back anytime. Your writer reads every word.
                    </Card.Description>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <Separator className="w-full h-[0.1rem] bg-[var(--dy-dark-text-muted)] my-5" />

          {/*--------------------------- Personalisation ---------------------------*/}

          <div className="flex flex-col items-center gap-3 !mt-7">
            <Separator className="w-15 h-1 bg-[var(--dy-dark-text-body)]" />
            <p className="dy-about-heading">PERSONALISATION</p>
          </div>
          <div className="dy-about-description">
            <p className="dy-about-tagline">Your letter knows your life</p>
            <p className="dy-about-text">
              You tell us what matters to you — and your writer weaves it all
              in. No two letters are the same because no two people are the
              same.
            </p>
            <div className="flex flex-wrap gap-2 my-4 justify-center">
              {tags.map((item, index) => (
                <Tags key={index} color={item.color} tag={item.tag} />
              ))}
            </div>
            <div className="flex flex-col gap-4 mt-7 items-center">
              <p className="dy-about-text">
                There is more that you can do to make your letter unique like
                the below mentioned ones but the possibilities are endless. Your
                writer can creatively weave in anything that matters to you.
              </p>
              <div className="flex flex-row flex-wrap gap-4 justify-center">
                <PersonalisationItems
                  color="#d4a898"
                  heading="Writing style"
                  description="From poetic to straightforward, we match your vibe."
                />
                <PersonalisationItems
                  color="#c4c0d8"
                  heading="Interests"
                  description="Weave in your passions, from art to travel and more."
                />
                <PersonalisationItems
                  color="#d4b870"
                  heading="Life moments"
                  description="Celebrate milestones or everyday moments that matter."
                />
                <PersonalisationItems
                  color="#b8bdd4"
                  heading="Letter vibe"
                  description="Whether you want uplifting, reflective, or cozy letters."
                />{" "}
              </div>
            </div>

            <Separator className="w-full h-[0.1rem] bg-[var(--dy-dark-text-muted)] my-5" />
          </div>
        </section>
      </main>

      {/*--------------------------- Footer Section ---------------------------*/}
      <Footer backgroundTheme="dark" />
    </div>
  );
}
