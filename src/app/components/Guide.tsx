import { MdAttachMoney } from "react-icons/md";

function Step1() {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex">
        <div className="border-2 border-tally-primary rounded-full p-4">
          <MdAttachMoney className="text-tally-primary text-[4em]"/>
        </div>
      </div>
      <div>
        <h3 className="text-2xl text-white font-bold">Step 1</h3>
      </div>
      <div className="lg:max-w-[250px]">
        <p className="text-center text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
      </div>
    </div>
  )
}

function Illustrations() {
  return (
    <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-16">
      <Step1 />
      <Step1 />
      <Step1 />
      <Step1 />
    </div>
  )
}
export default function Guide() {
  return (
    <div className="flex flex-col justify-content items-center px-4 lg:px-16 py-16">
      <div className="mb-6">
        <h2 className="text-2xl lg:text-4xl text-white font-bold text-center">How It Works</h2>
      </div>
      <div className="max-w-[700px]">
        <p className="text-white text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
        </p>
      </div>
      <Illustrations />
    </div>
  )
}

