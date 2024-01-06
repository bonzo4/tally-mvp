function CountdownUnit({ value, unit }: { value: number; unit: string }) {
  return (
    <div className="flex flex-col items-center border border-black bg-white p-5">
      <div>
        <h1 className="text-center text-3xl font-bold md:text-7xl">{value}</h1>
      </div>
      <div className="flex justify-center">
        <span className="text-center text-sm md:text-lg">{unit}</span>
      </div>
    </div>
  );
}

export default function Countdown(props: { status: string }) {
  let countdownTitle;
  switch (props.status) {
    case "fairLaunch":
      countdownTitle = "FAIR LAUNCH COUNTDOWN";
      break;
    case "trading":
      countdownTitle = "FAIR LAUNCH COUNTDOWN";
      break;
    case "frozen":
      countdownTitle = "DEFROST COUNTDOWN";
      break;
    case "resolution":
      countdownTitle = "YES IS THE WINNER";
      break;
  }

  return (
    <div className="relative flex h-[15vh] w-full justify-center bg-red-100 lg:h-[15vw]">
      <div className="absolute -top-[10vh] z-10 flex h-[20vw] min-h-[120px] min-w-[70vw] justify-center border border-black bg-white p-4 lg:h-[12vw]">
        <div className="relative">
          <h1 className="text-center text-2xl font-bold md:text-4xl">
            {countdownTitle}
          </h1>
          <div className="relative z-20 grid min-h-[10vh] min-w-[50vw] grid-cols-4 gap-2 p-2 md:gap-5 lg:p-4">
            <CountdownUnit value={15} unit={"DAYS"} />
            <CountdownUnit value={22} unit={"HOURS"} />
            <CountdownUnit value={43} unit={"MINUTES"} />
            <CountdownUnit value={38} unit={"SECONDS"} />
          </div>
        </div>
      </div>
    </div>
  );
}
