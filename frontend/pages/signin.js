import { useForm } from '@mantine/form'
import { TextInput, Button, PasswordInput, Group, Grid, Text } from '@mantine/core'
import { signIn, getToken } from '../lib/auth'
import { useRouter } from 'next/router'

export default function SignIn() {
    const router = useRouter();

    const form = useForm({
        initialValues: { email: '', password: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 4 ? 'Password Should have at least 4 characters' : null)
        }
    })

    function handleForm(e) {
        e.preventDefault()

        signIn(form.values.email, form.values.password);

        if (getToken()) router.push("/")
    }

    return <Group width="100%" p={32} mt={100} position="center">
        <form onSubmit={(e) => { handleForm(e) }}>
            <Grid>
                <Grid.Col>
                    <Text size={30} weight={600}>Sign In</Text>
                </Grid.Col>
                <Grid.Col>
                    <TextInput label='Email' placeholder='Email' size="lg" {...form.getInputProps('email')} required />
                </Grid.Col>
                <Grid.Col>
                    <PasswordInput label='Password' placeholder='Password' size="lg" {...form.getInputProps('password')} required />
                </Grid.Col>
                <Grid.Col>
                    <Button fullWidth type='submit' size="lg" mt='sm'>Sign In</Button>
                </Grid.Col>
            </Grid>
        </form>
    </Group >
}