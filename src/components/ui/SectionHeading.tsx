import { Reveal } from "./Reveal";
import { Squiggle } from "./Decor";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  accent?: string;
};

export function SectionHeading({ id, title, subtitle, align = "center", accent = "#A78BFA" }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`mb-8 sm:mb-10 ${center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}`}>
      <h2 id={id} className="text-[26px] leading-tight font-extrabold text-ink sm:text-[34px]">
        {title}
      </h2>
      <Squiggle color={accent} className={`mt-3 h-3 w-20 ${center ? "mx-auto" : ""}`} />
      {subtitle && <p className="mt-3 text-[15px] leading-relaxed text-ink-soft sm:text-base">{subtitle}</p>}
    </Reveal>
  );
}
