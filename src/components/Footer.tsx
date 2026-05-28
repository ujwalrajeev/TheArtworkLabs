import "./Footer.scss";

type FooterProps = {
  backgroundTheme: "paper" | "dark";
};

export default function Footer({ backgroundTheme }: FooterProps) {
  return (
    <footer className="footer-container">
      <p
        style={{ color: `var(--dy-${backgroundTheme}-text-heading)` }}
        className="text-xs"
      >
        &copy; {new Date().getFullYear()} The Artwork Labs. All rights reserved.
      </p>
    </footer>
  );
}
