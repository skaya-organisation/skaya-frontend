import { useEffect, useState } from "react";
import { Hero, Features, HowItWorks, Showcase, FAQ, CTA, Footer, AIShowcase, ContactFormDialog, Products } from "../components/SaaS";
import "./index.css";
import { useDark } from 'rspress/runtime';
import { PortfolioShowcase } from "../components/PortfolioShowcase";
import { Scales } from "../components/ui/Scales";


export default function HomePage() {
  const darkMode = useDark();
  const [showContactDialog, setShowContactDialog] = useState(false);

  useEffect(() => {
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  return (

      <div className={`overflow-hidden transition-colors duration-300 relative`}>
        {/* Left Scales Border */}
        <div className="absolute left-0 top-0 bottom-0 w-6 lg:flex items-center justify-start z-40 group/left">
          <div className="h-full w-full pointer-events-auto">
            <Scales size={6} darkMode={darkMode} orientation="diagonal" />
          </div>
        </div>

        {/* Right Scales Border */}
        <div className="absolute right-0 top-0 bottom-0 w-6 lg:flex items-center justify-end z-40 group/right">
          <div className="h-full w-full pointer-events-auto">
            <Scales size={6} darkMode={darkMode} orientation="diagonal" />
          </div>
        </div>
        {/* Main Content */}
        <main>
          <Hero darkMode={darkMode} />
          <Features darkMode={darkMode} />
          <AIShowcase darkMode={darkMode} />
          {/* <Products darkMode={darkMode} /> */}
          <HowItWorks darkMode={darkMode} />
          <PortfolioShowcase darkMode={darkMode}/>
          {/* <Showcase darkMode={darkMode}/> */}
          <FAQ darkMode={darkMode} />
          <CTA darkMode={darkMode} onOpenDialog={() => setShowContactDialog(true)} />
        </main>

        {/* Footer */}
        <Footer darkMode={darkMode} />

        {/* Contact Form Dialog */}
        <ContactFormDialog
          isOpen={showContactDialog}
          onClose={() => setShowContactDialog(false)}
          darkMode={darkMode}
        />
      </div>
  );
}
