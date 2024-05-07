import React, { FunctionComponent } from "react";
import { Row, Pagination } from "react-bootstrap";
import * as apiInterface from "../utils/interface";

type PaginationProps = {
  currentPage: number;
  posts: apiInterface.Post;
  handleClick: FunctionComponent<number>;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  posts,
  handleClick,
}) => {
  let items = [];
  if (!posts || !posts.data || !posts.data.total || !posts.data.limit) {
  } else {
    const totalPages = ~~(posts?.data?.total / posts?.data?.limit);
    console.log("Total pages:", totalPages);
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
    if (posts.data.total % posts.data.limit === 0) {
      items.pop();
    }
    console.log("Items lenght:", items.length);
    console.log("currentPage:", currentPage);
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
