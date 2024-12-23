import { DM_Sans } from "@next/font/google";
import { Metadata } from "next";

const dmSans = DM_Sans({
  subsets: ["latin"], // Specify character subsets
  weight: ["400", "500", "700"], // Add the font weights you need
});

export const metadata: Metadata = {
  title: "Discount Hub",
  description: "Your best choice for discounts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-brand-white`}>
        <main className={dmSans.className}>{children}</main>
      </body>
    </html>
  );
}
