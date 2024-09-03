import { useFetchCharacterByIdQuery } from "../../characters/characters-api-slice";
import { store } from "../../../app/store";
import { Row, Col, Stack } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import { useParams } from "react-router-dom";

const HeaderCharPage = () => {
  const { id } = useParams();
  const convertComicId = Number(id);
  console.log("comicId", convertComicId);
  const { data } = useFetchCharacterByIdQuery(convertComicId);

  const storeId = Number(store.getState().char.id) | 0;
  console.log("storeID", storeId);
  let headerChar = {
    image: "",
    name: "",
    description: "",
  };
  let isFetched = false;
  if (convertComicId === storeId) {
    headerChar = store.getState().char;
  } else {
    if (data) {
      isFetched = true;
    }
  }

  console.log("headerChar", headerChar);
  return (
    <Row className="p-4 m-4 ">
      {!isFetched && headerChar && (
        <>
          <Col>
            <Image
              src={headerChar?.image}
              className="img-fluid shadow "
              width={800}
              thumbnail
            />
          </Col>
          <Stack className="col-md-4 m-auto ">
            <h1 className="py-2 border-bottom border-danger">
              {headerChar.name}
            </h1>
            <p className="mt-2 text-secondary">{headerChar.description}</p>
          </Stack>
        </>
      )}
      {isFetched && (
        <>
          <Col>
            <Image
              src={`${data?.data.results[0].thumbnail.path}.${data?.data.results[0].thumbnail.extension}`}
              className="img-fluid shadow "
              width={800}
              thumbnail
            />
          </Col>
          <Stack className="col-md-4 m-auto ">
            <h1 className="py-2 border-bottom border-danger">
              {data?.data.results[0].name}
            </h1>
            <p className="mt-2 text-secondary">
              {data?.data.results[0].description}
            </p>
          </Stack>
        </>
      )}
    </Row>
  );
};
export default HeaderCharPage;
