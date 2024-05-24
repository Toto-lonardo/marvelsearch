import { useParams } from "react-router-dom";
import { HeaderComp } from "../../../shared/HeaderComp";
import { useFetchComicsCharacterByIdQuery } from "../../characters/characters-api-slice";
import Footer from "../../../shared/Footer";
import * as comicApiInterfaces from "../../../utils/comicInterface";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { store } from "../../../app/store";
import Stack from "react-bootstrap/Stack";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import { Accordion } from "react-bootstrap";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const convertID = Number(id);
  const { data, isFetching } = useFetchComicsCharacterByIdQuery(convertID);
  console.log(data);
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
        <Row className="d-flex justify-content-center">
          {data?.data.results.map((comic: comicApiInterfaces.Result) => {
            return (
              <Col
                key={comic.id}
                xs={12}
                md={3}
                lg={2}
                className="shadow border danger w-25 m-4 d-flex flex-column"
              >
                {comic.images.length > 1 ? (
                  <Carousel fade controls={false} className="">
                    {comic?.images.map((images: comicApiInterfaces.Image) => {
                      return (
                        <Carousel.Item className="" key={images.path}>
                          <Image
                            key={images.path}
                            src={`${images.path}.${images.extension}`}
                            className="d-block w-100 "
                          />
                          <Carousel.Caption>
                            {/* <h3>First slide label</h3> */}
                            {/* <p> */}
                            {/*   Nulla vitae elit libero, a pharetra augue mollis */}
                            {/*   interdum. */}
                            {/* </p> */}
                          </Carousel.Caption>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                ) : (
                  comic.images.length === 1 && (
                    <Image
                      src={`${comic.images[0].path}.${comic.images[0].extension}`}
                      className="d-block w-100"
                    />
                  )
                )}
                {comic.textObjects.length > 0 ? (
                  <Accordion className="" flush>
                    <Accordion.Item eventKey="0" className="">
                      <Accordion.Header className="">
                        {comic.title}
                      </Accordion.Header>
                      {comic.textObjects.map(
                        (textobject: comicApiInterfaces.TextObject) => {
                          return (
                            <Accordion.Body key={textobject.text}>
                              {textobject.text}
                            </Accordion.Body>
                          );
                        },
                      )}
                      <Accordion.Body></Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ) : (
                  <>
                    <h5 style={{}} className="text-center my-2">
                      {comic.title}
                    </h5>
                  </>
                )}
              </Col>
            );
          })}
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
