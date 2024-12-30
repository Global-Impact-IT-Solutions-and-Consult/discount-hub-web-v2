import Header from "@/components/header/page";
import "../globals.css";
import Footer from "@/components/footer/page";
import ScrollToTopButton from "@/components/scrollToTop/ScrollToTopButton";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-32 mx-auto  text-brand-dark w-[97%] max-w-[1280px] lg:w-[95%]">
      <Header />
      <div className="p-2 mt-[78px] lg:py-6 lg:px-0">{children}</div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
