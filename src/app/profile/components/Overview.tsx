import { formatNumberWithCommasNoDecimals } from "@/lib/formats";
import { UserDoc } from "@/lib/supabase/queries/user";

export default function Overview({ user }: { user: UserDoc }) {
  return (
    <div className="flex h-full flex-col justify-center space-y-1">
      <div>
        <h1 className="text-2xl font-bold text-white lg:text-4xl">
          {user.name}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="">
          <p className="text-lg text-neutral-400">Points</p>
        </div>
        <div>
          <p className="text-lg text-white">
            {formatNumberWithCommasNoDecimals(user.reward_points)}
          </p>
        </div>
        {/* // Hide conviction for MVP
        <div className="">
          <p className="text-lg text-neutral-400">Conviction</p>
        </div>
        <div>
          <span className="text-lg">{"🔥 ".repeat(user.conviction)}</span>
          <span className="text-lg text-white/20">
            {"🔥 ".repeat(5 - user.conviction)}
          </span>
        </div>

        */}
      </div>
    </div>
  );
}
