
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import  { quickSearchOptional } from "../app/_constantes/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { authOptions } from "./_lib/auth"
import { getServerSession } from "next-auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
   const confirmedbookings = session?.user ? await db.booking.findMany({
      where: {
         userId: (session.user as any).id,
         date: {
          gte: new Date(),
         }
       },
       include: {
         service: {
           include: {
             barbershop: true,
           },
         },
       },
       orderBy:{
        date: "asc"
       }
     })
     : []
  return (
    // MENU

    <div className="flex flex-col">
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, {session?.user ? session.user.name : "bem vindo"}</h2>
        <p>{format(new Date(), "EEEE, dd 'de'  MMMM", {locale: ptBR})}</p>
        <div className="mt-6">
          <Search />
        </div>
      </div>
      {/*SEARCH RAPIDO*/}
      <div className="mt-3 ml-5 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
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
            src="/public/banner.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

      {/*Agendamentos*/}
      <h2 className="mb-3 mt-4 ml-5 text-sm font-bold uppercase text-gray-400">
        Agendamentos
      </h2>
      <div className="flex ml-5 overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
        {confirmedbookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
        {/*Recomendados*/}
      <h2 className="mb-3 mt-3 ml-5 text-sm font-bold uppercase text-gray-400">
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
      <h2 className="mb-3 mt-3 ml-5 text-sm font-bold uppercase text-gray-400">
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
