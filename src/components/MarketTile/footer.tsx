import { convertNumberToDollars } from "@/lib/formats";
import { BsChat } from "react-icons/bs";

export default function MarketFooter({
  totalPot,
  totalComments,
}: {
  totalPot: number;
  totalComments: number;
}) {
  const betTotalFormatted = convertNumberToDollars(totalPot);
  return (
    <div className="flex w-full justify-between">
      <div className="text-sm text-gray-400">{`${betTotalFormatted} bet`}</div>
      <div className="flex items-center space-x-1">
        <BsChat className="text-gray-400" />
        <div className="text-xs text-gray-400">{totalComments}</div>
      </div>
    </div>
  );
}
