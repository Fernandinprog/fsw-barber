"use client"
import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { useState } from "react"
import { format, set } from "date-fns"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { createBooking } from "./_actions/create-booking"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<BarbershopService, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectedDay, setSelectDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const handleDateSelect = (date: Date | undefined) => {
    setSelectDay(date)
  }
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }
  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return
      const hours = Number(selectedTime.split(":")[0])
      const minutes = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minutes,
        hours: hours,
      })
      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      toast.success("Agendamento realizado com sucesso!")
    } catch {
      console.error(Error)
      toast.error("Erro ao criar reserva")
    }
  }
  return (
    <Card>
      <CardContent className="flex items-center justify-center gap-2 p-3">
        {/*IMAGEM*/}
        <div className="relative h-[110px] max-h-[110px] w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/*DESCRICAO*/}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          {/*PRECO E BOTAO*/}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Sheet>
              <SheetTrigger>
                <Button variant="secondary" >
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px]">
                <SheetHeader>
                  <SheetTitle>Reserve Agora</SheetTitle>
                </SheetHeader>
                <div className="border-b border-solid py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>
                {selectedDay && (
                  <div className="flex gap-3 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => {
                          handleTimeSelect(time)
                        }}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}
                {selectedTime && selectedDay && (
                  <div className="border-b border-solid py-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          {format(selectedDay, "d 'de' MMMM", {
                            locale: ptBR,
                          })}
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Horario</h2>
                          <p>{selectedTime}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Barbearia:</h2>
                          <p>{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className="px-5">
                  <SheetClose asChild>
                    <Button onClick={handleCreateBooking} disabled={!selectedDay || !selectedTime} >Reservar</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
