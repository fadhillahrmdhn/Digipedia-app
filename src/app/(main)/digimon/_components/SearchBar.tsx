import { Input } from "@/components/ui/input";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <Input
      className="bg-white dark:bg-gray-800 w-full lg:w-1/4 self-end md:mr-4"
      type="text"
      placeholder="Search characters..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
