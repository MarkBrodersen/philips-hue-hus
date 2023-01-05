import Container from "../components/Container";
import {BedSingle, Power} from "lucide-react";

const Rooms = () => {
    return ( 
    <div>
        <h1 className="text-3xl">Rooms</h1>
        <div className="flex gap-3">
            <Container>
                <div className="flex gap-6 justify-between ">
                <BedSingle  size={48} />
                <button className="bg-pink-300 rounded-full w-14 h-14 flex justify-center items-center"><Power  size={28} color="black"/> </button>
                </div>
            </Container>
            <Container>
            </Container>
        </div>
    </div> 
    
    );
}
export default Rooms