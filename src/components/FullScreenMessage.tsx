import { Button } from "@heroui/react";
import "./FullScreenMessage.scss";
import { useLottie, type LottieOptions } from "lottie-react";
import { useState } from "react";

type ButtonItem = {
  buttonText: string;
  buttonFunc: () => void;
};

type FullScreenMessageProps = {
  type: string;
  title?: string;
  message?: string;
  animationOptions?: LottieOptions<"svg">;
  show: React.Dispatch<React.SetStateAction<boolean>>;
  mainButton?: { text: string; buttonFunc: () => void };
  closeButton?: { text: string };
  helpButton?: { text: string; helpType: string };
  buttons?: ButtonItem[];
};

export default function FullScreenMessage({
  type,
  title,
  message,
  animationOptions,
  show,
  mainButton,
  closeButton,
  helpButton,
  buttons,
}: FullScreenMessageProps) {
  const [animationDone, setAnimationDone] = useState(false);

  const opts: LottieOptions<"svg"> = {
    ...(animationOptions ?? ({} as LottieOptions<"svg">)),
    onComplete: () => setAnimationDone(true),
  };

  const { View } = useLottie(opts);

  const handleHelp = () => {
    console.log("help ", helpButton?.text);
    //TODO: handle help
  };

  const handleButtonClick = (functionName: () => void) => {
    if (type === "Auth") {
      functionName();
      if (buttons) {
        buttons[1].buttonFunc();
      }
    }
  };

  const handleClose = () => {
    if (type === "Auth") {
      show(false);
      if (buttons) {
        buttons[0].buttonFunc();
      }
    }
  };

  return (
    <div className="fullscreen-message-container">
      {View}
      {animationDone && (
        <div className="flex flex-col items-center gap-4">
          <div>
            {title && <h1 className="fullscreen-message-title">{title}</h1>}
            {message && <p className="fullscreen-message-text">{message}</p>}
          </div>
          <div className="flex gap-5">
            {mainButton && mainButton.text !== "" && (
              <Button
                variant="primary"
                className="mt-4"
                onClick={() => handleButtonClick(mainButton.buttonFunc)}
              >
                {mainButton.text}
              </Button>
            )}
            {closeButton && closeButton.text !== "" && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => handleClose()}
              >
                {closeButton.text}
              </Button>
            )}
          </div>
          {helpButton && helpButton.text !== "" && (
            <Button variant="ghost" className="mt-4" onClick={() => handleHelp}>
              {helpButton.text}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
