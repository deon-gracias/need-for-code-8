import { AppShell, Box, Header } from "@mantine/core"
import CustomHeader from "../components/Nav/CustomHeader"
import NavBar from "../components/Nav/NavBar"
import axios from "axios"
import Products from "../components/Products/Products"

export default function Home() {
  return <AppShell
    padding="md"
    navbar={<NavBar />}
    header={<CustomHeader />}
    styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
    })}
  >
    <Products />
  </AppShell>
}
