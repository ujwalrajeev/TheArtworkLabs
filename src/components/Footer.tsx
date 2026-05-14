type FooterProps = {
  theme: "primary" | "secondary";
};

export default function Footer({ theme }: FooterProps) {
  return (
    <footer className="footer-container">
      <p className={`text-[var(--color-text-${theme})] text-xs`}>
        &copy; {new Date().getFullYear()} The Artwork Labs. All rights reserved.
      </p>
    </footer>
  );
}
