import { Row, Pagination } from "react-bootstrap";

export default function PaginationComponent({
  currentPage,
  posts,
  setPosts,
  setCurrentPage,
  setOffset,
}) {
  let items = [];
  if (!posts || !posts.data || !posts.data.total || !posts.data.limit) {
  } else {
    const totalPages = ~~(posts?.data?.total / posts?.data?.limit);
    let active = currentPage;
    for (let number = 0; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => handleClick(number)}
        >
          {number + 1}
        </Pagination.Item>,
      );
    }
  }

  function handleClick(number: number) {
    if (number != currentPage) {
      setPosts(undefined);
      setCurrentPage(number);
      let limitPost = Number(posts?.data?.limit);
      setOffset(number * limitPost);
    } else {
      return;
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
        {currentPage != items.length - 1 && (
          <>
            <Pagination.Next onClick={() => handleClick(currentPage + 1)} />
          </>
        )}
      </Pagination>
    </Row>
  );
}
