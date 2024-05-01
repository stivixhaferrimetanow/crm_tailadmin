'use client'
import react , {useState , useEffect} from 'react'
import { Button } from '@/components/ui/button';
import { RiMenu2Fill } from "react-icons/ri";
import { useMyContext } from '@/app/context/context';

const MenuButton = () => {


    const { value, setValue } = useMyContext();

    
    const handleClick = () => {
        setValue(!value)
    }

    return(
        <div>
            <Button className="lh:hidden xl:hidden fixed top-0 left-0 mt-1 ml-3" onClick={handleClick}>
        <RiMenu2Fill color='white' />
      </Button>
        </div>
    )
}


export default MenuButton