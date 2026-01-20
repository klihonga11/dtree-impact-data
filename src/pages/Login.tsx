import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const form = useForm({
    mode: "controlled",
    initialValues: { username: "", password: "" },
    validate: {},
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const credentials = btoa(`${values.username}:${values.password}`);

    const response = await fetch("/dhis2/api/me", {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      credentials: "include", // Important: This allows cookies to be set/sent
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    console.log(data);

    navigate("/home", { replace: true });
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">D-tree Impact Data</Title>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            ta="start"
            required
            radius="md"
            {...form.getInputProps("username")}
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
