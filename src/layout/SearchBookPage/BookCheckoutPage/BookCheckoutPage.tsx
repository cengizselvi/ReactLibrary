import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { CheckAndReview } from "./CheckAndReview";
import ReviewModel from "../../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import { access } from "fs";
import { tokenToString } from "typescript";




export const BookCheckoutPage = () => {

  const [book, setBook] = useState<BookModel>();

  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const bookId = window.location.pathname.split("/")[2];

  const { authState } = useOktaAuth();

  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] =
    useState(true);

  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);
  console.log(authState);



  useEffect(() => {
    const fetchBook = async () => {
      const url: string = `http://localhost:8080/api/books/${bookId}`;

      const response = await fetch(url);

      const responseJson = await response.json();

      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };
      setBook(loadedBook);
    };
    fetchBook();
  }, [isCheckedOut]);

  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });
      }

      setReviews(loadedReviews);
    };

    fetchBookReviews();
  }, []);

  useEffect(() => {
    const fetchUserReviewBook = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/reviews/secure/user/book/?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const userReview = await fetch(url, requestOptions);
        if (!userReview.ok) {
          throw new Error("Something went wrong");
        }
        const userReviewResponseJson = await userReview.json();
      }
    };
    fetchUserReviewBook().catch((error: any) => {
      setHttpError(error.message);
    });
  }, [authState]);

  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/currentloans/count`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const currentLoansCountResponse = await fetch(url, requestOptions);
        if (!currentLoansCountResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const currentLoansCountResponseJson =
          await currentLoansCountResponse.json();
        setCurrentLoansCount(currentLoansCountResponseJson);
      }
      setIsLoadingCurrentLoansCount(false);
    };
    fetchUserCurrentLoansCount().catch((error: any) => {
      setIsLoadingCurrentLoansCount(false);
      setHttpError(error.message);
    });
  }, [authState, isCheckedOut]);

  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser/?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const bookCheckedOut = await fetch(url, requestOptions);

        if (!bookCheckedOut.ok) {
          throw new Error("Something went wrong!");
        }

        const bookCheckedOutResponseJson = await bookCheckedOut.json();
        setIsCheckedOut(bookCheckedOutResponseJson);
      }
      setIsLoadingBookCheckedOut(false);
    };
    fetchUserCheckedOutBook().catch((error: any) => {
      setIsLoadingBookCheckedOut(false);
      setHttpError(error.message);
    });
  }, [authState]);

  async function checkoutBook() {
    const url = `http://localhost:8080/api/books/secure/checkout/?bookId=${book?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsCheckedOut(true);
  }

  async function submitReview(starInput: number, reviewDescription: string) {
    let bookId: number = 0;
    if (book?.id) {
      bookId = book.id;
    }

    const url = `http://localhost:8080/api/reviews/secure`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
  }

  return (
    <div>
      <div className="container mt-5  card">
        <div className=" row mt-5 d-flex justify-content-center card">
          <div className="col-45 col-md-3h d-flex  ">
            {book?.img ? (
              <img src={book.img} width="123" height="196" alt="Book" />
            ) : (
              <img
                src="https://cdn.bkmkitap.com/modern-frontend-sifirdan-ileri-seviye-web-tasarimi-13394294-51-O.jpg"
                width="123"
                height="196"
                alt="Book"
              />
            )}

            <div className="col justify-content-center ">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
            </div>

            <div className="col justify-content-top ">
              <h5>
                <CheckAndReview
                  book={book}
                  mobile={true}
                  currentLoansCount={currentLoansCount}
                />
              </h5>
              <LatestReviews
                reviews={reviews}
                bookId={book?.id}
                mobile={true}
              />
            </div>
          </div>
        </div>

        <hr />
      </div>
    </div>
  );
};
function setHttpError(message: any) {
  throw new Error("Function not implemented.");
}
