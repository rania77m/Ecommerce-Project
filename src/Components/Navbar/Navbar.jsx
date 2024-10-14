import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/signin");
  }
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link class="navbar-brand" to={"/"}>
          <img src={logo} alt="fresh-cart" />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken != null ? (
              <>
                {" "}
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to={"/"}>
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link active"
                    aria-current="page"
                    to={"/products"}
                  >
                    Products
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link active"
                    aria-current="page"
                    to={"/cart"}
                  >
                    Cart
                  </Link>
                </li>{" "}
                <li class="nav-item">
                  <Link
                    class="nav-link active"
                    aria-current="page"
                    to={"/categories"}
                  >
                    Categories
                  </Link>
                </li>{" "}
                <li class="nav-item">
                  <Link
                    class="nav-link active"
                    aria-current="page"
                    to={"/brands"}
                  >
                    Brands
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
          <ul className={` navbar navbar-nav ms-auto mb-2 mb-lg-0`}>
            <li class="nav-item d-flex align-items-center">
              <Link to={""}>
                <i className="fab fa-facebook me-2"></i>
              </Link>

              <i className="fab fa-twitter me-2"></i>
              <i className="fab fa-instagram me-2"></i>
              <i className="fab fa-youtube me-2"></i>
            </li>
            {userToken != null ? (
              <>
                {" "}
                <li class="nav-item">
                  <span
                    onClick={() => logOut()}
                    class="nav-link active cursor-pointer"
                    aria-current="page"
                  >
                    Logout
                  </span>
                </li>{" "}
              </>
            ) : (
              <>
                {" "}
                <li class="nav-item">
                  <Link
                    class="nav-link active"
                    aria-current="page"
                    to={"/signup"}
                  >
                    Register
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link active"
                    aria-current="page"
                    to={"/signin"}
                  >
                    Login
                  </Link>
                </li>{" "}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
