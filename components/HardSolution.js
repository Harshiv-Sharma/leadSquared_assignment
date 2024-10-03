import React, { useState, useEffect, useRef } from "react";
import './HardSolution.css'; // Import the new CSS file

const HardSolution = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const fetchCats = async (pageNumber = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`
      );
      if (!response.ok) throw new Error("Something went wrong!");
      const data = await response.json();
      setCats((prevCats) => [...prevCats, ...data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    }, { threshold: 1.0 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchCats(page);
    }
  }, [page]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {/* Single column layout for the cats */}
      <div className="cat-column">
        {cats.map((cat) => (
          <div key={cat.id} className="cat-card">
            <img src={cat.url} alt="Cat" />
            <div className="cat-card-content">
              <p>Adorable Cat</p>
            </div>
          </div>
        ))}
      </div>
      <div ref={loader}></div>
    </div>
  );
};

export default HardSolution;
