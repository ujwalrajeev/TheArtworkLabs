import "./Tags.scss";

export default function Tags({ color, tag }: { color: string; tag: string }) {
  return (
    <div
      className="tags-container"
      style={{
        color: color,
        borderColor: color,
        backgroundColor: `${color}66`, // 26 in hex = ~15% opacity
      }}
    >
      {tag}
    </div>
  );
}
