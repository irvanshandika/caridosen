import React from "react";
import { Helmet } from "react-helmet";
import { BackgroundImage, Center, Text, Box, Container, SimpleGrid, Title } from "@mantine/core";
import teamMembers, { TeamMember } from "@src/data/TeamData";

const OurTeam: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>WillPower Team | CariDosen</title>
      </Helmet>
      <Container size="lg" py="xl" my="100px" style={{ minHeight: "100vh" }}>
        <Box mb="xl" style={{ textAlign: "center" }}>
          <Title order={2} mb="sm">
            WillPower Team
          </Title>
          <Text color="dimmed" size="sm">
            Ayo Berkenalan Dengan Orang-Orang Keren Pembuat <span className="text-blue-500 font-bold underline-offset-2 underline decoration-solid decoration-blue-400">CariDosen</span>
          </Text>
        </Box>
        <SimpleGrid cols={2} spacing="lg">
          {teamMembers.map((member: TeamMember, index: number) => (
            <Box key={index} style={{ textAlign: "center" }}>
              <BackgroundImage src={member.imgSrc} radius="xl" style={{ width: 120, height: 120, margin: "0 auto", backgroundColor: member.imgSrc ? "transparent" : "#1a1b1e" }}>
                {!member.imgSrc && (
                  <Center style={{ height: "100%" }}>
                    <Text size="xl" style={{ color: "white", textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)" }}>
                      {member.name.charAt(0)}
                    </Text>
                  </Center>
                )}
              </BackgroundImage>
              <Text mt="md" size="lg">
                {member.name}
              </Text>
              <Text size="sm" color="dimmed">
                {member.role}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default OurTeam;
