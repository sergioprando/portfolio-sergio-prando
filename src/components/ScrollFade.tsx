import { useRef, useEffect, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  color?: string; // cor de fundo para a sombra (default: #ECEEE8)
  shadowWidth?: string; // largura da sombra (default: w-24)
}

export default function ScrollFade({
  children,
  className = "",
  color = "#ECEEE8",
  shadowWidth = "w-24",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft]   = useState(false);
  const [right, setRight] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setLeft(el.scrollLeft > 1);
    setRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const shadow = (side: "left" | "right") => (
    <div
      aria-hidden="true"
      className={`absolute top-0 bottom-0 ${shadowWidth} pointer-events-none z-10 transition-opacity duration-300 ${
        side === "left"
          ? "left-0 bg-gradient-to-r"
          : "right-0 bg-gradient-to-l"
      }`}
      style={{ backgroundImage: `linear-gradient(to ${side === "left" ? "right" : "left"}, ${color} 0%, transparent 100%)` }}
    />
  );

  return (
    <div className="relative">
      {left  && shadow("left")}
      <div ref={ref} className={className}>
        {children}
      </div>
      {right && shadow("right")}
    </div>
  );
}
