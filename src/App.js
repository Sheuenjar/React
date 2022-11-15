import React, {useEffect, useState} from 'react'
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination"



function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({})

  const initialUrl = "https://rickandmortyapi.com/api/character"

  const fetchCharacters = (url) => {
    /* request a api */
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      /* si pasa error */
      .catch((error) => console.log(error));
    };

    /* pasar el siguiente o anterior link */
    const onPrevious = () => {
      fetchCharacters(info.prev);
    }

    const onNext = () => {
      fetchCharacters(info.next);
    }

  useEffect(() => {
    fetchCharacters(initialUrl);
  }, []);
  

  return (
    <>
      <Navbar brand="Rick and Morty App"/>

      <div className='container mt-5'>
        <Pagination 
          prev={info.prev} 
          next={info.next} 
          onPrevious={onPrevious} 
          onNext={onNext} 
        />
        <Characters characters={characters} />
        <Pagination 
          prev={info.prev} 
          next={info.next} 
          onPrevious={onPrevious} 
          onNext={onNext} 
        />
      </div>
    </>

  );
}

export default App;
