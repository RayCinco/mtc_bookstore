import {
  Paper,
  Avatar,
  Text,
  Group,
  Button,
  Stack,
  Badge,
  Box,
  ThemeIcon,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconCode,
  IconStar,
} from "@tabler/icons-react";

function CardContent({ name, title, skills, bio, stats, avatar }) {
  return (
    <Paper
      p="xl"
      style={{
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        minHeight: "400px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative particles */}
      <Box
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          background:
            "radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: "30px",
          left: "30px",
          width: "40px",
          height: "40px",
          background:
            "radial-gradient(circle, rgba(118, 75, 162, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <Stack align="center" spacing="lg">
        {/* Profile Avatar */}
        <Avatar
          src={avatar}
          size={80}
          radius="xl"
          style={{
            border: "3px solid rgba(255, 255, 255, 0.2)",
            background: avatar
              ? "transparent"
              : "linear-gradient(45deg, #667eea, #764ba2)",
          }}
        >
          {!avatar && (
            <Text size="2xl" fw={700} c="white">
              {name
                ? name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "JD"}
            </Text>
          )}
        </Avatar>

        {/* Name and Title */}
        <Stack align="center" spacing={2}>
          <Text
            size="lg"
            fw={400}
            c="white"
            style={{
              textAlign: "center",
              letterSpacing: "0.5px",
            }}
          >
            {name || "John Doe"}
          </Text>
          <Text
            size="md"
            c="rgba(255, 255, 255, 0.8)"
            style={{
              textAlign: "center",
            }}
          >
            {title || "Full Stack Developer"}
          </Text>
        </Stack>

        {/* Skills/Technologies */}
        <Group justify="center" gap="xs">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <Badge
                key={index}
                variant="light"
                color={
                  index % 3 === 0 ? "blue" : index % 3 === 1 ? "violet" : "cyan"
                }
                style={{
                  backgroundColor:
                    index % 3 === 0
                      ? "rgba(102, 126, 234, 0.2)"
                      : index % 3 === 1
                      ? "rgba(118, 75, 162, 0.2)"
                      : "rgba(34, 139, 139, 0.2)",
                  color: "rgba(255, 255, 255, 0.9)",
                  border:
                    index % 3 === 0
                      ? "1px solid rgba(102, 126, 234, 0.3)"
                      : index % 3 === 1
                      ? "1px solid rgba(118, 75, 162, 0.3)"
                      : "1px solid rgba(34, 139, 139, 0.3)",
                }}
              >
                {skill}
              </Badge>
            ))
          ) : (
            <>
              <Badge
                variant="light"
                color="blue"
                style={{
                  backgroundColor: "rgba(102, 126, 234, 0.2)",
                  color: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(102, 126, 234, 0.3)",
                }}
              >
                React
              </Badge>
              <Badge
                variant="light"
                color="violet"
                style={{
                  backgroundColor: "rgba(118, 75, 162, 0.2)",
                  color: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(118, 75, 162, 0.3)",
                }}
              >
                Node.js
              </Badge>
              <Badge
                variant="light"
                color="cyan"
                style={{
                  backgroundColor: "rgba(34, 139, 139, 0.2)",
                  color: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(34, 139, 139, 0.3)",
                }}
              >
                TypeScript
              </Badge>
            </>
          )}
        </Group>

        {/* Bio */}
        <Text
          size="sm"
          c="rgba(255, 255, 255, 0.7)"
          style={{
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: "280px",
          }}
        >
          {bio ||
            "Passionate developer creating innovative web solutions. Love building user-friendly applications with modern technologies."}
        </Text>

        {/* Stats */}
        <Group justify="center" gap="lg">
          <Stack align="center" spacing={2}>
            <Text size="lg" fw={700} c="white">
              {stats?.projects || 127}
            </Text>
            <Text size="xs" c="rgba(255, 255, 255, 0.6)">
              Projects
            </Text>
          </Stack>
          <Stack align="center" spacing={2}>
            <Text size="lg" fw={700} c="white">
              {stats?.followers || "2.5k"}
            </Text>
            <Text size="xs" c="rgba(255, 255, 255, 0.6)">
              Followers
            </Text>
          </Stack>
          <Stack align="center" spacing={2}>
            <Text size="lg" fw={700} c="white">
              {stats?.likes || 892}
            </Text>
            <Text size="xs" c="rgba(255, 255, 255, 0.6)">
              Likes
            </Text>
          </Stack>
        </Group>
      </Stack>
    </Paper>
  );
}

export default CardContent;
