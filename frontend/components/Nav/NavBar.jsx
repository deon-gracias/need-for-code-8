import { Button, Navbar, Group } from "@mantine/core";
import { IconHeadphones, IconDeviceMobile, IconBallFootball, IconHome2, IconGrill, IconUser } from "@tabler/icons"
import { useEffect, useState } from "react";
import { getToken } from "../../lib/auth";
import NavLink from "./NavLink";


const links = [
    { color: 'blue', icon: <IconHeadphones />, label: "Musical Instruments" },
    { color: 'blue', icon: <IconDeviceMobile />, label: "Cellphones & Accessories" },
    { color: 'blue', icon: <IconBallFootball />, label: "Sports & Outdoors" },
    { color: 'blue', icon: <IconGrill />, label: "Grocery & Gourmet Food" },
    { color: 'blue', icon: <IconHome2 />, label: "Home & Kitchen" },
]

export default function NavBar() {
    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(getToken())
    }, [])

    return <Navbar width={{ base: 250 }}>
        <Navbar.Section p="xs" grow>
            {links.map((link, index) => <NavLink key={index} color={link.color} icon={link.icon} label={link.label} />)}
        </Navbar.Section>
        <Navbar.Section p="xs" >
            {token ?
                <NavLink color="red" icon={<IconUser />} label="Profile" /> :
                <Group spacing='xs'>
                    <Button component="a" href="/signin" color="red" fullWidth>Sign In</Button>
                    <Button component="a" href="/signup" fullWidth>Sign Up</Button>
                </Group>}
        </Navbar.Section>
    </Navbar >;
}