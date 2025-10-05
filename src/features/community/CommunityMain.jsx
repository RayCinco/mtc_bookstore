import CardContent from "../../ui/CardContent";
import { Container, Title, TextInput, Grid, Stack } from "@mantine/core";

import { IconSearch } from "@tabler/icons-react";

function CommunityMain() {
  const people = [
    {
      name: "Denzel Washington",
      title: "Frontend Developer",
      skills: ["React", "JavaScript", "CSS Modules", "Vite"],
      bio: "A passionate frontend developer who loves building sleek and fast web apps.",
      stats: {
        projects: 12,
        followers: 230,
        experience: "2 years",
      },
      avatar: "assets/Harry.jpg",
    },
    {
      name: "Daryl Gwardiyana",
      title: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "Sketch", "Wireframing"],
      bio: "Creative designer focused on crafting user-friendly and visually appealing interfaces.",
      stats: {
        projects: 18,
        followers: 540,
        experience: "3 years",
      },
    },
    {
      name: "Randy Llandres",
      title: "Full Stack Engineer",
      skills: ["Node.js", "Express", "React", "MongoDB"],
      bio: "Engineer who enjoys bridging frontend and backend systems with efficient APIs.",
      stats: {
        projects: 25,
        followers: 1200,
        experience: "5 years",
      },
    },
  ];

  return (
    <div>
      <h1>Community Showcase</h1>
      <main>
        return (
        <Container size="xl" py="xl">
          <Stack spacing="xl">
            {/* Header */}
            <Title order={1} size="h1" fw={600} c="white">
              Community Showcase
            </Title>

            {/* Search Bar */}
            <TextInput
              placeholder="Search projects..."
              size="md"
              leftSection={<IconSearch size={18} />}
              styles={{
                input: {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&::placeholder": { color: "rgba(255, 255, 255, 0.6)" },
                },
              }}
            />

            {/* Cards Grid */}
            <Grid>
              {people.map((person, index) => (
                <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                  <CardContent
                    name={person.name}
                    title={person.title}
                    skills={person.skills}
                    bio={person.bio}
                    stats={person.stats}
                    avatar={person.avatar}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Container>
        );
      </main>
    </div>
  );
}

export default CommunityMain;
