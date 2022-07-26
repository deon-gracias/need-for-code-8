import Router from 'next/router'
import { Button, Group, Header, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { getToken, logout } from "../../lib/auth";
import { useEffect, useState } from 'react';

export default function CustomHeader() {
    const [token, setToken] = useState(null)

    const handleLogout = () => {
        logout()
        Router.reload(window.location.pathname)
    }

    useEffect(() => {
        setToken(getToken())
    }, [])

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
