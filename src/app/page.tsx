import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptional } from "./_constantes/search"
import BookingItem from "./_components/booking-item"

// TODO: Criar um componente para o card do barbeiro

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
  return (
    // MENU

    <div className="flex flex-col">
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá Fernando</h2>
        <p>Quinta feira, 08 de agosto</p>
        <div className="mt-6 flex items-center justify-between gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
      </div>
      {/*SEARCH RAPIDO*/}
      <div className="ml-5 mt-2 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {quickSearchOptional.map((item) => (
          <Button key={item.icon} variant={"secondary"} className="gap-2">
            <Image src={item.icon} alt={item.title} width={20} height={20} />
            {item.title}
          </Button>
        ))}
      </div>
      {/*Banner*/}
      <div className="h[150px] relative mt-4 w-full rounded-xl">
        <Image
          src="/banner.png"
          alt="Banner"
          width={1000}
          height={150}
          className="rounded-xl object-cover"
        />
      </div>
      {/*Agendamentos*/}
      <BookingItem />
      {/*Recomendados*/}
      <h2 className="mb-3 ml-5 text-sm font-bold uppercase text-gray-400">
        Recomendados
      </h2>
      <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barbershops) => (
          <BarbershopItem
            key={barbershops.id}
            barbershop={barbershops}
            imageUrl={""}
          />
        ))}

        {/*Populares*/}
      </div>{" "}
      <h2 className="mb-3 ml-5 text-sm font-bold uppercase text-gray-400">
        Populares
      </h2>
      <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
        {popularBarbershops.map((barbershops) => (
          <BarbershopItem
            key={barbershops.id}
            barbershop={barbershops}
            imageUrl={""}
          />
        ))}
      </div>
      {/*Footer*/}
    </div>
  )
}
export default Home
