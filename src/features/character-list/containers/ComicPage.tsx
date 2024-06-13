import { Link, useParams } from "react-router-dom";
import { HeaderComp } from "../../../shared/HeaderComp";
import {
  useFetchComicByIdQuery,
  useFetchComicsCharacterByIdQuery,
} from "../../characters/characters-api-slice";
import Footer from "../../../shared/Footer";
import * as comicApiInterfaces from "../../../utils/comicInterface";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";

export default function ComicPage() {
  const { id } = useParams();
  const convertID = Number(id);
  const { data, isFetching } = useFetchComicByIdQuery(convertID);
  const comic = data?.data.results[0];
  console.log(data);

  return (
    <>
      <HeaderComp />
      <Row className="p-4 m-4 ">
        <Col>
          <Image
            src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
            className="img-fluid shadow "
            width={800}
            thumbnail
          />
        </Col>
        <Stack className="col-md-4 m-auto ">
          <h1 className="py-2 border-bottom border-2 border-danger">
            {comic?.title}
          </h1>
          <p className="mt-2 text-secondary">{comic?.description}</p>
        </Stack>
      </Row>
      {!isFetching ? (
        <Row className="d-flex justify-content-center">
          <Col className="shadow border danger m-4 d-flex flex-column justify-content-between align-items-center">
            <h3>Authors</h3>
            {comic?.creators.items.map(
              (creator: comicApiInterfaces.CreatorItem) => {
                return (
                  <div key={creator.name}>
                    <p>Name: {creator.name}</p>
                    <p>Role: {creator.role}</p>
                    <a href={`creator.resourceURI`}>More Info</a>
                  </div>
                );
              },
            )}
          </Col>
        </Row>
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
