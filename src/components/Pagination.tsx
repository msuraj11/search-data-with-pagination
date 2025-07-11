import React, { useState } from "react";
import { PaginationProps } from "../shapes";

const Pagination: React.FC<{ pagination: PaginationProps }> = ({
  pagination,
}) => {
  const [page, setPage] = useState(1);
  const { handleNextOrPrevClick } = pagination;

  function handleClickPagination(event: React.BaseSyntheticEvent) {
    const buttonType = event.target.name;
    setPage((prevPage) => {
      const goToPage = buttonType === "prev" ? prevPage - 1 : prevPage + 1;
      if (handleNextOrPrevClick) {
        handleNextOrPrevClick(goToPage, buttonType);
      }
      return goToPage;
    });
  }

  return (
    <div className="pagination">
      <span className="button">
        <button
          name="prev"
          disabled={page === 1}
          onClick={handleClickPagination}
        >
          {"<<"}
        </button>
      </span>
      <span>{page}</span>
      <span className="button">
        <button name="next" onClick={handleClickPagination}>
          {">>"}
        </button>
      </span>
    </div>
  );
};

export default Pagination;
