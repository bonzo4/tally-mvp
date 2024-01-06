import LeaderboardItem from "./LeaderboardItem";

export default function Leaderboard({ title }: { title: string }) {
  return (
    <div className="flex flex-col space-y-2 rounded p-1 md:border md:border-gray-200 md:p-5 md:shadow-md lg:space-y-5">
      <div>
        <h2 className="text-xl font-bold lg:text-2xl">{title}</h2>
      </div>
      <div className="flex flex-col space-y-3">
        <LeaderboardItem rank={1} name="satoshi nakamoto" value={1000000000} />
        <LeaderboardItem
          rank={2}
          name="i have a really really long name and i don't really know why but it's an edge case"
          value={218392}
        />
        <LeaderboardItem rank={3} name="Vitalik Buterin" value={199801} />
        <LeaderboardItem rank={4} name="Richard Feynman" value={38579} />
        <LeaderboardItem rank={5} name="Richard Feynman" value={38579} />
        <LeaderboardItem rank={6} name="Richard Feynman" value={38579} />
        <LeaderboardItem rank={7} name="Richard Feynman" value={38579} />
        <LeaderboardItem rank={8} name="Richard Feynman" value={38579} />
        <LeaderboardItem rank={9} name="Richard Feynman" value={38579} />
        <LeaderboardItem rank={10} name="Marcus Aurelius" value={164} />
        <LeaderboardItem rank={11} name="Marcus Aurelius" value={164} />
        <LeaderboardItem rank={12} name="Marcus Aurelius" value={164} />
        <LeaderboardItem rank={13} name="Marcus Aurelius" value={164} />
        <LeaderboardItem rank={14} name="Marcus Aurelius" value={164} />
        <LeaderboardItem rank={15} name="Marcus Aurelius" value={164} />
      </div>
    </div>
  );
}
