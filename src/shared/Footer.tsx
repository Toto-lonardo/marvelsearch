import { Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <Row className="bg-danger ">
      <Col>
        <p className="text-center my-2 text-white">
          Copyright © {new Date().getFullYear()} MARVEL
        </p>
      </Col>
    </Row>
  );
}
