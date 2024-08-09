import {  MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from 'next/image'
 const Header = () => {
    return ( 
        <Card>
            <CardContent className=" justify-between items-center p-5  flex flex-row">
                <Image alt="FSW-LOGO" src="/logo.png" height={18} width={120}/>
                <Button size="icon" variant={"outline"}>
                    <MenuIcon/>
                </Button>
            </CardContent>

        </Card>
     );
 }
  
 export default Header;
 