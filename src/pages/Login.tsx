import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";

export default function LoginPage() {
  const form = useForm({
    mode: "controlled",
    initialValues: { email: "", password: "" },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log(values);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">D-tree Impact Data</Title>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            ta="start"
            required
            radius="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            ta="start"
            required
            mt="md"
            radius="md"
            {...form.getInputProps("password")}
          />

          <Button fullWidth mt="xl" radius="md" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
