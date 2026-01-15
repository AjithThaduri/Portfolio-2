import ScrollyCanvas from "@/components/ScrollyCanvas";
import { Overlay } from "@/components/Overlay";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { SelectedWork } from "@/components/SelectedWork";
import { Expertise } from "@/components/Expertise";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full bg-[#0f0f0f] text-[#ededed]">
      <Header />
      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>

      <div className="relative z-10 bg-[#0f0f0f] border-t border-white/5 shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        <div id="about"><About /></div>
        <div id="experience"><Experience /></div>
        <div id="skills"><Expertise /></div>
        <div id="services"><Services /></div>
        <div id="projects"><SelectedWork /></div>
        <div id="contact"><Contact /></div>

        <footer className="py-12 text-center text-white/20 text-xs uppercase tracking-widest border-t border-white/5">
          © 2026 Ajith Thaduri.
        </footer>
      </div>
    </main>
  );
}
