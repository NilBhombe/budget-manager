import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../configs/config";
import * as Yup from "yup";
import toasts from "../configs/toasts";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

export const Register = () => {
  const navigate = useNavigate();
  const [removeError, setRemoveError] = useState(false);
  return (
    <>
      <div>Register</div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        validateOnBlur={removeError}
        validateOnChange={removeError}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post(`${config.baseUrl}/user/register`, values)
            .then((res) => {
              const { code, message } = res.data;
              if (code === "OK") {
                toasts.successMsg(message);
                navigate("/login");
              } else {
                toasts.errorMsg(message);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setTimeout(() => {
                setSubmitting(false);
              }, 4000);
            });
        }}
      >
        {({
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <br />
            <input
              type="text"
              name="name"
              placeholder="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {touched.name && errors.name}
            <br />
            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {touched.email && errors.email}
            <br />
            <label>Password</label>
            <br />
            <input
              type="text"
              name="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {touched.password && errors.password}
            <br />
            <label>Confirm Password</label>
            <br />
            <input
              type="text"
              name="confirmPassword"
              placeholder="confirm password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {touched.confirmPassword && errors.confirmPassword}
            <br />
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => setRemoveError(true)}
            >
              Register
            </button>
          </form>
        )}
      </Formik>
      <p>
        Already have accoount? <Link to={"/login"}>Login here</Link>
      </p>
    </>
  );
};
