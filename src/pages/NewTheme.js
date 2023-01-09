import Container from "../components/Container";
import Sheet from "react-modal-sheet";
import {useState} from "react";
import {X, BedSingle, Monitor, Tent, Sofa, Home, VenetianMask, ShowerHead, UtensilsCrossed, Lightbulb} from "lucide-react"
import { SketchPicker } from "react-color";
const NewTheme = () => {
    const [isOpen, setOpen] = useState(false)
    const [Icon, setIcon] = useState('');
    const [isColorOpen, setColorOpen] = useState(false)
    function iconPicker(icon) {
        setIcon(icon)
        setOpen(false)
    }
    return ( 
    <div>
        <div className="w-72 m-auto pt-8">
        <Container>
            <h1 className="text-center p-2 text-2xl">Theme</h1>
        </Container>
       
        </div>
        <div className="w-32 ml-8 mt-6">
        <Container fit>
            <div className="p-4 ">
            <button  onClick={() => setOpen(true)}>
                {Icon === "bedsingle" ? (
                    <BedSingle color="white" size={28}/>
                ) : Icon === "Monitor" ? (
                    <Monitor color="white" size={28}/>
                ) : Icon === "utensilscrossed" ? (
                    <UtensilsCrossed color="white" size={28}/>
                ) : Icon === "sofa" ? (
                    <Sofa color="white" size={28}/>
                ) : Icon === "home" ? (
                    <Home color="white" size={28}/>
                ) : Icon === "venetianmask" ? (
                    <VenetianMask color="white" size={28}/>
                ) : Icon === "showerhead" ? (
                    <ShowerHead color="white" size={28}/>
                ) : Icon === "tent" ? (
                    <Tent color="white" size={28}/>
                ) : (
                    <Lightbulb color="white" size={28}/>
                    )
            }
                </button>
            </div>
          
        </Container>
        </div>
        <Sheet isOpen={isOpen} detent='full-height' onClose={() => setOpen(false)}>
        <Sheet.Container>
            <Sheet.Header className="bg-zinc-900"/> 
            <Sheet.Content className="bg-zinc-900 ">
            <button className="absolute top-0 right-5" onClick={() => setOpen(false)}><X color="white" size={28}/></button>
                   <div className="grid grid-3 w-80 m-auto grid-flow-col grid-rows-3 pt-12 gap-14">
                 <button onClick={() => iconPicker("bedsingle")}> <BedSingle color="white" size={48}/> </button>
                 <button onClick={() => iconPicker("Monitor")}> <Monitor  color="white" size={48}/></button>
                 <button onClick={() => iconPicker("utensilscrossed")}><UtensilsCrossed  color="white"size={48}/></button>
                 <button onClick={() => iconPicker("sofa")}> <Sofa color="white" size={48}/></button>
                 <button onClick={() => iconPicker("home")}><Home color="white" size={48}/></button>
                 <button onClick={() => iconPicker("venetianmask")}> <VenetianMask color="white" size={48}/></button>
                 <button onClick={() => iconPicker("showerhead")}><ShowerHead color="white" size={48}/></button>
                 <button onClick={() => iconPicker("tent")}><Tent color="white" size={48}/></button>

                    </div>  
            </Sheet.Content>
        </Sheet.Container>
        </Sheet>

                <Container>
                    <button onClick={() => setColorOpen(true)}>xd</button>
                </Container>
                <Sheet isOpen={isColorOpen} detent="content-height" disableDrag={true} onClose={() => setColorOpen(false)}>
                    <Sheet.Container>
                        <Sheet.Header className="bg-zinc-900"/>
                        <Sheet.Content className="bg-zinc-900">
                        <button className="absolute top-0 right-5" onClick={() => setColorOpen(false)}><X color="white" size={28}/></button>
                        <SketchPicker />
                        </Sheet.Content>
                    </Sheet.Container>
            
                </Sheet>
           

    </div> 
    );
}
 
export default NewTheme