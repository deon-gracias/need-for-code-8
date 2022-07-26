import Router from 'next/router'
import { Button, Group, Header, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { getToken, logout } from "../../lib/auth";

export default function CustomHeader() {
    const token = getToken();

    const handleLogout = () => {
        logout()
        Router.reload(window.location.pathname)
    }

    return <Header height={55} p="xs">
        <Group sx={{ height: "100%" }} px={10} position="apart">
            <Text size="md" weight={600}>E-Commerce</Text>
            {token ?
                <Group>
                    <Button leftIcon={<IconLogout />} onClick={() => handleLogout()}>Logout</Button>
                    <Button component='a' href='/cart'>Cart</Button>
                </Group> : null}
        </Group>
    </Header>;
}
