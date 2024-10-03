import React, { useState } from "react";
import '../App.css'; // For styling

const EasySolution = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc");
      if (!response.ok) throw new Error("Something went wrong!");
      const data = await response.json();
      setCats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchCats}>Fetch Cats</button>
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
    </div>
  );
};

export default EasySolution;
