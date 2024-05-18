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
            className="img-fluid  "
            width={800}
            thumbnail
          />
        </Col>
        <Stack className="col-md-4 m-auto ">
          <h1 className="py-2 text-danger border-bottom border-2 border-danger">
            {store.getState().char.name}
          </h1>
          <p className="mt-2">{store.getState().char.description}</p>
        </Stack>
      </Row>
      {data?.data.results.map((comic: comicApiInterfaces.Result) => {
        return (
          <Col key={comic.id}>
            <h3>{comic.title}</h3>
            {comic?.images.map((images: comicApiInterfaces.Image) => {
              return (
                <Image
                  key={images.path}
                  src={`${images.path}.${images.extension}`}
                  width={100}
                />
              );
            })}
            {comic.textObjects.map(
              (textobject: comicApiInterfaces.TextObject) => {
                return <pre key={textobject.text}>{textobject.text}</pre>;
              },
            )}
          </Col>
        );
      })}
      <Footer />
    </>
  );
}
