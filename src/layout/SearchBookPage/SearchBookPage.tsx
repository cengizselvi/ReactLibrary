import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../../utils/Pagination";


export const SearchBookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      let url: string = "";

      if (search === "") {
        url = `http://localhost:8080/api/books?page=${
          currentPage - 1
        }&size=${booksPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace("new", `${currentPage - 1}`);
        url = `http://localhost:8080/api/books` + searchWithPage;
      }

      const response = await fetch(url);

      const responseJson = await response.json();

      const responseData = responseJson._embedded.books;

      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedBooks: BookModel[] = [];

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  if (httpError) {
    return (
      <div className="container m-5">
        <p> {httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === " ") {
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=new&size=${booksPerPage}`
      );
    }
  };

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks  
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Kitap Ara..."
                  aria-describedby="search-addon"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => searchHandleChange()}
                >
                  ARA
                </button>
              </div>
            </div>
            <div className="mt-3">
              <h5 style={{ color: "darkorange" }}>
                Toplam Kitap Sayısı: {totalAmountOfBooks}
              </h5>
              <br />
            </div>

            {/* Top Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            )}

            {/* Bottom Pagination */}
            {books.map((book) => (
              <SearchBook book={book} key={book.id} />
            ))}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBookPage;
