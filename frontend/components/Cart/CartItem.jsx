import { Card, Image, Button, Text, Group } from "@mantine/core"

export default function CartItem(id, name, price, quantity, image) {
    return <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
            <Image
                src={image}
                height={200}
                alt={name}
                withPlaceholder
            />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>
                {name}
            </Text>
        </Group>


        <Button onClick={() => { addToCart(id) }} variant="light" color="blue" fullWidth mt="md" radius="md">
            Add to Cart
        </Button>
    </Card>
}