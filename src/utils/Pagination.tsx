export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: any;
}> = (props) => {
  const pagesNumbers: number[] = [];

  if (props.currentPage === 1) {
    pagesNumbers.push(props.currentPage);
    pagesNumbers.push(props.currentPage + 1);
    pagesNumbers.push(props.currentPage + 2);

  } else if (props.currentPage > 1) {
    if (props.currentPage > 4) {
      pagesNumbers.push(props.currentPage - 2);
      pagesNumbers.push(props.currentPage - 1);
    } else {
      pagesNumbers.push(props.currentPage - 1);
    }
    pagesNumbers.push(props.currentPage);
    if (props.totalPages >= props.currentPage + 1) {
      pagesNumbers.push(props.currentPage + 1);
    }
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => props.paginate(1)}
            href="#"
            aria-label="Previous"
          >
            <span style={{ color: "green" }} aria-hidden="true">
              İlk Sayfa
            </span>
          </a>
        </li>
        {pagesNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => props.paginate(number)}
              className="page-link"
              href="#"
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => props.paginate(props.totalPages)}
            href="#"
            aria-label="Next"
          >
            <span style={{ color: "red" }} aria-hidden="true">
              Son Sayfa
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
