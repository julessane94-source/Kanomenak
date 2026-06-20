import type { Metadata } from "next";
import "./globals.css";
import { MainNav } from "@/components/layout/main-nav";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Nafaa - Marketplace locale",
  description: "Marketplace intelligente pour clients, vendeurs et livreurs."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <MainNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
