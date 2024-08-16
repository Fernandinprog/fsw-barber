import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import Image from "next/image"
import { signIn } from "next-auth/react"
const SignInDialog = () => {
  const handleLoginWithGoogle = () => signIn("google")
  return (
    <>
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
    </>
  )
}
export default SignInDialog
