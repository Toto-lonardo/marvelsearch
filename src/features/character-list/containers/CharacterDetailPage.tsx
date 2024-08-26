import { Link, useParams } from "react-router-dom";
import { HeaderComp } from "../../../shared/HeaderComp";
import { useFetchComicsCharacterByIdQuery } from "../../characters/characters-api-slice";
import Footer from "../../../shared/Footer";
import * as comicApiInterfaces from "../../../utils/comicInterface";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import PaginationComponent from "../../../shared/Pagination";
import { useState } from "react";
import HeaderCharPage from "../components/HeaderCharPage";

export default function CharacterDetailPage() {
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { id } = useParams();
  const comicId = Number(id);
  const { data, isFetching } = useFetchComicsCharacterByIdQuery({
    comicId,
    offset,
  });

  function handleClick(number: number) {
    if (number != currentPage) {
      setCurrentPage(number);
      const limitPost = Number(data?.data.limit);
      setOffset(number * limitPost);
      return number;
    } else {
      return;
    }
  }

  return (
    <>
      <HeaderComp />
      <HeaderCharPage />
      <Row className="">
        <h2 className="text-center py-2 border-bottom border-2 border-danger">
          Comics
        </h2>
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
