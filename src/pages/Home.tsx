import "./Home.scss";

import { Button } from "@heroui/react";
import { useState } from "react";
import AuthenticationModal from "../components/AuthenticationModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

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

      <Header setOpenAuthModal={setOpenAuthModal} />

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
              <Button
                variant="primary"
                className="mt-4"
                onClick={navigateToDearYou}
              >
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

      <Footer theme="primary" />
    </div>
  );
}
