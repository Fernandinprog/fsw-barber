
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import  { quickSearchOptional } from "../app/_constantes/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"

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
        <div className="mt-6">
          <Search />
        </div>
      </div>
      {/*SEARCH RAPIDO*/}
      <div className="mt-6 ml-5 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptional.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.ImageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

      {/*Banner*/}
      <div className="relative rounded-xl mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

      {/*Agendamentos*/}
      <BookingItem />
      {/*Recomendados*/}
      <h2 className="mb-3 ml-5 text-sm font-bold uppercase text-gray-400">
        Recomendados
      </h2>
      <div className="flex ml-5 gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barbershops) => (
          <BarbershopItem
            key={barbershops.id}
            barbershop={barbershops}
            
          />
        ))}

        {/*Populares*/}
      </div>{" "}
      <h2 className="mb-3 ml-5 text-sm font-bold uppercase text-gray-400">
        Populares
      </h2>
      <div className="flex ml-5 gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
        {popularBarbershops.map((barbershops) => (
          <BarbershopItem
            key={barbershops.id}
            barbershop={barbershops}
            
          />
        ))}
      </div>
      {/*Footer*/}
    </div>
  )
}
export default Home
