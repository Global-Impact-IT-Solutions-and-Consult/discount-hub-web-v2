import { DM_Sans } from "next/font/google";
// import { DM_Sans } from "@next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
// });

const dmSans = DM_Sans({
  subsets: ["latin"], // Ensure this matches your usage
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Discounts Hub",
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
        <ReactQueryProvider>
          <main className={dmSans.className}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
