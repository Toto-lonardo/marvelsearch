import axios from "axios";
import * as apiInterfaces from "./utils/interface";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Footer from "./shared/Footer";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import PaginationComponent from "./shared/Pagination";

import { useFetchComicsQuery } from "./features/characters/characters-api-slice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { incremented, amountAdded } from "./features/counter/counter-slice";

function App() {
  //esempioRedux

  const { data, isFetching } = useFetchComicsQuery();
  console.log(data?.code);

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  function handleClickCounter() {
    dispatch(amountAdded(3));
  }

  //fineesempio
  const [posts, setPosts] = useState<apiInterfaces.Post | undefined>(undefined);
  const [searchChar, setSearchChar] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const apikey = import.meta.env.VITE_MARVEL_API_KEY;
  const apiurl = import.meta.env.VITE_MARVEL_API;
  // useEffect(() => {
  //   console.log(searchChar);
  //   const getData = setTimeout(() => {
  //     searchChar === ""
  //       ? axios
  //           .get(
  //             `${apiurl}characters?limit=20&offset=${offset}&apikey=${apikey}`,
  //           )
  //           .then((response) => {
  //             console.log(response.data);
  //             setPosts(response.data);
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           })
  //       : axios
  //           .get(
  //             `${apiurl}characters?nameStartsWith=${searchChar}&limit=20&offset=${offset}&apikey=${apikey}`,
  //           )
  //           .then((response) => {
  //             console.log(response.data);
  //             setPosts(response.data);
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           });
  //   }, 2000);
  //   return () => clearTimeout(getData);
  // }, [searchChar, offset]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    // setposts(undefined);
    setSearchChar(e.target.value);
    setOffset(0);
    console.log(offset);

    setCurrentPage(0);
  }
  return (
    <>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col className="my-2">
            <h1 className="text-center display-3">Marvelpedia</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="my-2">
            <h1 className="text-center ">Counter</h1>
            <button onClick={handleClickCounter}>Count: {count}</button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Number of characters fetched: {data?.data.limit}</p>
          </Col>
        </Row>
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
          {data ? (
            <>
              {data?.data?.results?.map((post: apiInterfaces.Result) => {
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
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  posts={data}
                  setPosts={setPosts}
                  setOffset={setOffset}
                />
              )}
              {/* <Row className="justify-content-center p-4 "> */}
              {/*   <Pagination className="col-auto mx-auto"> */}
              {/*     {currentPage !== 0 && ( */}
              {/*       <> */}
              {/*         <Pagination.First onClick={() => handleClick(0)} /> */}
              {/*         <Pagination.Prev */}
              {/*           onClick={() => handleClick(currentPage - 1)} */}
              {/*         /> */}
              {/*       </> */}
              {/*     )} */}
              {/*     {currentPage > 2 ? ( */}
              {/*       <> */}
              {/*         <Pagination.Item onClick={() => handleClick(0)}> */}
              {/*           1 */}
              {/*         </Pagination.Item> */}
              {/*         <Pagination.Ellipsis /> */}
              {/*         {items.slice(currentPage - 1, currentPage + 2)} */}
              {/*         {currentPage < items.length - 2 && ( */}
              {/*           <> */}
              {/*             <Pagination.Ellipsis /> */}
              {/*             {items.slice(items.length - 1)} */}
              {/*           </> */}
              {/*         )} */}
              {/*       </> */}
              {/*     ) : ( */}
              {/*       <> */}
              {/*         {items.slice(0, currentPage + 2)} */}
              {/*         {currentPage < items.length - 2 && ( */}
              {/*           <> */}
              {/*             <Pagination.Ellipsis /> */}
              {/*             {items.slice(items.length - 1)} */}
              {/*           </> */}
              {/*         )} */}
              {/*       </> */}
              {/*     )} */}
              {/*     {currentPage != items.length - 1 && ( */}
              {/*       <> */}
              {/*         <Pagination.Next */}
              {/*           onClick={() => handleClick(currentPage + 1)} */}
              {/*         /> */}
              {/*         {currentPage !== items.length && ( */}
              {/*           <Pagination.Last */}
              {/*             onClick={() => handleClick(items.length - 1)} */}
              {/*           /> */}
              {/*         )} */}
              {/*       </> */}
              {/*     )} */}
              {/*   </Pagination> */}
              {data?.data?.count == 0 && (
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
