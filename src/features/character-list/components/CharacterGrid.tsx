import { Row, Col, Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import * as apiInterfaces from "../../../utils/charInterface";
import PaginationComponent from "../../../shared/Pagination";
import { useAppDispatch } from "../../../app/hooks";
import { store } from "../../../app/store";
import { Link } from "react-router-dom";

type charInfoType = {
  name: string;
  description: string;
  image: string;
};

type CharacterGridsProps = {
  data: apiInterfaces.Data | undefined;
  handleClick: (number: number) => void;
  isFetching: boolean;
  currentPage: number;
};

const CharacterGrid = ({
  data,
  handleClick,
  isFetching,
  currentPage,
}: CharacterGridsProps) => {
  const dispatch = useAppDispatch();
  function saveCharInfo(charInfo: charInfoType) {
    dispatch({ type: "char/save", payload: charInfo });
  }
  function resetCharinfo() {
    dispatch({ type: "char/reset" });
  }

  function charHandleClick(character: number) {
    let charInfo: charInfoType = {
      name: "",
      description: "",
      image: "",
    };
    const filterChar = data?.results.filter((sel) => sel.id === character);
    !filterChar?.length
      ? resetCharinfo()
      : (charInfo = {
          name: filterChar[0].name,
          description: filterChar[0].description,
          image: `${filterChar[0].thumbnail.path}.${filterChar[0].thumbnail.extension}`,
        });
    saveCharInfo(charInfo);
  }
  console.log("Selezionato", store.getState().char);
  return (
    <Row className=" justify-content-center ">
      {data && !isFetching ? (
        <>
          <Row className="my-4">
            <small className="text-center ">
              Number of characters : {data.total}
            </small>
          </Row>
          <Row
            xs={1}
            md={2}
            lg={4}
            className="justify-content-center align-items-center"
          >
            {data.results.map((character: apiInterfaces.Result) => {
              return (
                <Col key={character.id} className="my-2">
                  <Card
                    style={{ width: "18rem", aspectRatio: 2 / 3 }}
                    className="shadow mx-auto "
                  >
                    <Card.Img
                      variant="top"
                      src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                      className="flex-grow-1"
                      style={{ maxHeight: "18rem" }}
                    />
                    <Card.Body className="d-flex flex-column align-items-center justify-content-around">
                      <Card.Title className="border-bottom border-1 border-secondary">
                        {character.name}
                      </Card.Title>
                      <Card.Text
                        className="text-truncate"
                        style={{ maxWidth: "16rem" }}
                      >
                        {character.description}
                      </Card.Text>
                      <Link
                        to={`/character/${character.id}`}
                        className="mx-auto"
                      >
                        <Button
                          variant="danger"
                          value={character.id}
                          className="shadow-sm mt-auto"
                          onClick={() => charHandleClick(character.id)}
                        >
                          Learn more
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          {data.total > data.limit && (
            <PaginationComponent
              pages={data}
              handleClick={handleClick}
              currentPage={currentPage}
            />
          )}
          {data.total === 0 && (
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
  );
};

export default CharacterGrid;
