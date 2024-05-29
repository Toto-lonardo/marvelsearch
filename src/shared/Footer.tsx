import { Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <Row className="bg-danger mt-4 ">
      <Col>
        <p className="text-center my text-white">
          Copyright © {new Date().getFullYear()} MARVEL
        </p>
      </Col>
    </Row>
  );
}
