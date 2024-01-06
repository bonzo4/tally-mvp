import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center p-5">
      <div className="flex flex-col items-center space-y-5">
        <div>
          <h1 className="text-center text-4xl font-bold">
            404 - Page Not Found
          </h1>
        </div>
        <div>
          <p className="text-center">{`We can't find the page you're looking for. Please check if the URL is correct.`}</p>
        </div>
        <Link href="/">
          <Button className="min-w-[300px] bg-blue-500 p-5 text-xl font-bold hover:bg-blue-400">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
}
