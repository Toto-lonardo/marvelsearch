import { Row, Col, Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import * as apiInterfaces from "../../../utils/charInterface";
import PaginationComponent from "../../../shared/Pagination";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { current } from "@reduxjs/toolkit";
import charSlice from "../../counter/char-slice";
import { store } from "../../../app/store";

type charInfo = {
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
  const char = useAppSelector((charinfo) => charinfo.char);
  const dispatch = useAppDispatch();
  function saveCharInfo(charinfo) {
    dispatch({ type: "char/save", payload: charinfo });
  }
  let charinfo: charInfo = {
    name: "",
    description: "",
  };

  function charHandleClick(character) {
    const filterChar = data?.results.filter((sel) => sel.id === character);
    let charinfo = {
      name: filterChar[0].name,
      description: filterChar[0].description,
    };
    saveCharInfo(charinfo);
  }
  console.log("Selezionato", store.getState().char);
  console.log(char);
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
                    <Button
                      variant="primary"
                      value={character.id}
                      onClick={() => charHandleClick(character.id)}
                    >
                      Update Value
                    </Button>
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
