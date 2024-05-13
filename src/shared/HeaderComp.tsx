import { Row, Col } from "react-bootstrap";
export const HeaderComp = (props: {}) => {
  return (
    <Row className="justify-content-md-center bg-danger">
      <Col className="my-2 ">
        <h1 className="text-center fw-bold text-white display-4">
          <a href="/" className="text-white text-decoration-none">
            MARVEL<span className="fw-light">PEDIA</span>
          </a>
        </h1>
      </Col>
    </Row>
  );
};
