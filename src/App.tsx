import { useState } from "react";
import { useDebounce } from "use-debounce";
import Footer from "./shared/Footer";
import "./App.css";
import { HeaderComp } from "./shared/HeaderComp";

import { Container, Row } from "react-bootstrap";

import {
  useFetchCharactersBySearchQuery,
  useFetchCharactersQuery,
} from "./features/characters/characters-api-slice";
import SearchInput from "./features/character-list/components/SearchInput";
import CharacterGrid from "./features/character-list/components/CharacterGrid";

function App() {
  //esempioRedux

  const [input, setInput] = useState("");
  const [searchChar, setSearchChar] = useDebounce(input, 500);
  const [offset, setOffset] = useState(0);
  const { data, isFetching } =
    searchChar == ""
      ? useFetchCharactersQuery(offset)
      : useFetchCharactersBySearchQuery({
          searchChar: searchChar,
          offset: offset,
        });
  console.log(data);

  //fineesempio
  const [currentPage, setCurrentPage] = useState(0);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    setOffset(0);
    setCurrentPage(0);
  }

  function handleClick(number: number) {
    if (number != currentPage) {
      setCurrentPage(number);
      let limitPost = Number(data?.data.limit);
      setOffset(number * limitPost);
      return number;
    } else {
      return;
    }
  }
  return (
    <>
      <Container fluid>
        <HeaderComp />
        <SearchInput input={input} handleInput={handleInput} />
        <Row className="mt-4 mx-5">
          <hr />
        </Row>
        <CharacterGrid
          handleClick={handleClick}
          data={data?.data}
          isFetching={isFetching}
          currentPage={currentPage}
        />
        <Footer />
      </Container>
    </>
  );
}

export default App;
