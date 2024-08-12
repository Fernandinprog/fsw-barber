import ServiceItem from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon,  MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopProps {
    params: {
        id: string
    }
}



const Barbershop = async ({params}: BarbershopProps) => {
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include:{
            services: true
        }
    })

    if(!barbershop) {
        return notFound()
    }
    return (
        <div>
            {/*BANNER*  Barbershop*/} 
            <div className="relative w-full h-[250px]">
                <Image src={barbershop.imageUrl ?? ''} alt={barbershop.name ?? ''} fill className="object-cover" />
             <Button
             size="icon"
             variant={"secondary"}
             className="absolute top-5 left-5"
             asChild
             >
                <Link href="/">
                <ChevronLeftIcon/>
                </Link>
            </Button>

            <Button
             size="icon"
             variant={"secondary"}
             className="absolute top-5 right-5"
             >
                <MenuIcon/>
            </Button>   
            </div>
             {/*NOME DA BARBEARIA*/} 
            <div className="p-5 border-b  border-solid">
                <h1 className="text-xl font-bold mb-3">{barbershop?.name}</h1>
                <div className="flex items-center gap-1 mb-2">
                <MapPinIcon size={16} className="text-primary"/>
                <p className="text-sm">{barbershop?.address}</p>
                </div>
                <div className="flex items-center gap-1">
                <StarIcon size={16} className="text-primary fill-primary"/>
                <p className="text-sm">5,0 (499 avaliações)</p>
                </div>

            </div>
             {/*SOBRE*/} 

            <div className="p-5 border-b  border-solid space-y-3">
                <h2 className="text-xs font-bold text-gray-400 uppercase mb-3">Sobre nos</h2>
            <p className="text-sm text-justify">{barbershop.description}</p>
            </div>
            {/*SERVIÇOS*/}
            <div className="p-5 border-b  border-solid space-y-3">
            <h2 className="text-xs font-bold text-gray-400 uppercase mb-3">Serviços</h2>

                    <div className="space-y-3">
                    {barbershop.services.map((service) => (
                        <ServiceItem key={service.id} service={service}/>
                        
                    ))}

                    </div>
            
            </div>
        </div>
     );
}
 
export default Barbershop 