import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "NeuralVarsity CMS",
    template: "%s | NeuralVarsity CMS",
  },
  description: "Enterprise Project Management & Deployment Portal for AI Projects",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://labs.neuralvarsity.ai"),
  openGraph: {
    title: "NeuralVarsity CMS",
    description: "AI Project Management Portal",
    siteName: "NeuralVarsity CMS",
  },
  twitter: { card: "summary_large_image", title: "NeuralVarsity CMS" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#030712] text-slate-100 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
