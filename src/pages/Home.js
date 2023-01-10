import { Link } from "react-router-dom";
import RoomsList from "../templates/RoomsList";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Container from "../components/Container";
import Zones from "../templates/Zones";

export default function Home() {
  const { device, width } = useWindowDimensions();
  console.log(device, width);
  return (
    <main className="p-4 grid grid-cols-1 md:grid-cols-3">
      <section className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold">Rooms</h1>
        <div className="flex flex-col gap-4">
          <RoomsList max={device === "tablet" ? 4 : 2} />
          <Link
            to="/rooms"
            className="flex items-center justify-between w-full px-6 rounded-3xl bg-stone-800 h-14 text-stone-300 font-semibold"
          >
            See all rooms
            <ChevronRightIcon
              strokeWidth={3}
              className="w-6 h-6 text-stone-400"
            />
          </Link>
        </div>
      </section>
      <section>
        <h2 className="text-3xl text-stone-50 font-bold">Zones</h2>
        <Container>
          <div className="p-4 justify-between">
            <Zones Zone="Alt" />
          </div>
        </Container>
        <h2 className="text-3xl text-stone-50 font-bold">Lights</h2>
        <Container>
          <div className="p-4 justify-between">
            <Zones Zone="Alt" />
          </div>
        </Container>
      </section>
    </main>
  );
}
