"use client"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import { Avatar, AvatarImage } from "./ui/avatar"
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
import { signIn, signOut, useSession } from "next-auth/react"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLoginWithGoogle = () => signIn("google")
  const handleLoginSingOut = () => signOut()

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      
      
      {/*AVATAR*/}
      {data?.user ?(
        <>
              <div className="flex gap-3">
        <Avatar>
          <AvatarImage
            src={data?.user?.image as string}
            alt="Diego Fernandes"
            className="h-12 w-12 rounded-full"
          />
        </Avatar>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold uppercase">{data?.user?.name}</p>
          <p className="text-xs text-gray-400">{data?.user?.email}</p>
        </div>
      </div>

        </>

      ) :( 
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
            <Button
              variant={"outline"}
              className="gap-1 font-bold"
              onClick={handleLoginWithGoogle}
            >
              <Image
                src={"/Google.svg"}
                alt="Logo do Google"
                width={18}
                height={18}
              />{" "}
              Google
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      
      
      )}
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

      <div className="flex flex-col border-b  border-solid py-5">
        {quickSearchOptional.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-2"
            variant="ghost"
          >
            <Image
              alt={option.title}
              src={option.ImageUrl}
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
        <Button className="justify-start gap-2" variant="ghost" onClick={handleLoginSingOut}>
          <LogOutIcon size={18} /> Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
