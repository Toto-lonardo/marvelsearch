import { Link, useParams } from "react-router-dom";
import { HeaderComp } from "../../../shared/HeaderComp";
import { useFetchComicsCharacterByIdQuery } from "../../characters/characters-api-slice";
import Footer from "../../../shared/Footer";
import * as comicApiInterfaces from "../../../utils/comicInterface";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { store } from "../../../app/store";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import PaginationComponent from "../../../shared/Pagination";
import { useState } from "react";

export default function CharacterDetailPage() {
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { id } = useParams();
  const comicId = Number(id);
  const { data, isFetching } = useFetchComicsCharacterByIdQuery({
    comicId,
    offset,
  });
  console.log(data);

  function comicHandleClick(comicId: number) {
    console.log(comicId);
  }

  function handleClick(number: number) {
    if (number != currentPage) {
      setCurrentPage(number);
      let limitPost = Number(data?.data.limit);
      setOffset(number * limitPost);
      return number;
    } else {
      return;
    }
  }

  return (
    <>
      <HeaderComp />
      <Row className="p-4 m-4 ">
        <Col>
          <Image
            src={store.getState().char.image}
            className="img-fluid shadow "
            width={800}
            thumbnail
          />
        </Col>
        <Stack className="col-md-4 m-auto ">
          <h1 className="py-2 border-bottom border-2 border-danger">
            {store.getState().char.name}
          </h1>
          <p className="mt-2 text-secondary">
            {store.getState().char.description}
          </p>
        </Stack>
      </Row>
      {!isFetching ? (
        <>
          <Row className="d-flex justify-content-center">
            {data?.data.results.map((comic: comicApiInterfaces.Result) => {
              return (
                <Col
                  key={comic.id}
                  xs={12}
                  md={3}
                  lg={2}
                  className="shadow border danger m-4 d-flex flex-column justify-content-between align-items-center"
                >
                  <Image
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    className="d-block w-100 m-2"
                  />
                  <div className="d-flex justify-content-center align-items-center flex-column mb-2">
                    <h5 style={{}} className="text-center my-2">
                      {comic.title}
                    </h5>
                    <Link to={`/comic/${comic.id}`} className="mx-auto">
                      <Button
                        variant="danger"
                        value={comic.id}
                        className="shadow-sm m-2 rounded"
                        onClick={() => comicHandleClick(comic.id)}
                      >
                        Learn more
                      </Button>
                    </Link>
                  </div>
                </Col>
              );
            })}
          </Row>
          <PaginationComponent
            currentPage={currentPage}
            pages={data?.data}
            handleClick={handleClick}
          />
        </>
      ) : (
        <Row
          style={{ minHeight: "50vh" }}
          className="d-flex justify-content-center align-items-center bg-light bg-gradient"
        >
          <Spinner animation="border" variant="danger"></Spinner>
        </Row>
      )}
      <Footer />
    </>
  );
}
