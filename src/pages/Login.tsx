import {
  Button,
  Container,
  Modal,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDisclosure } from "@mantine/hooks";

export default function LoginPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const form = useForm({
    mode: "controlled",
    initialValues: { username: "", password: "" },
    validate: {},
  });

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home/individuals-served", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await login(values.username, values.password);
    } catch (err) {
      const error = err as Error
      setErrorMessage(error.message)
      open();
    }
  };

  return (
    <>
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

    <Modal opened={opened} onClose={close} title="Error" withinPortal={false}>
      {errorMessage}
    </Modal>
    </>
  );
}
