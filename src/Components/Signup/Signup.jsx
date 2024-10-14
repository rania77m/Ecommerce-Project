import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Signup() {
  let navigate = useNavigate()
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const register = async (values) => {
    setLoading(true)
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    console.log(data);
    if (data.message === "success") {
      setLoading(false);
      navigate('/signin')
    }
  };

  let validationSchema = Yup.object({
    name: Yup.string().required("The name is required").min("3").max("10"),
    email: Yup.string()
      .required("The email is required")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][\w @]{5,9}$/,
        "Invalid Syntax must start with uppercase letter and contains @,# and numbers"
      ),
    rePassword: Yup.string()
      .required("RePassword is required")
      .oneOf([Yup.ref("password")], "Password doesn't match"),
    phone: Yup.string()
      .required("The phone is required")
      .matches(/^01[0-9]{9}$/, "The phone number is not egyptian number"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate,
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <div className="w-75 mx-auto py-2">
        <h2 className="text-center">Signup</h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError ? (
            <div className="alert alert-danger py-2">{apiError}</div>
          ) : (
            ""
          )}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name
            className="form-control mb-3"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger py-2">{formik.errors.name}</div>
          ) : null}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            email
            className="form-control mb-3"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-2">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            password
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2">
              {formik.errors.password}
            </div>
          ) : null}
          <label htmlFor="rePassowrd">rePassword</label>
          <input
            type="password"
            id="rePassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            rePassword
            className="form-control mb-3"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger py-2">
              {formik.errors.rePassword}
            </div>
          ) : null}
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            phone
            className="form-control mb-3"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger py-2">{formik.errors.phone}</div>
          ) : null}
          {loading ? (
            <BallTriangle
              height={50}
              width={50}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-light"
            >
              
              Sign Up
            </button>
          )}
        </form>
      </div>
    </>
  );
}
