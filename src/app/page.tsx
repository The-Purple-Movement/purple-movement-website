import dynamic from "next/dynamic";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Hero2 from "./components/sections/Hero2";
import { VisionMission } from "./components/sections/VisionMission";

const Whypurple = dynamic(() => import("./components/sections/Whypurple"));
const Pyramid = dynamic(() => import("./components/sections/Pyramid"));
const Manifesto = dynamic(() => import("./components/sections/Manifesto").then((mod) => mod.Manifesto));
const FlagshipEvents = dynamic(() => import("./components/sections/FlagshipEvents"));
const Events = dynamic(() => import("./components/sections/Events"));
const FAQ = dynamic(() => import("./components/sections/FAQ").then((mod) => mod.FAQ));
const Contact = dynamic(() => import("./components/sections/Contact").then((mod) => mod.Contact));
const CallToAction = dynamic(() => import("./components/sections/CallToAction").then((mod) => mod.CallToAction));

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-pm-bg text-pm-text-primary">
      <Navbar />
      <main className="w-full">
        <Hero2 />
        <VisionMission />
        <Whypurple />
        <Pyramid />
        <Manifesto />
        <FlagshipEvents />
        <Events />
        {/* FAQ & Contact Section Row */}
        <div className="w-full bg-pm-bg py-16 sm:py-20 md:py-24 border-t border-pm-card-border/40 relative overflow-hidden">
          {/* Ambient atmosphere glows */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pm-deep/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pm-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-[92%] sm:w-[90%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10">
            <div className="lg:col-span-7 w-full">
              <FAQ />
            </div>
            <div className="lg:col-span-5 w-full lg:sticky lg:top-28">
              <Contact />
            </div>
          </div>
        </div>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
