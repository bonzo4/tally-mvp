import Legal from "./Legal";
import Links from "./Links";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col bg-gradient-to-t from-black to-neutral-900 px-4 pb-8 pt-10 md:px-16">
      <div className="flex flex-col space-y-12 pb-12 md:flex-row md:space-x-5 md:space-y-0">
        <Newsletter />
        <Links />
      </div>
      <Legal />
    </footer>
  );
}
