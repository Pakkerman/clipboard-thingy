import "~/styles/globals.css"

import { Roboto, Chakra_Petch } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { headers } from "next/headers"

import { TRPCReactProvider } from "~/trpc/react"
import { ClipboardContextProvider } from "./context/ClipboardContext"
import { NavContextProvider } from "./context/NavContext"
import { ThemeContextProvider } from "./context/ThemeContext"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
})

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-chakraPetch",
})

export const metadata = {
  title: "Clipbroker",
  description:
    "A Clipboard webapp enables you to easily copy stuff across your devices.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${roboto.variable} ${chakraPetch.variable}`}>
        <ThemeContextProvider>
          <Toaster />
          <NavContextProvider>
            <ClipboardContextProvider>
              <TRPCReactProvider headers={headers()}>
                {children}
              </TRPCReactProvider>
            </ClipboardContextProvider>
          </NavContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
