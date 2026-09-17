import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { Overture } from "@/components/vasuki/Overture";
import { Gathering } from "@/components/vasuki/Gathering";
import { Letter } from "@/components/vasuki/Letter";
import { Closing } from "@/components/vasuki/Closing";
import { Sound } from "@/components/vasuki/Sound";
import { Progress } from "@/components/vasuki/Progress";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "✦" },
  robots: { index: false, follow: false, nocache: true },
};

/* ---------------------------------------------------------------------------
   EDIT THE WORDS HERE.
--------------------------------------------------------------------------- */
const NAME = "Vasuki";
const MESSAGE =
  "Every piece of this picture is a day you were already in. Here's to a year that adds more of them.";
const SIGNATURE = "— Ajith";

export default function BirthdayPage() {
  return (
    <main
      className={`${serif.variable} relative`}
      style={{ background: "#07060a", color: "#fff3e4" }}
    >
      <Progress />
      <Sound />

      <Overture name={NAME} />
      <Gathering />
      <Letter message={MESSAGE} signature={SIGNATURE} />
      <Closing name={NAME} />
    </main>
  );
}
