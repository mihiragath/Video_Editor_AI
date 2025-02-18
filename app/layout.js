import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });
export const metadata = {
  title: "Video_Editor-AI",
  description: ";)",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={outfit.className}>
          <Provider>{children}
            <Toaster/>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
