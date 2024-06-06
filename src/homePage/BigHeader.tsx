import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../utils/SpinnerLoading";

function BigHeader() {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }

  const handleLogout = async () => {
    await oktaAuth.signOut();
  };

  return (
    <header>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundSize: "cover",

          backgroundImage:
            'url("https://mdbcdn.b-cdn.net/img/new/slides/041.webp")',
        }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 style={{ color: "" }} className="mb-3">
                HOŞGELDİNİZ
              </h1>
              <h4 style={{ color: "greenyellow" }} className="mb-3">
                ARADIĞINIZ BÜTÜN TEKNOLOJİ KİTAPLARI BURADA{" "}
              </h4>
              {!authState.isAuthenticated ? 
                <a
                  className="btn btn-outline-light btn-lg"
                  href="/login"
                  role="button"
                >
                  Giriş Yap
                </a>
               : 
                <button
                  className="btn btn-outline-light btn-lg"
                  onClick={handleLogout}
                >
                  Çıkış Yap
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default BigHeader;
