function ShopPagination({
  currentPage,
  totalPages,
  onPageChange,
  generatePaginationItems,
}) {
  return (
    <div className="col-12 pb-1">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mb-3">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="Previous"
              disabled={currentPage === 1}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>

          {generatePaginationItems().map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
              aria-label="Next"
              disabled={currentPage === totalPages}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ShopPagination;
