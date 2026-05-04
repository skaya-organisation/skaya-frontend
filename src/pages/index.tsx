import { useEffect, useState } from "react";
import { Hero, Features, HowItWorks, Showcase, FAQ, CTA, Footer, AIShowcase, ContactFormDialog, Products } from "../components/SaaS";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import { useDark } from 'rspress/runtime';
import { dark } from "@clerk/themes";
import { PUBLISHABLE_KEY } from "../utils/constants";
import { PortfolioShowcase } from "../components/PortfolioShowcase";
import { Scales } from "../components/ui/Scales";

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

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
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: darkMode === true ? dark : undefined,
      }}
    >
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
    </ClerkProvider>
  );
}
