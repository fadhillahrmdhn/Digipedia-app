import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full md:w-1/3 lg:w-1/4 self-end md:mr-4 border border-gray-300 rounded-md">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="bg-white dark:bg-gray-800 pl-10 text-black dark:text-white"
        type="text"
        placeholder="Search characters..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
