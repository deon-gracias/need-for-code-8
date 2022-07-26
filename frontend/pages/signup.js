import { useRouter } from 'next/router'
import { useForm } from '@mantine/form'
import { TextInput, Button, PasswordInput, Group, Grid, Text } from '@mantine/core'
import { getToken, signUp } from '../lib/auth';
import { redirect } from 'next/dist/server/api-utils';

export default function Login() {
    const router = useRouter();

    const form = useForm({
        initialValues: { username: '', email: '', password: '' },
        validate: {
            username: (value) => (value.length < 2 ? 'Username Should have at least 2 characters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 4 ? 'Password Should have at least 4 characters' : null)
        }
    })

    function handleForm(e) {
        e.preventDefault();

        signUp(form.values.username, form.values.email, form.values.password);

        if (getToken()) router.push("/")
    }

    return <Group width="100%" p={32} mt={100} position="center">
        <form onSubmit={handleForm}>
            <Grid>
                <Grid.Col>
                    <Text size={30} weight={600}>Sign Up</Text>
                </Grid.Col>
                <Grid.Col>
                    <TextInput label='Username' placeholder='Username' size="lg" {...form.getInputProps('username')} required />
                </Grid.Col>
                <Grid.Col>
                    <TextInput label='Email' placeholder='Email' size="lg" {...form.getInputProps('email')} required />
                </Grid.Col>
                <Grid.Col>
                    <PasswordInput label='Password' placeholder='Password' size="lg" {...form.getInputProps('password')} required />
                </Grid.Col>
                <Grid.Col>
                    <Button type='submit' size="lg" mt='sm'>Sign Up</Button>
                </Grid.Col>
            </Grid>
        </form>
    </Group >
}