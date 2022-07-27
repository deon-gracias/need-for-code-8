import { AppShell } from "@mantine/core"
import Cart from "../components/Cart/Cart"
import CustomHeader from '../components/Nav/CustomHeader'

export default function CartPage() {
    return <AppShell
        padding="md"
        header={<CustomHeader />}
        styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
    >
        <Cart />
    </AppShell>
}