import type React from "react";

import { cn } from "../../../libs/utils";
import { useState, useRef, useEffect } from "react";

type FunctionItem = {
  functionText: string;
  functionStatment: () => void;
};

interface CaseStudyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  functions?: FunctionItem[];
  title?: string;
  category?: string;
  image?: string;
  logo?: string;
  link?: string;
  type?: "content" | "simple-image"; // Decides between text or image
}

// ContentCard Component for rendering text + image
const ContentCard: React.FC<CaseStudyCardProps> = ({
  children,
  title,
  category,
  image,
  logo,
}) => {
  return (
    <div
      className="relative flex h-full w-full flex-col items-start justify-between rounded-lg"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
      {image && (
        <div className="opacity-70 rounded-lg absolute inset-0 bg-black" />
      )}

      <div className="relative z-10">
        {category && <div className="text-xs text-gray-200">{category}</div>}

        {title && (
          <div className="mr-2 text-xm font-[300] leading-tight tracking-wide text-[var(--dy-paper-text-heading)]">
            {title}
          </div>
        )}
      </div>
      {logo && ( // Check if image exists
        <img src={logo} alt={title} className="z-10 h-9 rounded-lg" />
      )}
    </div>
  );
};

// SimpleImageCard component for rendering only image
const SimpleImageCard: React.FC<CaseStudyCardProps> = ({ image }) => {
  return (
    <div
      className="relative flex w-full flex-col items-start justify-between rounded-lg p-4"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

const HoverRevealSlip = ({
  show,
  touched,
}: {
  show: React.ReactNode;
  touched: boolean;
}) => {
  const common = "absolute flex w-full h-full [backface-visibility:hidden]";

  return (
    <div className={cn("group/study relative h-70 w-90 perspective-[1000px]")}>
      {/* Back cover - static */}
      <div
        className={cn(
          "absolute inset-0 h-full w-80 rounded-lg bg-[var(--dy-dark-text-body)] shadow-md",
        )}
      ></div>

      {/* Card container with slight book opening effect on hover */}
      <div
        className={cn(
          "relative z-50 h-full w-80 origin-left transition-transform duration-500 ease-out transform-3d group-hover/study:transform-[rotateY(-30deg)]",
          touched && "transform-[rotateY(-30deg)]",
        )}
      >
        {/* Front side of the card */}
        <div
          className={cn(
            "h-full w-full rounded-lg bg-[var(--dy-paper-bg)] shadow-md",
            common,
          )}
        >
          {show}
        </div>
      </div>

      {/* Sliding link/tab coming out from behind */}
      <div
        className={cn(
          "z-1 absolute bottom-0 right-0 flex h-60 w-20 -translate-x-10 transform items-start justify-start rounded-r-lg bg-[var(--pastel-terracotta)] pl-2 pt-2 text-xs font-bold text-white transition-transform duration-300 ease-in-out backface-hidden group-hover/study:translate-x-0 group-hover/study:rotate-[5deg] overflow-hidden",
          touched && "translate-x-0 rotate-[5deg]",
        )}
      >
        <div className="-rotate-90 whitespace-nowrap pb-25 pr-14 text-[var(--dy-paper-text-heading)]">
          CLICK AGAIN TO READ
        </div>
      </div>
    </div>
  );
};

// Main CaseStudyCard Component
export default function CaseStudyCard({
  children,
  functions,
  title,
  category,
  link,
  image,
  logo,
  type,
}: CaseStudyCardProps) {
  const [touched, setTouched] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setTouched(false);
      }
    };

    if (touched) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [touched]);

  return (
    <div className="flex gap-8" ref={cardRef}>
      <a
        href={link}
        className="block"
        onClick={(e) => {
          // on touch devices toggle first tap, navigate on second
          if (window.matchMedia("(hover: none)").matches && !touched) {
            e.preventDefault();
            setTouched((prev) => !prev);
          } else {
            if (functions) {
              functions[0].functionStatment();
            }
          }
        }}
      >
        <HoverRevealSlip
          touched={touched}
          show={
            type === "content" ? (
              <ContentCard
                title={title}
                category={category}
                image={image}
                logo={logo}
                children={children}
              />
            ) : (
              <SimpleImageCard image={image} title={title} />
            )
          }
        />
      </a>
    </div>
  );
}
