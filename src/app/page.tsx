import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import  Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";


const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  console.log(barbershops)
  return (
        <div className="flex flex-col ">
        <Header/>
        <div className="p-5">
          <h2 className="text-xl font-bold">Olá Fernando</h2>
          <p>Quinta feira, 08 de agosto</p>
            <div className="flex justify-between items-center gap-2 mt-6">
              <Input placeholder="Faça sua busca..."/>
              <Button>
                <SearchIcon/>
              </Button>

            </div>
        </div>

        <div className="relative w-full h[150px] mt-4 rounded-xl   ">
          <Image src="/banner.png" alt="Banner" width={1000} height={150} className="object-cover rounded-xl"/>
        </div>
            <h2 className="mt-6  ml-5 text-sm font-bold uppercase text-gray-400 ">Agendamentos</h2>
          <Card className="  m-5">
              <CardContent className="flex justify-between p-0 ">
                <div className="flex flex-col  gap-2 py-5 pl-5">
                    <Badge className="w-fit" >Confirmado</Badge>
                    <h3 className="text-xl font-semibold">Corte de cabelo</h3>

                  <div className="flex items-center ">
                    <Avatar className="w-6 h-6 rounded-full">
                      <AvatarImage src="https://github.com/diego3g.png" alt="Diego Fernandes" className="rounded-full" />
                    </Avatar>
                    <p className="text-sm">Barbearia FSW</p>
                  </div>
                </div>
             <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Fevereiro</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
             </div>
                
                
              </CardContent>
          </Card>
          <h2 className="mb-3 ml-5 text-sm font-bold uppercase text-gray-400 ">Recomendados</h2>
          <div className="flex  gap-4 overflow-auto  [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershops) => (
              <BarbershopItem key={barbershops.id} barbershop={barbershops} />

            ))}
          </div>
          </div>
  );
}
export default Home;