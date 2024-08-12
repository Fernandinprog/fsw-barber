import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarsIcon } from "lucide-react";
import Link from "next/link";

interface BarbershopItemProps {
    barbershop: Barbershop
    imageUrl: string
}

const BarbershopItem = ({barbershop}: BarbershopItemProps) => {
    return (

    <Card className="min-w-[167px] ml-5 rounded-2xl ">
        <CardContent className="p-0 px-1 pt-1">
            <div className="relative w-full h-[159px] flex    ">
                <Image  className="object-cover rounded-2xl" width={200} height={259}  src={barbershop.imageUrl} alt={barbershop.name} />
                <Badge className="absolute top-2 leftt-2 space-x-1" variant={"secondary"}>
                    <StarsIcon size={12} className="fill-primary text-primary"/>
                    <span className="text-xs font-semibold">5,0</span>

                </Badge>
            </div>

            <div className=" py-3 px-1">
                <h3 className="truncate font-semibold">{barbershop.name}</h3>
                <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
                <Button variant={"secondary"} className="text-xs text-gray-400 mt-3 w-full" asChild><Link href={`/barbershops/${barbershop.id}`}>Reservar</Link></Button>
            </div>
        </CardContent>
    </Card>
    )
}
 
export default BarbershopItem ;