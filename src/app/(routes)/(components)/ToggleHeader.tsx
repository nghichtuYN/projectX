import React from 'react';
import {Button} from "@/components/ui/button";
import {X, AlignJustify} from "lucide-react";

type Props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const ToggleHeader = ({open, setOpen}: Props) => {
    return (
        <div className={"xl:hidden block pr-2"}>
            <Button size={"sm"} variant={"secondary"} onClick={() => setOpen(!open)}
                    className={" hover:bg-accent text-sm rounded-3xl"}>
                {open ? <X className={"text-secondaryColor transform transition-transform duration-300 ease-in-out "} size={64} />
                    : <AlignJustify className={"text-secondaryColor transform transition-transform duration-300 ease-in-out"} size={64}/>}
            </Button>
        </div>
    );
};

export default ToggleHeader;