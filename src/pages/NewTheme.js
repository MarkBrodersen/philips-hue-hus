import Container from "../components/Container";
import Sheet from "react-modal-sheet";
import {useState} from "react";
import {X, BedSingle, Monitor, Tent, Sofa, Home, VenetianMask, ShowerHead, UtensilsCrossed, Lightbulb} from "lucide-react"
import { CirclePicker } from "react-color";
const NewTheme = () => {
    const [isOpen, setOpen] = useState(false)
    const [Icon, setIcon] = useState('');
    const [isColorOpen, setColorOpen] = useState(false)
    const [currentColor, setCurrentColor] = useState("")

    const handleColorChangeComplete = (color) => {
        setCurrentColor(color.hex)
        setColorOpen(false)
    }
    
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
        <div className="ml-8 mt-6">
        <Container fit>
            <div className="p-4">
            <button  onClick={() => setOpen(true)} >
                {Icon === "bedsingle" ? (
                    <BedSingle color="white" size={38}/>
                ) : Icon === "Monitor" ? (
                    <Monitor color="white" size={38}/>
                ) : Icon === "utensilscrossed" ? (
                    <UtensilsCrossed color="white" size={38}/>
                ) : Icon === "sofa" ? (
                    <Sofa color="white" size={38}/>
                ) : Icon === "home" ? (
                    <Home color="white" size={38}/>
                ) : Icon === "venetianmask" ? (
                    <VenetianMask color="white" size={38}/>
                ) : Icon === "showerhead" ? (
                    <ShowerHead color="white" size={38}/>
                ) : Icon === "tent" ? (
                    <Tent color="white" size={38}/>
                ) : (
                    <Lightbulb color="white" size={38}/>
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
                <div className="grid grid-flow-col mt-12 grid-rows-2 gap-6">
                <Container fit>
                    <div className="p-6 ">
                        <div style={{background: currentColor}} className="h-20 w-32 rounded-3xl flex align-center justify-center">
                            <button onClick={() => setColorOpen(true)} className="text-xl w-full">Color</button>
                        </div>
                    </div>
                </Container>

                <Container fit>
                    <div className="p-6 ">
                        <div style={{background: currentColor}} className="h-20 w-32 rounded-3xl flex align-center justify-center">
                            <button onClick={() => setColorOpen(true)} className="text-xl w-full">Color</button>
                        </div>
                    </div>
                </Container>

                <Container fit>
                    <div className="p-6 ">
                        <div style={{background: currentColor}} className="h-20 w-32 rounded-3xl flex align-center justify-center">
                            <button onClick={() => setColorOpen(true)} className="text-xl w-full">Color</button>
                        </div>
                    </div>
                </Container>

                <Container fit>
                    <div className="p-6 ">
                        <div style={{background: currentColor}} className="h-20 w-32 rounded-3xl flex align-center justify-center">
                            <button onClick={() => setColorOpen(true)} className="text-xl w-full">Color</button>
                        </div>
                    </div>
                </Container>
                </div>

                <Sheet isOpen={isColorOpen} detent="full-height" disableDrag={true} onClose={() => setColorOpen(false)}>
                    <Sheet.Container>
                    <Sheet.Header className="bg-zinc-900"/>
                        <Sheet.Content className="bg-zinc-900">
                            <div>
                            <button className="absolute top-0 right-5" onClick={() => setColorOpen(false)}><X color="white" size={28}/></button>
                             <CirclePicker circleSpacing={38} circleSize={50} color={currentColor} onChangeComplete={handleColorChangeComplete} className=" absolute  justify-between  top-16 left-20"/>
                            </div>
                       
                        </Sheet.Content>
                    </Sheet.Container>
            
                </Sheet>
            
                
                <button className="w-1/2 ">Submit</button> 
    </div> 
    
    );
}
 
export default NewTheme