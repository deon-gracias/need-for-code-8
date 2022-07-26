import { Card, Image, Text, Badge, Button, Group, Autocomplete } from '@mantine/core';

function ProductCard({ id, name, image }) {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
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


            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Add to Cart
            </Button>
        </Card>
    );
}

export default ProductCard;