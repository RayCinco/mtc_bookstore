import { useState } from "react";
import {
  Group,
  Button,
  Text,
  Container,
  Burger,
  ActionIcon,
  Avatar,
  Menu,
  Drawer,
  Stack,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconHome,
  IconUsers,
  IconUser,
  IconSettings,
  IconLogout,
  IconShare,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

function TopNav() {
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/home", icon: IconHome },
    { label: "Community", path: "/community", icon: IconUsers },
    { label: "Profile", path: "/profile", icon: IconUser },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "70px",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 1000,
          padding: "0 16px",
        }}
      >
        <Container size="xl" style={{ height: "100%" }}>
          <Group justify="space-between" style={{ height: "100%" }}>
            {/* Logo and Website Name */}
            <Group spacing="sm">
              <ActionIcon
                size={40}
                radius="md"
                style={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  color: "white",
                }}
              >
                <IconShare size={24} />
              </ActionIcon>
              <Text
                size="xl"
                fw={700}
                style={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                E-Share
              </Text>
            </Group>

            {/* Desktop Navigation */}
            <Group spacing="xs" visibleFrom="sm">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    variant={isActivePath(item.path) ? "light" : "subtle"}
                    color={isActivePath(item.path) ? "blue" : "gray"}
                    leftSection={<Icon size={16} />}
                    size="sm"
                    style={{
                      fontWeight: isActivePath(item.path) ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Group>

            {/* Profile Menu */}
            <Group spacing="sm">
              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <ActionIcon
                    size={36}
                    radius="xl"
                    style={{
                      border: "2px solid rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    <Avatar size={32} radius="xl" color="blue">
                      JD
                    </Avatar>
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconUser style={{ width: rem(14), height: rem(14) }} />
                    }
                    component={Link}
                    to="/profile"
                  >
                    Your Profile
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Settings
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconLogout style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {/* Mobile Burger */}
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
            </Group>
          </Group>
        </Container>
      </header>

      {/* Mobile Navigation Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        padding="md"
        title={
          <Group spacing="sm">
            <ActionIcon
              size={32}
              radius="md"
              style={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                color: "white",
              }}
            >
              <IconShare size={18} />
            </ActionIcon>
            <Text size="lg" fw={600}>
              E-Share
            </Text>
          </Group>
        }
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Stack spacing="sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                variant={isActivePath(item.path) ? "light" : "subtle"}
                color={isActivePath(item.path) ? "blue" : "gray"}
                leftSection={<Icon size={16} />}
                fullWidth
                justify="flex-start"
                onClick={close}
                style={{
                  fontWeight: isActivePath(item.path) ? 600 : 400,
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Stack>
      </Drawer>
    </>
  );
}

export default TopNav;
