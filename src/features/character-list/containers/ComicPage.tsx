import { useParams } from "react-router-dom";
import { HeaderComp } from "../../../shared/HeaderComp";
import { useFetchComicByIdQuery } from "../../characters/characters-api-slice";
import Footer from "../../../shared/Footer";
import * as comicApiInterfaces from "../../../utils/comicInterface";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import Heading from "../../../shared/Heading";
import ConvertData from "../../../utils/convertData";

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
        <>
          <Row className="d-flex justify-content-center">
            <Heading title="INFO" />
            <Col className=" m-2 d-flex flex-column justify-content-start align-items-start">
              <h3>Authors</h3>
              {comic?.creators.items.map(
                (creator: comicApiInterfaces.CreatorItem) => {
                  return (
                    <div key={creator.name}>
                      <p className="text-capitalize">
                        {creator.role}:{" "}
                        <span className="fw-bold">{creator.name}</span>
                      </p>
                      {/* <a href={`creator.resourceURI`}>More Info</a> */}
                    </div>
                  );
                },
              )}
            </Col>
            <Col className=" m-2 d-flex flex-column justify-content-start align-items-start">
              <h3>Characters</h3>
              {comic?.characters.items.map(
                (character: comicApiInterfaces.CharItem) => {
                  return (
                    <p key={character.name} className="fw-bold">
                      {character.name}
                    </p>
                  );
                },
              )}
            </Col>
            <Col className="m-2 d-flex flex-column justify-content-start align-items-start">
              <h3>General</h3>
              <p>
                Pages: <span className="fw-bold">{comic?.pageCount}</span>
              </p>
              {comic?.dates.map(
                (comicdates: comicApiInterfaces.Date, index: number) => {
                  return (
                    <div key={index}>
                      <p className="text-capitalize">
                        {` ${comicdates.type} : `}{" "}
                        <span className="fw-bold">
                          <ConvertData inputdate={comicdates.date} />
                        </span>
                      </p>
                    </div>
                  );
                },
              )}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center align-items-center flex-wrap flex-lg-nowrap">
              {comic?.urls.map((comicurls: comicApiInterfaces.Url) => {
                return (
                  <a
                    key={comicurls.url}
                    href={comicurls.url}
                    className="text-danger text-capitalize fw-bold m-2"
                  >
                    <Button
                      variant="danger"
                      size="lg"
                      className="text-capitalize  "
                    >
                      {comicurls.type}
                    </Button>
                  </a>
                );
              })}
            </Col>
          </Row>
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
