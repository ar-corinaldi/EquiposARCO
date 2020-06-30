import React, { useState, useEffect } from "react";
import PaginationB from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";

function Pagination(props) {
  const [pages, setPages] = useState([]);
  const [prevPage, setPrevPage] = useState(0);

  useEffect(() => {
    setPages(renderPages());
  }, []);

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
  return (
    <PaginationB>
      <PaginationB.First />
      <PaginationB.Prev />
      {pages &&
        pages.map((currentPage) => (
          <PageItem
            onClick={() => {
              setPrevPage(props.currentPage);
              props.setCurrentPage(currentPage.number);
            }}
            active={currentPage.active}
          >
            {currentPage.number}
          </PageItem>
        ))}
      <PaginationB.Next />
      <PaginationB.Last />
    </PaginationB>
  );
}

export default Pagination;
