function CountdownUnit({ value, unit }: { value: number, unit: string}) {
  return (
    <div className="bg-white border border-black p-5 flex flex-col items-center">
      <div>
        <h1 className="text-3xl md:text-7xl font-bold text-center">{value}</h1>
      </div>
      <div className="flex justify-center">
        <span className="text-sm md:text-lg text-center">{unit}</span>
      </div>
    </div>
  )
}

export default function Countdown(props) {
  let countdownTitle 
  switch (props.status) {
    case "fairLaunch":
      countdownTitle = "FAIR LAUNCH COUNTDOWN"
      break;
    case "trading":
      countdownTitle = "FAIR LAUNCH COUNTDOWN"
      break;
    case "frozen":
      countdownTitle = "DEFROST COUNTDOWN"
      break;
    case "resolution":
      countdownTitle = "YES IS THE WINNER"
      break;
  }

  return (
    <div className="relative w-full bg-red-100 h-[15vh] lg:h-[15vw] flex justify-center">
      <div className="absolute bg-white border border-black min-w-[70vw] min-h-[120px] h-[20vw] lg:h-[12vw] -top-[10vh] z-10 flex justify-center p-4">
        <div className="relative">
          <h1 className="text-2xl md:text-4xl font-bold text-center">{ countdownTitle }</h1>
          <div className="relative min-w-[50vw] min-h-[10vh] z-20 grid grid-cols-4 gap-2 md:gap-5 p-2 lg:p-4">
            <CountdownUnit value={15} unit={"DAYS"}/>
            <CountdownUnit value={22} unit={"HOURS"}/>
            <CountdownUnit value={43} unit={"MINUTES"}/>
            <CountdownUnit value={38} unit={"SECONDS"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

