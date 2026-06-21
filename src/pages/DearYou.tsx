import "./DearYou.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRef, useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";
import { Button, Card } from "@heroui/react";
import CaseStudyCard from "../components/animata/card/case-study-card";
import { Separator } from "@heroui/react";
import { scrollTo } from "../utils/tal-utils";
import {
  ArrowDown,
  Envelope,
  Sticker,
  Brush,
  Dice6,
  Gift,
  Arrows3RotateRight,
  ArrowRight,
  ArrowLeft,
} from "@gravity-ui/icons";
import Tags from "../components/Tags";
import DualMarquee from "../components/DualMarquee";
import { useNavigate } from "react-router-dom";

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
  classname,
}: {
  color: string;
  heading: string;
  description: string;
  classname?: string;
}) => {
  return (
    <div
      className={`flex flex-row gap-4 py-2 rounded-lg px-5 py-7 w-40 ${classname}`}
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

const FrequencyItems = ({
  color,
  heading,
  description,
  subtitle,
  classname,
}: {
  color: string;
  heading: string;
  description: string;
  subtitle: string;
  classname?: string;
}) => {
  return (
    <div
      className={`flex flex-row gap-4 py-2 rounded-lg px-5 py-7 w-42 ${classname}`}
      style={{
        borderTop: `2px solid ${color}`,
        backgroundColor: `${color}66`,
      }}
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold" style={{ color: color }}>
          {subtitle}
        </p>
        <p style={{ color: color }} className="font-bold text-[1.25rem]">
          {heading}
        </p>
        <p className="text-xs" style={{ color: color }}>
          {description}
        </p>
      </div>
    </div>
  );
};

const PricingItem = ({
  frequencyHeading,
  price,
  frequency,
  description,
  firstLetterFree,
  color,
}: {
  frequencyHeading: string;
  price: string;
  frequency: string;
  description: string;
  firstLetterFree: boolean;
  color: string;
}) => {
  return (
    <div
      className={"pricing-item-container"}
      style={{
        backgroundColor: `${color}66`,
        borderColor: color,
        color: color,
      }}
    >
      <p className="pricing-frequency-heading">{frequencyHeading}</p>
      <p className="pricing-price">{price}</p>
      <p className="pricing-frequency">{frequency}</p>
      <p className="pricing-description">{description}</p>
      {firstLetterFree && (
        <div
          className="first-letter-free"
          style={{
            backgroundColor: `${color}55`,
            borderColor: color,
          }}
        >
          First letter free
        </div>
      )}
    </div>
  );
};

export default function DearYou() {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [openLetter, setOpenLetter] = useState<boolean>(false);

  const aboutDYRef = useRef(null);
  const onboardRef = useRef(null);

  const navigate = useNavigate();
  const navigateTo = (route: string) => {
    navigate(route);
  };

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
  const StampUrls = [
    "/Stamps/london.jpg",
    "/Stamps/italy.jpg",
    "/Stamps/cherry.png",
    "/Stamps/flower.png",
    "/Stamps/butterfly.png",
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
              <span className="dy-hero-title flex flex-col gap-1 items-center">
                <p>DEAR YOU,</p>
                <p className="text-[12px]">BY THE ARTWORK LABS</p>
              </span>
              <div className="dy-hero-subtitle flex flex-col">
                <p>Some letters are</p>
                <p className="text-[var(--pastel-terracotta)]">
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
                variant="primary"
                className={
                  "bg-[var(--pastel-terracotta)] mt-6 border-1 hover:text-white active:text-white"
                }
                onClick={() => scrollTo(onboardRef)}
              >
                Begin your Dear You Experience
              </Button>
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
            <Separator className="w-15 h-1 dy-top-line" />
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
            <Separator className="w-15 h-1 dy-top-line" />
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
            <Separator className="w-15 h-1 dy-top-line" />
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

          {/*--------------------------- What's inside ---------------------------*/}

          <div className="flex flex-col items-center gap-3">
            <Separator className="w-15 h-1 dy-top-line" />
            <p className="dy-about-heading">WHAT'S INSIDE</p>
          </div>
          <div className="dy-about-description">
            <p className="dy-about-tagline">
              More than just a letter <br />
              Every envelope holds a little world.
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
          </div>
          <div className="dy-cards-column-container">
            <div className="dy-cards-row-container">
              <Card className="dy-card-container dy-cc-white" variant="default">
                <div className="dy-steps-card-number !bg-[var(--pastel-rose)]">
                  <Envelope className="w-7 h-7" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <Card.Title className="text-[1rem]">Real letters</Card.Title>
                  <Card.Description className="text-xm text-[var(--dy-paper-text-heading)]">
                    Written by a real person, just for you. Never generated.
                  </Card.Description>
                </div>
              </Card>
              <Card className="dy-card-container dy-cc-white" variant="default">
                <div className="dy-steps-card-number !bg-[var(--pastel-amber)]">
                  <Sticker className="w-7 h-7" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <Card.Title className="text-[1rem]">
                    Collectible stamps
                  </Card.Title>
                  <Card.Description className="text-xm text-[var(--dy-paper-text-heading)]">
                    A unique stamp with every letter. Redeem for special gifts.
                  </Card.Description>
                </div>
              </Card>
            </div>
            <div className="dy-cards-row-container">
              <Card className="dy-card-container dy-cc-white" variant="default">
                <div className="dy-steps-card-number !bg-[var(--pastel-midnight)]">
                  <Brush className="w-7 h-7" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <Card.Title className="text-[1rem]">Paper crafts</Card.Title>
                  <Card.Description className="text-xm text-[var(--dy-paper-text-heading)]">
                    Handmade extras — stickers, origami, little surprise
                  </Card.Description>
                </div>
              </Card>
              <Card className="dy-card-container dy-cc-white" variant="default">
                <div className="dy-steps-card-number !bg-[var(--pastel-lilac)]">
                  <Dice6 className="w-7 h-7" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <Card.Title className="text-[1rem]">
                    Games and quizzes
                  </Card.Title>
                  <Card.Description className="text-xm text-[var(--dy-paper-text-heading)]">
                    Fun activities inside every envelope. Winners chosen
                    monthly.
                  </Card.Description>
                </div>
              </Card>
              <Card className="dy-card-container dy-cc-white" variant="default">
                <div className="dy-steps-card-number !bg-[var(--pastel-terracotta)]">
                  <Gift className="w-7 h-7" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <Card.Title className="text-[1rem]">
                    Birthday letters
                  </Card.Title>
                  <Card.Description className="text-xm text-[var(--dy-paper-text-heading)]">
                    A special letter arrives on your most important days.
                  </Card.Description>
                </div>
              </Card>
              <Card className="dy-card-container dy-cc-white" variant="default">
                <div className="dy-steps-card-number !bg-[var(--pastel-moss)]">
                  <Arrows3RotateRight className="w-7 h-7" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <Card.Title className="text-[1rem]">
                    Recycle and earn
                  </Card.Title>
                  <Card.Description className="text-xm text-[var(--dy-paper-text-heading)]">
                    Send letters back, earn bonus stamps, help the planet.
                  </Card.Description>
                </div>
              </Card>
            </div>
          </div>

          {/*--------------------------- Frequency ---------------------------*/}

          <div className="flex flex-col items-center gap-3 mt-10">
            <Separator className="w-15 h-1 dy-top-line" />
            <p className="dy-about-heading">FREQUENCY</p>
          </div>
          <div className="dy-about-description">
            <p className="dy-about-tagline">Choose how often</p>
            <p className="dy-about-text font-bold !text-[1.1rem]">
              More letters, more connection.
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            <FrequencyItems
              color="#e8dabc"
              heading="1 letter"
              subtitle="A gentle hello"
              description="Monthly 1 carefully crafted letter, perfect for a little surprise in your mailbox."
            />
            <FrequencyItems
              color="#e8dabc"
              heading="2 Letters"
              subtitle="A steady warmth"
              description="2 letters that dive deeper into your passions, bringing more of what you love to your mailbox."
            />
            <FrequencyItems
              color="#e8dabc"
              heading="3 Letters"
              subtitle="A real connection"
              description="3 letters that share your story, bringing more of what you love to your mailbox."
            />
            <FrequencyItems
              color="#e8dabc"
              heading="Single Letter"
              subtitle="A one-time surprise"
              description="A single, carefully crafted letter, perfect for a little surprise in your mailbox."
            />
          </div>

          {/*--------------------------- Reply and Connect ---------------------------*/}

          <div className="flex flex-col items-center gap-3 mt-10">
            <Separator className="w-15 h-1 dy-top-line" />
            <p className="dy-about-heading">REPLY AND CONNECT</p>
          </div>
          <div className="dy-about-description">
            <p className="dy-about-tagline">
              This is a conversation, <br />
              not a subscription
            </p>
            <div className="flex flex-row gap-6 items-center mt-6 mb-6">
              <Envelope className="w-12 h-12 text-[var(--pastel-moss)]" />
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <Separator className="w-5 h-[3px] bg-[var(--pastel-moss)]" />
                  <p className="dy-about-text font-bold !text-[var(--pastel-moss)]">
                    To you
                  </p>
                  <ArrowRight className="w-6 h-6 text-[var(--pastel-moss)]" />
                </div>
                <div className="flex gap-1 items-center">
                  <ArrowLeft className="w-6 h-6 text-[var(--pastel-peach)]" />
                  <p className="dy-about-text font-bold !text-[var(--pastel-peach)]">
                    To you
                  </p>
                  <Separator className="w-5 h-[3px] bg-[var(--pastel-peach)]" />
                </div>
              </div>
              <Envelope className="w-12 h-12 text-[var(--pastel-peach)]" />
            </div>
            <p className="dy-about-text">
              When your letter arrives, you can write back. By post or by email
              — your writer reads every word. Over time, something real grows.
            </p>
            <p className="dy-about-text">
              Everything you share with us stays completely confidential. Your
              story is safe here.
            </p>
            <Separator className="mt-3 w-full h-[0.01rem] bg-[var(--dy-dark-text-body)]" />
            <p className="dy-about-text italic">
              "The feeling of being thought about."
            </p>
          </div>

          {/*--------------------------- Stamp Collection ---------------------------*/}

          <div className="dy-collection-main-container">
            <div className="flex flex-col items-center gap-3 mt-10">
              <Separator className="w-15 h-1 dy-top-line" />
              <p className="dy-about-heading !text-[var(--dy-paper-text-heading)]">
                STAMP COLLECTION
              </p>
            </div>
            <div className="dy-about-description">
              <p className="dy-about-tagline !text-[var(--dy-paper-text-body)]">
                Collect. Redeem. Treasure.
              </p>
              <p className="dy-about-text !text-[var(--dy-paper-text-body)]">
                Every letter comes with a unique collectible stamp. There are
                many ways to earn bonus stamps. Redeem them for special gifts
                from The Artwork Labs.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-6 mb-6 !max-w-[100%]">
              <DualMarquee data={StampUrls} />
            </div>
            <Button
              variant="secondary"
              className={
                "bg-[var(--pastel-lavender)] text-[var(--dy-paper-text-heading)] hover:bg-[var(--pastel-lavender-light)]"
              }
            >
              Go to stamps page
            </Button>
            {/*TODO: Add onClick function*/}
          </div>

          {/*--------------------------- Pricing ---------------------------*/}

          <div className="flex flex-col items-center gap-3 mt-10">
            <Separator className="w-15 h-1 dy-top-line" />
            <p className="dy-about-heading">PRICING</p>
          </div>
          <div className="dy-about-description">
            <p className="dy-about-tagline">Simple, honest pricing</p>
            <p className="dy-about-text !text-[var(--dy-dark-text-body)]">
              Your first letter is always free. No commitment needed.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 w-100 justify-center full-width">
            <PricingItem
              color="#e8dabc"
              frequencyHeading="ONE LETTER"
              price="£3.66"
              frequency="per month"
              description="One real physical letter, crafted and sent to your door each month."
              firstLetterFree={true}
            />
            <PricingItem
              color="#d4a898"
              frequencyHeading="TWO LETTER"
              price="£6"
              frequency="per month"
              description="Two letters a month — twice the warmth, twice the connection."
              firstLetterFree={true}
            />
            <PricingItem
              color="#a8b89c"
              frequencyHeading="THREE LETTER"
              price="£8.66"
              frequency="per month"
              description="Three letters a month for those who love the feeling of the letterbox."
              firstLetterFree={true}
            />
            <PricingItem
              color="#c8b0d8"
              frequencyHeading="SINGLE LETTER"
              price="£4.66"
              frequency="per letter"
              description="One real physical letter, crafted and sent to your door."
              firstLetterFree={false}
            />
          </div>
        </section>

        {/*--------------------------- Bottom Section ---------------------------*/}

        <section className="dy-hero-main-container gap-2" ref={onboardRef}>
          <p className="dy-hero-title !mt-8">YOUR FIRST LETTER IS FREE</p>
          <div className="dy-hero-subtitle flex flex-col items-center mt-4 mb-4">
            <p>Your letter is waiting</p>
            <p className="text-[var(--pastel-terracotta)]">to find you</p>
          </div>
          <p className="dy-hero-text text-center">
            No commitment. No complexity. Just something warm arriving at your
            door.
          </p>
          <Button
            variant="primary"
            className={
              "bg-[var(--pastel-terracotta)] mt-6 border-1 hover:text-white active:text-white"
            }
            onClick={() => navigateTo("/dearyou/onboard/")}
          >
            Begin your Dear You Experience
          </Button>
          <p className="dy-hero-text italic !mt-6 !mb-3">
            Yours lovingly, Dear You Team
          </p>
        </section>
      </main>

      {/*--------------------------- Footer Section ---------------------------*/}
      <Footer backgroundTheme="dark" />
    </div>
  );
}
