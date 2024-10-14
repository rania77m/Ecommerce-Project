import React, { useContext, useState } from "react";
import style from "./Signin.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let {setUserToken } = useContext(UserContext)
  let navigate = useNavigate();
  async function loginSubmit(values) {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    // console.log(data);
    if (data.message == "success") {
      setLoading(false);
      setUserToken(data.token)
      localStorage.setItem('userToken', data.token)
      navigate("/");
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][\w @]{5,8}$/, "invalid password ex: Ahmed@123"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate,
    validationSchema,
    onSubmit: loginSubmit,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h2>Login Now</h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id="email"
            email
            className="form-control mb-3"
          />
          <label htmlFor="email">Password</label>
          <input
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id="password"
            password
            className="form-control mb-3"
          />{" "}
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2 ">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          {loading ? (
            <i className="fas fa-spinner fa-spin btn bg-main"></i>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-light"
            >
              Login
            </button>
          )}
          <Link to={'/signup'} className="ps-4">Don't have an account</Link>
        </form>
      </div>
    </>
  );
}
