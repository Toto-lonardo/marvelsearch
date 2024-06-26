import { Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <Row className="bg-danger mt-4 ">
      <Col>
        <p className="text-center my-2 text-white">
          Copyright © {new Date().getFullYear()} MARVEL
          <br />
          <a
            href="http://marvel.com"
            className="text-white text-center text-decoration-none"
          >
            Data provided by Marvel. © 2024 MARVEL
          </a>
        </p>
      </Col>
    </Row>
  );
}
