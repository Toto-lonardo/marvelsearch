import { Row, Col, FloatingLabel, Form } from "react-bootstrap";

type SearchInputProps = {
  input: string;
  handleInput: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchInput = ({ input, handleInput }: SearchInputProps) => {
  return (
    <Row className="justify-content-center g-2 mx-5 mt-4 ">
      <Col lg="4" className="">
        <FloatingLabel
          controlId="charinput"
          label="Search character"
          className="mb-3"
        >
          <Form.Control
            className="justify-content-center col-md-3 mx-auto"
            name="SearchCharacter"
            type="text"
            placeholder="Search Marvel character"
            value={input}
            onChange={handleInput}
          />
        </FloatingLabel>
      </Col>
    </Row>
  );
};

export default SearchInput;
