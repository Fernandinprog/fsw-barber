import {  CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from 'next/image'
import { SheetTrigger, Sheet, SheetContent, SheetTitle, SheetHeader, SheetClose } from "./ui/sheet";
import { quickSearchOptional } from "../_constantes/search";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
 const Header = () => {
    return ( 
        <Card>
            <CardContent className=" justify-between items-center p-5  flex flex-row">
                <Image alt="FSW-LOGO" src="/logo.png" height={18} width={120}/>
              
            <Sheet>
                <SheetTrigger asChild>

                <Button size="icon" variant={"outline"}>
                    <MenuIcon/>
                </Button>

                </SheetTrigger>
                <SheetContent>

                <SheetHeader>
                    <SheetTitle className="text-left" >Menu</SheetTitle>
      
                </SheetHeader>
                <div className="py-5 flex gap-3">
                    
                    <Avatar >
                      <AvatarImage src="https://github.com/diego3g.png" alt="Diego Fernandes" className=" w-12 h-12  rounded-full" />
                    </Avatar>
                    
                    <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Fernando Mooura</p>
                            <p className="text-xs text-gray-400">fernando@gmail.com</p>
                    </div>
                </div>

                 <div className=" flex flex-col py-5 border-b border-solid">
                    <SheetClose asChild>
                     <Button className="gap-2   justify-start"  asChild>
                       <Link href="/">
                            <HomeIcon size={18}/>  
                             inicio
                       </Link> 
                    </Button>
                    </SheetClose>
                    


                    <Button className="gap-2 justify-start" variant="ghost">
                     <CalendarIcon size={18}/>   Agendamentos
                    </Button>


                 </div>

                 <div className=" flex flex-col py-5 border-b border-solid">
                    {quickSearchOptional.map((option) => (
                         <Button key={option.title} className="gap-2 justify-start" variant="ghost">
                        <Image
                         alt={option.title} 
                         src={option.icon} 
                         height={18} width={18} />   
                         {option.title}</Button>
                    ))}
                   
                    <Button className="gap-2 justify-start" variant="ghost">
                     <CalendarIcon size={18}/>   Agendamentos
                    </Button>


                 </div>
                 <div className=" flex flex-col py-5 ">
                        <Button className="justify-start gap-2" variant="ghost"><LogOutIcon size={18}/>  Sair da conta</Button>
                 </div>
                 
                </SheetContent>
            </Sheet>

            </CardContent>
        </Card>
     );
 }
  
 export default Header;
 