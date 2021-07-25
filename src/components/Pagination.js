import React, { useEffect, useState } from "react";

function Pagination() {

    
  const [data, setData] = useState([]);



  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);



  const [pageNumberLimit, setPageNumberLImit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLImit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLImit] = useState(0);



  const pages = [];
  for (let i = 0; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);



  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };



  const renderPagesNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          id={number}
          key={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });



  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  });



  const next = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLImit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLImit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const prev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLImit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLImit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const renderData = (data) => {
    return (
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <h1>Todo List</h1>
      {renderData(currentItems)}

      <ul className="pagination-numbers">
        <li>
          <button
            onClick={prev}
            disabled={currentPage === pages[0] ? true : false}
          >
            prev
          </button>
        </li>
        {renderPagesNumbers}

        <li>
          <button
            onClick={next}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            next
          </button>
        </li>
      </ul>
    </>
  );
}

export default Pagination;
