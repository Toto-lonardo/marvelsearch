import axios from "axios";
import * as apiInterfaces from "./utils/interface";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [posts, setPosts] = useState<apiInterfaces.Post | null>(null);
  const [searchChar, setSearchChar] = useState("");
  const [searchOn, setSearchOn] = useState(null);
  const apikey = import.meta.env.VITE_MARVEL_API_KEY;
  const apiurl = import.meta.env.VITE_MARVEL_API;

  useEffect(() => {
    console.log(searchChar);
    const getData = setTimeout(() => {
      searchChar === ""
        ? axios
            .get(`${apiurl}characters?apikey=${apikey}`)
            .then((response) => {
              console.log(response.data);
              setPosts(response.data);
            })
            .catch((error) => {
              console.error(error);
            })
        : axios
            .get(
              `${apiurl}characters?nameStartsWith=${searchChar}&apikey=${apikey}`,
            )
            .then((response) => {
              console.log(response.data);
              setPosts(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
    }, 2000);
    return () => clearTimeout(getData);
  }, [searchChar]);
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <h1>Example</h1>
          <form>
            <input
              type="text"
              placeholder="Search Marvel character"
              value={searchChar}
              onChange={(e) => setSearchChar(e.target.value)}
            />
          </form>
          <hr />
        </Row>
        <Row className="">
          {posts ? (
            <>
              {posts.data.results.map((post: apiInterfaces.Result) => {
                return (
                  <Col key={post.id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={`${post.thumbnail.path}.${post.thumbnail.extension}`}
                      />
                      <Card.Body className="card">
                        <Card.Title className="h2">{post.name}</Card.Title>
                        <Card.Text className="longtext">
                          {post.description}
                        </Card.Text>
                        {/* <Card.Footer> */}
                        {/*   {post.comics?.items.map( */}
                        {/*     (comic: apiInterfaces.Item2) => { */}
                        {/*       return ( */}
                        {/*         <div key={comic.name}> */}
                        {/*           <a */}
                        {/*             href={`${comic.resourceURI}?apikey=${apikey}`} */}
                        {/*           > */}
                        {/*             {comic.name} */}
                        {/*           </a> */}
                        {/*         </div> */}
                        {/*       ); */}
                        {/*     }, */}
                        {/*   )} */}
                        {/* </Card.Footer> */}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Row>
      </Container>
    </>
  );
}

export default App;
