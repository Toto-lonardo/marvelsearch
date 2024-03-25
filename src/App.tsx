import axios from "axios";
import * as apiInterfaces from "./utils/interface";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState<apiInterfaces.Post | null>(null);
  const apikey = import.meta.env.VITE_MARVEL_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters/1009351?apikey=${apikey}`,
      )
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <div>
        <h1>Posts</h1>
        {posts ? (
          <pre>
            {posts.data.results.map((post) => {
              return (
                <div key={post.id} className="card">
                  <p>{post.name}</p>
                  <p className="longtext">{post.description}</p>
                </div>
              );
            })}
          </pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default App;
