import { Container, Group, Anchor, Text } from "@mantine/core";
import classes from "./FooterSimple.module.css";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

function Footer() {
  const years = new Date().getFullYear();
  const items = links.map((link) => (
    <Anchor<"a"> c="dimmed" key={link.label} href={link.link} onClick={(event) => event.preventDefault()} size="sm">
      {link.label}
    </Anchor>
  ));
  return (
    <>
      <footer className="border-t-2 border-[#1E96FC]">
        <Container className={classes.inner}>
          <img src="https://res.cloudinary.com/dszhlpm81/image/upload/v1711041098/assets/caridosen/logo_nf7fd1.png" className="w-[70px] h-[46px]" alt="CariDosen Logo" fetchPriority="low" />
          <Text className={classes.text}>
            &copy; <span className="font-qualcomm">{years}</span> WillPower Team
          </Text>
          <Group className={classes.links}>{items}</Group>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
