import { Card, CardContent } from "./ui/card";

const Footer = () => {
    return ( 
        <span>
            <Card className="flex  items-center mt-5 ">
            <CardContent className="py-6 px-5">
              <p className="font-sm text-gray-400">© 2023 Copyright <span>Fernando Barber</span></p>
            </CardContent>
          </Card>
            </span>
     );
}
 
export default Footer;