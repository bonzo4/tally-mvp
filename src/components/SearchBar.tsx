import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <Input
      placeholder="Search"
      className="border-0 bg-zinc-800 text-white placeholder:text-gray-400"
    />
  );
}
