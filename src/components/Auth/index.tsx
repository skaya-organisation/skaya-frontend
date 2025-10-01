import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function CustomAuth() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
      <SignedOut>
        <SignInButton mode="modal">
          <motion.button
            className="px-4 h-16 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: "w-16 h-16", // width and height of avatar
              userButtonTrigger: "px-4 py-2 text-lg", // padding & font size
            },
          }}
        />
      </SignedIn>
    </Box>
  );
}
