import Container from "../components/Container";
import Sheet from "react-modal-sheet";
import {useState} from "react";
import {X, BedSingle, Monitor, ChefHat, Sofa, Home} from "lucide-react"

const NewTheme = () => {
    const [isOpen, setOpen] = useState(false)
    return ( 
    <div>
        <div className="w-72 m-auto pt-8">
        <Container>
            <h1 className="text-center text-2xl">Theme</h1>
        </Container>
       
        </div>
        <div className="w-32">
        <Container>
           <button onClick={() => setOpen(true)}>Choose Logo</button>
        </Container>
        </div>
        <Sheet isOpen={isOpen} detent='full-height' onClose={() => setOpen(false)}>
        <Sheet.Container>
            <Sheet.Header className="bg-zinc-900"/> 
            <Sheet.Content className="bg-zinc-900 ">
            <button className="absolute top-0 right-5" onClick={() => setOpen(false)}><X color="white" size={28}/></button>
                   <div className="grid grid-3  grid-flow-col grid-rows-2 pt-12 gap-8">
                    <BedSingle color="white" size={48}/>
                    <Monitor  color="white" size={48}/>
                    <ChefHat  color="white"size={48}/>
                    <Sofa color="white" size={48}/>
                    <Home color="white" size={48}/>
                    </div>  
            </Sheet.Content>
        </Sheet.Container>
        </Sheet>
    </div> 
    );
}
 
export default NewTheme