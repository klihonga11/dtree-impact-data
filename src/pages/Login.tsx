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
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const form = useForm({
    mode: "controlled",
    initialValues: { username: "", password: "" },
    validate: {},
  });

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await login(values.username, values.password);
      navigate("/home", { replace: true });
    } catch (error) {
      console.log("Failed to login", error);
    }
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
