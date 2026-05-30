export const scrollTo = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
) => {
  ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};
