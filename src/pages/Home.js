import Container from "../components/Container";
import Zones from "../templates/Zones";

export default function Home() {
  return (
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
  );
}
