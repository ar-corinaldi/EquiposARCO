import React, { useState, useEffect } from "react";
import PaginationB from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";

function Pagination(props) {
  const [pages, setPages] = useState([]);
  const [prevPage, setPrevPage] = useState(0);

  useEffect(() => {
    setPages(renderPages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.numberPages]);

  useEffect(() => {
    setPages((prevState) => {
      let newPages = [...prevState];
      let newCurrent = { ...newPages[props.currentPage - 1] };
      let prevCurrent = { ...newPages[prevPage - 1] };
      newCurrent.active = true;
      prevCurrent.active = false;
      newPages[props.currentPage - 1] = newCurrent;
      newPages[prevPage - 1] = prevCurrent;
      setPages(newPages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentPage]);

  const renderPages = () => {
    let loadPages = [];
    for (let i = 1; i <= props.numberPages; i++) {
      let page = {
        number: i,
        active: i === props.currentPage,
      };
      loadPages.push(page);
    }
    return loadPages;
  };

  if (props.numberPages === 0) {
    return null;
  }

  return (
    <PaginationB>
      <PaginationB.First
        onClick={() => {
          setPrevPage(props.currentPage);
          props.setCurrentPage(1);
        }}
      />
      <PaginationB.Prev
        onClick={() => {
          setPrevPage(props.currentPage);
          props.setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
        }}
      />
      {pages &&
        pages.map((currentPage, index) => (
          <PageItem
            onClick={() => {
              setPrevPage(props.currentPage);
              props.setCurrentPage(currentPage.number);
            }}
            active={currentPage.active}
            key={index + 1}
          >
            {currentPage.number}
          </PageItem>
        ))}
      <PaginationB.Next
        onClick={() => {
          setPrevPage(props.currentPage);
          props.setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        }}
      />
      <PaginationB.Last
        onClick={() => {
          setPrevPage(props.currentPage);
          props.setCurrentPage(props.numberPages);
        }}
      />
    </PaginationB>
  );
}

export default Pagination;
