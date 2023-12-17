import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center p-5">
      <div className="flex flex-col space-y-5 items-center">
        <div>
          <h1 className="text-4xl font-bold text-center">404 - Page Not Found</h1>
        </div>
        <div>
          <p className="text-center">{`We can't find the page you're looking for. Please check if the URL is correct.`}</p>
        </div>
        <Link href="/">
          <Button className="text-xl font-bold min-w-[300px] p-5 bg-blue-500 hover:bg-blue-400">Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
