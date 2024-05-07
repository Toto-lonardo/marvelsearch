import * as apiInterfaces from "./utils/interface";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Footer from "./shared/Footer";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
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

  const [searchChar, setSearchChar] = useState("");
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
    // setposts(undefined);
    setSearchChar(e.target.value);
    setOffset(0);
    console.log(offset);

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
            <h1 className="text-center display-3">Marvelpedia</h1>
          </Col>
        </Row>
        {/* <Row className="justify-content-md-center"> */}
        {/*   <Col className="my-2"> */}
        {/*     <h1 className="text-center ">Counter</h1> */}
        {/*     <button onClick={handleClickCounter}>Count: {count}</button> */}
        {/*   </Col> */}
        {/* </Row> */}
        <Row className="justify-content-center ">
          <Col lg="2" className="">
            <form className="col-md-3 mx-auto">
              <input
                className="justify-content-center"
                name="SearchCharacter"
                type="text"
                placeholder="Search Marvel character"
                value={searchChar}
                onChange={handleInput}
              />
            </form>
          </Col>
          <Row className="my-4">
            <hr />
          </Row>
        </Row>
        <Row className="justify-content-center ">
          {data && !isFetching ? (
            <>
              <Row>
                <p className="text-center">
                  Number of characters : {data.data.total}
                </p>
              </Row>
              {data.data.results.map((post: apiInterfaces.Result) => {
                return (
                  <Col key={post.id} className="my-2 col-auto ">
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={`${post?.thumbnail?.path}.${post?.thumbnail?.extension}`}
                      />
                      <Card.Body className="card">
                        <Card.Title className="h2">{post.name}</Card.Title>
                        <Card.Text className="longtext">
                          {post.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
              {data.data.count > 1 && (
                <PaginationComponent
                  posts={data}
                  handleClick={handleClick}
                  currentPage={currentPage}
                />
              )}
              {data.data.count == 0 && (
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
