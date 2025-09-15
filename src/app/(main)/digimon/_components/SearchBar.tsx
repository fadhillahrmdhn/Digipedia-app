import { Input } from "@/components/ui/input";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <Input
      className="bg-white dark:bg-gray-800 w-full md:w-1/5 self-end md:mr-4"
      type="text"
      placeholder="Search characters..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
