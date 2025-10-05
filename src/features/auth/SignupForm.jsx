import { useState } from "react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Alert,
  Group,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconMail,
  IconLock,
  IconAlertCircle,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";

function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      firstName: (value) =>
        value.length < 2 ? "First name must have at least 2 characters" : null,
      lastName: (value) =>
        value.length < 2 ? "Last name must have at least 2 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must have at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords don't match" : null,
    },
  });

  function handleSubmit(values) {}

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      style={{
        width: "100%",
        maxWidth: "450px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Stack spacing="lg">
        <Box ta="center">
          <Title order={2} c="white" mb="xs">
            Join E-Share
          </Title>
          <Text c="rgba(255, 255, 255, 0.8)" size="sm">
            Create your account to get started
          </Text>
        </Box>

        {error && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Signup Failed"
            color="red"
            variant="light"
          >
            {error}
          </Alert>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="md">
            <Group grow>
              <TextInput
                label="First Name"
                placeholder="John"
                leftSection={<IconUser size="1rem" />}
                required
                styles={{
                  label: { color: "white" },
                  input: {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "white",
                    "&::placeholder": { color: "rgba(255, 255, 255, 0.6)" },
                  },
                }}
                {...form.getInputProps("firstName")}
              />

              <TextInput
                label="Last Name"
                placeholder="Doe"
                leftSection={<IconUser size="1rem" />}
                required
                styles={{
                  label: { color: "white" },
                  input: {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "white",
                    "&::placeholder": { color: "rgba(255, 255, 255, 0.6)" },
                  },
                }}
                {...form.getInputProps("lastName")}
              />
            </Group>

            <TextInput
              label="Email"
              placeholder="your@email.com"
              leftSection={<IconMail size="1rem" />}
              required
              styles={{
                label: { color: "white" },
                input: {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  "&::placeholder": { color: "rgba(255, 255, 255, 0.6)" },
                },
              }}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              leftSection={<IconLock size="1rem" />}
              required
              styles={{
                label: { color: "white" },
                input: {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  "&::placeholder": { color: "rgba(255, 255, 255, 0.6)" },
                },
              }}
              {...form.getInputProps("password")}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              leftSection={<IconLock size="1rem" />}
              required
              styles={{
                label: { color: "white" },
                input: {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  "&::placeholder": { color: "rgba(255, 255, 255, 0.6)" },
                },
              }}
              {...form.getInputProps("confirmPassword")}
            />

            <Button
              type="submit"
              fullWidth
              mt="md"
              size="md"
              loading={isLoading}
              style={{
                background:
                  "linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              Create Account
            </Button>
          </Stack>
        </form>

        <Text ta="center" c="rgba(255, 255, 255, 0.8)" size="sm">
          Already have an account?{" "}
          <Anchor size="sm" href="/login" c="rgba(255, 255, 255, 0.9)">
            Login
          </Anchor>
        </Text>
      </Stack>
    </Paper>
  );
}

export default SignupForm;
