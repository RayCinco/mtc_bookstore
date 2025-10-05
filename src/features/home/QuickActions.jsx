import { Group, Button, Title, Paper, Stack, ThemeIcon } from "@mantine/core";
import {
  IconPlus,
  IconUsers,
  IconUser,
  IconShare,
  IconHeart,
  IconMessage,
} from "@tabler/icons-react";

function QuickActions() {
  return (
    <Paper
      p="xl"
      radius="lg"
      style={{
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Stack spacing="lg">
        <Title order={2} c="white" ta="center">
          Quick Actions
        </Title>

        <Group justify="center" gap="lg">
          <Button
            leftSection={<IconPlus size={18} />}
            size="lg"
            style={{
              background:
                "linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            Create Post
          </Button>

          <Button
            leftSection={<IconUsers size={18} />}
            size="lg"
            variant="outline"
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            Join Community
          </Button>

          <Button
            leftSection={<IconUser size={18} />}
            size="lg"
            variant="outline"
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            View Profile
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}

export default QuickActions;
