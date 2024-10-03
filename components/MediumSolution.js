import React, { useState } from "react";
import '../App.css';

const MediumSolution = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchCats = async (pageNumber = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`);
      if (!response.ok) throw new Error("Something went wrong!");
      const data = await response.json();
      setCats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
    fetchCats(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      fetchCats(page - 1);
    }
  };

  return (
    <div>
      <button onClick={() => fetchCats(page)}>Fetch Cats</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && cats.length === 0 && <p>No cats available!</p>}
      <div className="cat-grid">
        {cats.map((cat) => (
          <div key={cat.id} className="cat-card">
            <img src={cat.url} alt="Cat" />
          </div>
        ))}
      </div>
      <div>
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default MediumSolution;
