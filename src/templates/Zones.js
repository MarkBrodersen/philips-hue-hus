import { ChevronRight } from "lucide-react";

export default function Zones({ Zone }) {
  return (
    <div className="flex">
      <div className="flex">
        {/* Btn fra Seb */}
        <h3>{Zone}</h3>
      </div>
      <ChevronRight />
    </div>
  );
}
