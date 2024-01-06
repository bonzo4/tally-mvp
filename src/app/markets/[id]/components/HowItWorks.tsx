import Image from "next/image";

function Instruction() {
  return (
    <div className="flex justify-between border border-gray-200 p-2 shadow lg:flex-row">
      <div className="flex items-center justify-center p-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus
          elit in eros scelerisque, aliquet facilisis orci accumsan. Vestibulum
          porta dapibus nisi in cursus. Sed hendrerit vehicula nunc a ultricies.
          Sed justo lorem, tincidunt ac quam et, rhoncus pharetra orci.
          Curabitur sed mattis ipsum. Integer at ornare nibh. Donec et sem vitae
          augue malesuada hendrerit vitae vitae lacus. Nam a mattis est, sit
          amet interdum sem. Pellentesque ut neque eget sem tincidunt vestibulum
          non eu odio. Pellentesque hendrerit volutpat lorem nec commodo.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative h-[15vw] w-[15vw]">
          <Image
            src="https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-3.jpg"
            fill={true}
            alt="test image"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="flex w-full flex-col items-center space-y-5 py-5">
      <h2 className="text-4xl font-bold">HOW IT WORKS</h2>
      <div className="flex flex-col space-y-4">
        <Instruction />
        <Instruction />
        <Instruction />
        <Instruction />
        <Instruction />
      </div>
    </div>
  );
}
