import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import AddBookRequest from "../../models/AddBookRequest";

export const AddNewBook = () => {
  const { authState } = useOktaAuth();
  console.log(authState);

  // New Book
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState(0);

  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Displays
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);


  async function base64ConversionForImages(e: any) {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  }

  

  function getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setSelectedImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error", error);
    };
  }


  async function submitNewBook() {
    const url = `http://localhost:8080/api/admin/secure/add/book`;
    if (
      authState?.isAuthenticated &&
      title !== "" &&
      author !== "" &&
      description !== "" &&
      copies >= 0
    ) {
      const book: AddBookRequest = new AddBookRequest(
        title,
        author,
        description,
        copies
      );
      book.img = selectedImage;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      };

      const submitNewBookResponse = await fetch(url, requestOptions);
      if (!submitNewBookResponse.ok) {
        throw new Error("Backend de hata var!");
      }
      setTitle("");
      setAuthor("");
      setDescription("");
      setCopies(0);

      setSelectedImage(null);
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Kitap Başarıyla Eklendi
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          Tüm Alanları Doldur
        </div>
      )}
      <div className="card">
        <div className="card-header">Yeni kitap Ekle</div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Başlık</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label"> Yazar </label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  required
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Açıklama</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Kopyalar</label>
              <input
                type="number"
                className="form-control"
                name="Copies"
                required
                onChange={(e) => setCopies(Number(e.target.value))}
                value={copies}
              />
            </div>
            <input type="file" onChange={(e) => base64ConversionForImages(e)} />
            <div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={submitNewBook}
              >
                Kitap Ekle
              </button>

           
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
