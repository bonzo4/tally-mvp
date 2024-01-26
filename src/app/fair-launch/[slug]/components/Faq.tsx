import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Question() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        className="border-b-0 bg-tally-layer-1 px-6"
        value="item-1"
      >
        <AccordionTrigger className="text-lg text-tally-gray">
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent className="text-lg text-tally-gray">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function Faq() {
  return (
    <div className="flex flex-col gap-10 px-4 py-10 lg:flex-row lg:gap-20 lg:px-16 lg:py-28">
      <div className="flex flex-col space-y-8 lg:max-w-[350px] xl:max-w-[500px]">
        <div className="text-5xl font-bold text-white">FAQs</div>
        <div className="text-lg text-tally-gray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </div>
      </div>
      <div className="flex-grow space-y-4">
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
      </div>
    </div>
  );
}
