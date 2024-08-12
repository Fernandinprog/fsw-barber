import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

 export const BookingItem = () => {
    return (
        
    <>
    <h2 className="mt-6  ml-5 text-sm font-bold uppercase text-gray-400 ">Agendamentos</h2>
          <Card className="  m-5">
              <CardContent className="flex justify-between p-0 ">
                <div className="flex flex-col  gap-2 py-5 pl-5">
                    <Badge  className="w-fit">Confirmado</Badge>
                    <h3 className="text-xl font-semibold">Corte de cabelo</h3>

                  <div className="flex items-center gap-2 ">
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
    </> 
    );
}
 
export default BookingItem;