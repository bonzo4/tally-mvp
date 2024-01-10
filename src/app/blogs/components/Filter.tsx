import { FilterButton } from "@/components/FilterButton";

function PseudoMargin() {
  return <div className="w-[24px] md:hidden"></div>;
}

export default function Filter({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (s: string) => void;
}) {
  return (
    <div className="flex w-full space-x-4 overflow-x-auto md:justify-center">
      <PseudoMargin />
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
      <PseudoMargin />
    </div>
  );
}
