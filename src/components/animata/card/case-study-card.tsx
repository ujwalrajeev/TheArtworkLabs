import type React from "react";

import { cn } from "../../../libs/utils";
import { useState } from "react";

interface CaseStudyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  category?: string;
  image?: string;
  logo?: string;
  link?: string;
  type?: "content" | "simple-image"; // Decides between text or image
}

// ContentCard Component for rendering text + image
const ContentCard: React.FC<CaseStudyCardProps> = ({
  title,
  category,
  image,
  logo,
}) => {
  return (
    <div>
      <div></div>
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
    <div className={cn("group/study relative h-60 w-52 perspective-[1000px]")}>
      {/* Back cover - static */}
      <div
        className={cn(
          "absolute inset-0 h-full w-48 rounded-lg bg-gray-50 shadow-md",
        )}
      ></div>

      {/* Card container with slight book opening effect on hover */}
      <div
        className={cn(
          "relative z-50 h-full w-48 origin-left transition-transform duration-500 ease-out transform-3d group-hover/study:transform-[rotateY(-30deg)]",
          touched && "transform-[rotateY(-30deg)]",
        )}
      >
        {/* Front side of the card */}
        <div
          className={cn("h-full w-full rounded-lg bg-white shadow-md", common)}
        >
          {show}
        </div>
      </div>

      {/* Sliding link/tab coming out from behind */}
      <div
        className={cn(
          "z-1 absolute bottom-0 right-0 flex h-48 w-14 -translate-x-10 transform items-start justify-start rounded-r-lg bg-[var(--pastel-sage)] pl-2 pt-2 text-xs font-bold text-white transition-transform duration-300 ease-in-out backface-hidden group-hover/study:translate-x-0 group-hover/study:rotate-[5deg]",
          touched && "translate-x-0 rotate-[5deg]",
        )}
      >
        <div className="-rotate-90 whitespace-nowrap pb-16 pr-9 text-[var(--dy-paper-text-heading)]">
          CLICK TO READ
        </div>
      </div>
    </div>
  );
};

// Main CaseStudyCard Component
export default function CaseStudyCard({
  title,
  category,
  link,
  image,
  logo,
  type,
}: CaseStudyCardProps) {
  const [touched, setTouched] = useState(false);
  return (
    <div className="flex gap-8">
      <a
        href={link}
        className="block"
        onClick={(e) => {
          // on touch devices toggle first tap, navigate on second
          if (window.matchMedia("(hover: none)").matches && !touched) {
            e.preventDefault();
            setTouched((prev) => !prev);
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
