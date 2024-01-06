export default function Ranking() {
  const ranking = 2;
  const metric = "Profit";
  return (
    <div className="flex w-full flex-col items-center space-y-2">
      <div className="aspect-square h-full border border-black py-2">
        <div className="w-full text-center text-lg">{`Rank: #`}</div>
        <div className="w-full text-center text-6xl font-bold">{ranking}</div>
        <div className="w-full text-center text-lg">{metric}</div>
      </div>
    </div>
  );
}
