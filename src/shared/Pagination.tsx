import React, { FunctionComponent } from "react";
import { Row, Pagination } from "react-bootstrap";
import * as apiInterface from "../utils/interface";

type PaginationProps = {
  currentPage: number;
  pages: apiInterface.ApiResponse;
  handleClick: FunctionComponent<number>;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  pages,
  handleClick,
}) => {
  let items = [];
  if (!pages || !pages.data || !pages.data.total || !pages.data.limit) {
  } else {
    const totalPages = ~~(pages.data.total / pages.data.limit);
    for (let number = 0; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handleClick(number)}
        >
          {number + 1}
        </Pagination.Item>,
      );
    }
    if (pages.data.total % pages.data.limit === 0) {
      items.pop();
    }
  }

  return (
    <Row className="justify-content-center p-4 ">
      <Pagination className="col-auto mx-auto">
        {currentPage !== 0 && (
          <>
            <Pagination.Prev onClick={() => handleClick(currentPage - 1)} />
          </>
        )}
        {currentPage > 2 ? (
          <>
            <Pagination.Item onClick={() => handleClick(0)}>1</Pagination.Item>
            <Pagination.Ellipsis />
            {items.slice(currentPage - 1, currentPage + 2)}
            {currentPage < items.length - 2 && (
              <>
                <Pagination.Ellipsis />
                {items.slice(items.length - 1)}
              </>
            )}
          </>
        ) : (
          <>
            {items.slice(0, currentPage + 2)}
            {currentPage < items.length - 2 && (
              <>
                <Pagination.Ellipsis />
                {items.slice(items.length - 1)}
              </>
            )}
          </>
        )}
        {currentPage !== items.length - 1 && (
          <>
            <Pagination.Next onClick={() => handleClick(currentPage + 1)} />
          </>
        )}
      </Pagination>
    </Row>
  );
};

export default PaginationComponent;
