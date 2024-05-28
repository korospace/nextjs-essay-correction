// nextjs
import { Button, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
// assets
import BudiluhurJpg from "@/assets/images/budiluhur.jpg"
// external lib
import { Icon } from "@iconify/react"

export default function NavbarComponent() {

    return(
        <Navbar maxWidth="full" className="bg-red-200">
            <NavbarBrand>
                <div className="w-10 mr-2 p-0.5 bg-white rounded-full">
                    <Image
                        className="w-full"
                        src={BudiluhurJpg.src} 
                    />
                </div>
                <p style={{fontWeight: 'bold'}}>SISTEM PENILAIAN ESSAY</p>
            </NavbarBrand>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        <Icon
                            icon="uil:setting" 
                            className="text-2xl text-default-400" />
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}