
import BookModel from "../../../models/BookModel";
import { Link } from "react-router-dom";

export const CheckAndReview: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
  currentLoansCount: number;
}> = (props) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{props.currentLoansCount}/5</b>
            kitaplar kontrol edildi
          </p>
          <hr />
          {props.book &&
          props.book.copiesAvailable &&
          props.book.copiesAvailable > 0 ? (
            <h4 className="text-success">Stokta</h4>
          ) : (
            <h4 className="text-danger"> Stokta Kalmadı</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{props.book?.copies} </b>
              Nüsha
            </p>
            <p className="col-6 lead">
              <b>{props.book?.copiesAvailable} </b>
              Mevcut
            </p>
          </div>
        </div>
        <Link
          to={`/checkout/${props.book?.id}`}
          className="btn btn-success btn-lg"
        >
          Giriş Yap
        </Link>
        <hr />
        <p className="mt-3">TEST TEST TEST</p>
        <p>Yorum yapmak için oturum açın</p>
      </div>
    </div>
  );
};
