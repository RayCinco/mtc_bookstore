import CardSwap, { Card } from "../../ui/CardSwap";
import CardContent from "../../ui/CardContent";
import QuickActions from "./QuickActions";
import { Container, Title, Stack, Grid } from "@mantine/core";
function HomeMain() {
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
      avatar: "assets/Randy.jpg",
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
    <Container size="xl" py="xl">
      <Stack spacing="xl">
        {/* Welcome Header */}
        <Title
          order={1}
          size="h1"
          fw={700}
          c="white"
          style={{
            textAlign: "center",
            fontSize: "3rem",
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to E-Share
        </Title>

        {/* Grid Layout: 2 columns left, 1 column right */}
        <Grid>
          {/* Left side - 2 columns (8/12) */}
          <Grid.Col span={7}>
            <Stack spacing="xl">
              {/* Quick Actions */}
              <QuickActions />

              {/* CardSwap showcasing community members */}
            </Stack>
          </Grid.Col>

          {/* Right side - 1 column (4/12) */}
          <Grid.Col span={5}>
            <div style={{ height: "600px", position: "relative" }}>
              <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={false}
              >
                {people.map((person, index) => (
                  <Card key={index}>
                    <CardContent
                      name={person.name}
                      title={person.title}
                      skills={person.skills}
                      bio={person.bio}
                      stats={person.stats}
                      avatar={person.avatar}
                    />
                  </Card>
                ))}
              </CardSwap>
            </div>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}

export default HomeMain;
