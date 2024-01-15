import { MdAttachMoney } from "react-icons/md";

function Step1() {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex">
        <div className="rounded-full border-2 border-tally-primary p-4">
          <MdAttachMoney className="text-[4em] text-tally-primary" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white">Step 1</h3>
      </div>
      <div className="lg:max-w-[250px]">
        <p className="text-center text-[#959997]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </p>
      </div>
    </div>
  );
}

function Illustrations() {
  return (
    <div className="mt-16 grid w-4/5 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Step1 />
      <Step1 />
      <Step1 />
      <Step1 />
    </div>
  );
}
export default function Guide() {
  return (
    <div className="justify-content flex flex-col items-center px-4 py-16 lg:px-16">
      <div className="mb-6">
        <h2 className="text-center text-2xl font-bold text-white lg:text-5xl">
          How It Works
        </h2>
      </div>
      <div className="max-w-[700px]">
        <p className="text-center text-[18px] text-[#959997]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla.
        </p>
      </div>
      <Illustrations />
    </div>
  );
}
