import * as apiInterfaces from "./utils/interface";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Footer from "./shared/Footer";
import "./App.css";

import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import PaginationComponent from "./shared/Pagination";

import {
  useFetchCharactersBySearchQuery,
  useFetchCharactersQuery,
} from "./features/characters/characters-api-slice";
// import { useAppDispatch, useAppSelector } from "./app/hooks";
// import { amountAdded } from "./features/counter/counter-slice";
// import { current } from "@reduxjs/toolkit";

function App() {
  //esempioRedux

  const [input, setInput] = useState("");
  const [searchChar, setSearchChar] = useDebounce(input, 500);
  const [offset, setOffset] = useState(0);
  const { data, isFetching } =
    searchChar == ""
      ? useFetchCharactersQuery(offset)
      : useFetchCharactersBySearchQuery({
          searchChar: searchChar,
          offset: offset,
        });
  console.log(data);

  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();
  // function handleClickCounter() {
  //   dispatch(amountAdded(3));
  // }

  //fineesempio
  const [currentPage, setCurrentPage] = useState(0);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    setOffset(0);
    setCurrentPage(0);
  }

  function handleClick(number: number) {
    if (number != currentPage) {
      setCurrentPage(number);
      let limitPost = Number(data?.data?.limit);
      console.log("Limit data:", data?.data.limit);
      console.log("Number:", number);
      setOffset(number * limitPost);
      return number;
    } else {
      return;
    }
  }
  return (
    <>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col className="my-2">
            <h1 className="text-center text-danger display-3">Marvelpedia</h1>
          </Col>
        </Row>
        {/* <Row className="justify-content-md-center"> */}
        {/*   <Col className="my-2"> */}
        {/*     <h1 className="text-center ">Counter</h1> */}
        {/*     <button onClick={handleClickCounter}>Count: {count}</button> */}
        {/*   </Col> */}
        {/* </Row> */}
        <Row className="justify-content-center g-2 mx-5 ">
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
          <Row className="mt-4">
            <hr />
          </Row>
        </Row>
        <Row className="justify-content-center ">
          {data && !isFetching ? (
            <>
              <Row className="my-4">
                <small className="text-center ">
                  Number of characters : {data.data.total}
                </small>
              </Row>
              {data.data.results.map((character: apiInterfaces.Result) => {
                return (
                  <Col key={character.id} className="my-2 col-auto ">
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                      />
                      <Card.Body className="card">
                        <Card.Title className="h2">{character.name}</Card.Title>
                        <Card.Text className="longtext">
                          {character.description}
                        </Card.Text>
                        <Button variant="primary">More info</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
              {data.data.total > data.data.limit && (
                <PaginationComponent
                  pages={data}
                  handleClick={handleClick}
                  currentPage={currentPage}
                />
              )}
              {data.data.total === 0 && (
                <Row className="">
                  <h2 className="text-center ">No results</h2>
                </Row>
              )}
            </>
          ) : (
            <Row className="d-flex justify-content-center align-items-center min-vh-100">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Row>
          )}
        </Row>
        <Footer />
      </Container>
    </>
  );
}

export default App;
