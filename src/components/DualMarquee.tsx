import "./DualMarquee.scss";

const StampItem = ({ url }: { url: string }) => {
  return (
    <div className="stamp">
      <img src={url} alt="stamp" className="stamp-item" />
    </div>
  );
};

export default function DualMarquee({ data }: { data: string[] }) {
  const doubled = [...data, ...data];
  return (
    <div className="marquee-container">
      <div style={{ overflow: "hidden" }}>
        <div className="marquee-track marquee-left">
          {doubled.map((url, index) => (
            <StampItem key={index} url={url} />
          ))}
        </div>
      </div>

      <div style={{ overflow: "hidden" }}>
        <div className="marquee-track marquee-right">
          {doubled.map((url, index) => (
            <StampItem key={index} url={url} />
          ))}
        </div>
      </div>
    </div>
  );
}
