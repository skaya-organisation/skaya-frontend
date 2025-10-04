// src/pages/Home.tsx
import { useEffect } from "react";
import HomeCard from "../components/HomeCard/Index";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import { useThemeState } from "rspress/theme";
import { useDark } from 'rspress/runtime';
import { dark } from "@clerk/themes"; 

const PUBLISHABLE_KEY =process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "";

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default function HomePage() {
  const darkMode = useDark();

    useEffect(() => {
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);


  return (
    <div className=" ">
      {/* Hero Section */}

      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
             appearance={{
        baseTheme: darkMode === true ? dark : undefined,
      }}
      >
        <HomeCard />
      </ClerkProvider>
    
    </div>
  );
}
