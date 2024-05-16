import { useParams } from "react-router-dom";
import { HeaderComp } from "../../../shared/HeaderComp";
import { useFetchComicsCharacterByIdQuery } from "../../characters/characters-api-slice";
import Footer from "../../../shared/Footer";
import * as charApiInterfaces from "../../../utils/charInterface";
import * as comicApiInterfaces from "../../../utils/comicInterface";
import { Col, Card, Button, Image } from "react-bootstrap";
import { store } from "../../../app/store";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const convertID = Number(id);
  const { data, isFetching } = useFetchComicsCharacterByIdQuery(convertID);
  console.log(data);
  return (
    <>
      <HeaderComp />
      <h1>{store.getState().char.name}</h1>
      <h3>{store.getState().char.description}</h3>
      <Image src={store.getState().char.image} width={200} />
      {data?.data.results.map((comic: comicApiInterfaces.Result) => {
        return (
          <Col key={comic.id}>
            <pre>{comic.title}</pre>
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
