import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import Image from "next/image"
import { quickSearchOptional } from "../_constantes/search"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
const SidebarButton = () => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        <h2 className="font-lg font-bold">Olá, faça seu login!</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] sm:w-[425px]">
            <DialogHeader>
              <DialogTitle>Faça çogin na plataforma</DialogTitle>
              <DialogDescription>
                Conecte-se com sua conta do Google.
              </DialogDescription>
            </DialogHeader>
            <Button variant={"outline"} className="gap-1 font-bold">
              <Image
                src={"/Google.svg"}
                alt="Logo do Google"
                width={18}
                height={18}
              /> Google
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              inicio
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} /> Agendamentos
        </Button>
      </div>

      <div className="flex flex-col border-b border-solid py-5">
        {quickSearchOptional.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-2"
            variant="ghost"
          >
            <Image
              alt={option.title}
              src={option.icon}
              height={18}
              width={18}
            />
            {option.title}
          </Button>
        ))}

        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} /> Agendamentos
        </Button>
      </div>
      <div className="flex flex-col py-5">
        <Button className="justify-start gap-2" variant="ghost">
          <LogOutIcon size={18} /> Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarButton
