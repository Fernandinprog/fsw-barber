import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return notFound()
  }
  const ConfirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
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
  const ConcludedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy:{
      date: "desc"
    }
  })
  
  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {ConfirmedBookings.length > 0 &&(
          <h2 className="mb-3 ml-5 mt-4 text-sm font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        )}

        {ConfirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
        {ConcludedBookings.length > 0 &&(
          <h2 className="mb-3 ml-5 mt-4 text-sm font-bold uppercase text-gray-400">
          Finalizados
        </h2>
        )}

        {ConcludedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  )
}

export default Bookings
