import { useEffect, useState } from "react";
import { UnstyledButton, Group, Avatar, Box, Text, useMantineTheme } from "@mantine/core"
import { IconChevronRight } from "@tabler/icons"
import { getUser } from "../../lib/auth";

export default function User() {
    const theme = useMantineTheme();

    const [user, setUser] = useState({});

    useEffect(() => {
        console.log(user)
    }, [user])

    return <Box
        sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        }}
    >
        <UnstyledButton
            onClick={() => setUser(getUser())}
            sx={{
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                },
            }}
        >
            <Group>
                <Avatar radius="xl" />
                <Box sx={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        Username
                    </Text>
                    <Text color="dimmed" size="xs">
                        username@mg
                    </Text>
                </Box>

                {theme.dir === 'ltr' ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
            </Group>
        </UnstyledButton>
    </Box>
}