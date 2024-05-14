import { Row, Col, Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import * as apiInterfaces from "../../../utils/charInterface";
import PaginationComponent from "../../../shared/Pagination";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { store } from "../../../app/store";
import { Link } from "react-router-dom";

type charInfoType = {
  name: string;
  description: string;
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
  const char = useAppSelector((charInfo) => charInfo.char);
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
    };
    const filterChar = data?.results.filter((sel) => sel.id === character);
    !filterChar?.length
      ? resetCharinfo()
      : (charInfo = {
          name: filterChar[0].name,
          description: filterChar[0].description,
        });
    saveCharInfo(charInfo);
  }
  console.log("Selezionato", store.getState().char);
  return (
    <Row className="justify-content-center ">
      {data && !isFetching ? (
        <>
          <Row className="my-4">
            <small className="text-center ">
              Number of characters : {data.total}
            </small>
          </Row>
          {data.results.map((character: apiInterfaces.Result) => {
            return (
              <Col key={character.id} className="my-2 col-auto ">
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                  />
                  <Card.Body className="card">
                    <Card.Title className="h2">{character.name}</Card.Title>
                    <Card.Text className="longtext">
                      {character.description}
                    </Card.Text>
                    <Link to={`/character/${character.id}`}>
                      <Button
                        variant="primary"
                        value={character.id}
                        onClick={() => charHandleClick(character.id)}
                      >
                        Update Value
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
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
