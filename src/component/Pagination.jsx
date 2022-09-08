import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({setProducts}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/products?page=${page}`)
      .then((response) => {
        setProducts(response.data.data[0].data);
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  let handlePageChange = (data) => {
    setPage(data.selected + 1);
  };
  return (
    <>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={25}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />

      <div className="row"></div>
    </>
  );
};

export default Pagination;
