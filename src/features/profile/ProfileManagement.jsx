import React, { useState } from "react";
import {
  Card,
  Stack,
  TextInput,
  Textarea,
  Button,
  Group,
  Title,
  Grid,
  Box,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import ProfileCard from "../../ui/ProfileCard";

function ProfileManagement() {
  const [certifications, setCertifications] = useState([]);
  const [portfolioLink, setPortfolioLink] = useState(
    "https://e-share.com/user/johndoe"
  );
  const form = useForm({
    initialValues: {
      name: "",
      bio: "",
      skills: "",
      contact: "",
    },
    validate: {
      name: (value) => (value.length < 2 ? "Name too short" : null),
    },
  });

  // Certification add handler (mock)
  const handleAddCertification = () => {
    setCertifications((prev) => [
      ...prev,
      { name: `Certification #${prev.length + 1}` },
    ]);
  };

  // Glassmorphism card style
  const cardStyle = {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow:
      "0 4px 32px 0 rgba(0,0,0,0.25), 0 1.5px 6px 0 rgba(255,255,255,0.08)",
    color: "#fff",
  };

  return (
    <Box style={{ background: "#000000", minHeight: "100vh", padding: "32px" }}>
      <Title
        order={1}
        mb="lg"
        style={{
          fontWeight: 700,
          textAlign: "center",
          color: "#fff",
          textShadow: "0 2px 8px #0006",
        }}
      >
        Profile Management
      </Title>
      <Grid gutter={32} mb={32}>
        <Grid.Col span={3}>
          <ProfileCard
            name="Denzel Washington"
            title="Software Engineer"
            handle="javicodes"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/assets/Randy.jpg"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => console.log("Contact clicked")}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Card
            shadow="md"
            radius="md"
            p="xl"
            style={{ ...cardStyle, minHeight: 400 }}
          >
            <Title order={3} mb="md" style={{ color: "#fff" }}>
              Personal Information
            </Title>
            <form
              onSubmit={form.onSubmit((values) => alert("Profile updated!"))}
            >
              <Stack>
                <TextInput
                  label="Full Name"
                  placeholder=""
                  {...form.getInputProps("name")}
                  required
                  styles={{
                    input: {
                      background: "rgba(255,255,255,0.12)",
                      color: "#fff",
                    },
                    label: { color: "#fff" },
                  }}
                />
                <Textarea
                  label="Bio"
                  placeholder="Tell us about yourself..."
                  autosize
                  minRows={3}
                  {...form.getInputProps("bio")}
                  styles={{
                    input: {
                      background: "rgba(255,255,255,0.12)",
                      color: "#fff",
                    },
                    label: { color: "#fff" },
                  }}
                />
                <TextInput
                  label="Skills (comma-separated)"
                  placeholder="JavaScript, Python, Machine Learning..."
                  {...form.getInputProps("skills")}
                  styles={{
                    input: {
                      background: "rgba(255,255,255,0.12)",
                      color: "#fff",
                    },
                    label: { color: "#fff" },
                  }}
                />
                <TextInput
                  label="Contact Information"
                  placeholder="LinkedIn, GitHub, etc."
                  {...form.getInputProps("contact")}
                  styles={{
                    input: {
                      background: "rgba(255,255,255,0.12)",
                      color: "#fff",
                    },
                    label: { color: "#fff" },
                  }}
                />
                <Group position="right" mt="md">
                  <Button
                    type="submit"
                    color="indigo"
                    style={{ color: "#fff" }}
                  >
                    Update Profile
                  </Button>
                </Group>
              </Stack>
            </form>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card
            shadow="md"
            radius="md"
            p="xl"
            style={{ ...cardStyle, minHeight: 400 }}
          >
            <Title order={3} mb="md" style={{ color: "#fff" }}>
              Certifications
            </Title>
            <Button
              color="green"
              mb="md"
              onClick={handleAddCertification}
              style={{ color: "#fff" }}
            >
              + Add Certification
            </Button>
            {certifications.length === 0 ? (
              <Text color="dimmed" style={{ color: "#fff", opacity: 0.7 }}>
                No certifications added yet.
              </Text>
            ) : (
              <Stack spacing="xs">
                {certifications.map((cert, idx) => (
                  <Card
                    key={idx}
                    shadow="xs"
                    radius="sm"
                    p="sm"
                    style={cardStyle}
                  >
                    <Text style={{ color: "#fff" }}>{cert.name}</Text>
                  </Card>
                ))}
              </Stack>
            )}
          </Card>
        </Grid.Col>
      </Grid>
      <Card
        shadow="md"
        radius="md"
        p="xl"
        style={{ ...cardStyle, maxWidth: 900, margin: "0 auto" }}
      >
        <Title order={3} mb="sm" style={{ color: "#fff" }}>
          Portfolio Sharing
        </Title>
        <Text mb="sm" style={{ color: "#fff", opacity: 0.8 }}>
          Share your portfolio with others using the link below:
        </Text>
        <Group>
          <TextInput
            value={portfolioLink}
            readOnly
            style={{ flex: 1 }}
            styles={{
              input: { background: "rgba(255,255,255,0.12)", color: "#fff" },
            }}
          />
          <Button
            color="indigo"
            style={{ color: "#fff" }}
            onClick={() => navigator.clipboard.writeText(portfolioLink)}
          >
            Copy Link
          </Button>
        </Group>
      </Card>
    </Box>
  );
}

export default ProfileManagement;
