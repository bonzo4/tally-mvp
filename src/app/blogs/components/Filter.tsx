import { FilterButton } from "@/components/FilterButtonPrimitive";

export default function Filter({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (s: string) => void;
}) {
  return (
    <div className="flex space-x-4">
      <FilterButton
        selected={selected}
        onClick={() => setSelected("Category One")}
        name="Category One"
      />
      <FilterButton
        selected={selected}
        onClick={() => setSelected("Category Two")}
        name="Category Two"
      />
      <FilterButton
        selected={selected}
        onClick={() => setSelected("Category Three")}
        name="Category Three"
      />
      <FilterButton
        selected={selected}
        onClick={() => setSelected("Category Four")}
        name="Category Four"
      />
    </div>
  );
}
