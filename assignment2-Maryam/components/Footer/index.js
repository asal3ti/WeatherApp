import styles from "./Footer.module.css";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className={styles.footer_spacer} fluid>
      <p>Copyright &copy; 2024 - Maryam</p>
    </Container>
  );
};

export default Footer;
