import { AppShell, Header } from "@mantine/core"
import CustomHeader from "../components/Nav/CustomHeader"
import NavBar from "../components/Nav/NavBar"
import axios from "axios"

export default function Home() {
  axios.get("http://localhost:5000/users").then((res) => {
    console.log(res.data)
  }).catch(err => console.log(err))
  return <AppShell
    padding="md"
    navbar={<NavBar />}
    header={<CustomHeader />}
    styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
    })}
  >
    Your Application
  </AppShell>
}
