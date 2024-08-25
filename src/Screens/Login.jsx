import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import config from "../configs/config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toasts from "../configs/toasts";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
const Login = () => {
  const navigate = useNavigate();
  const [removeError, setRemoveError] = useState(false);
  return (
    <>
      <div>Sign In</div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        validateOnChange={removeError}
        validateOnBlur={removeError}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post(`${config.baseUrl}/user/login`, values, {
              headers: { "device-id": config.deviceId },
            })
            .then((res) => {
              const { code, data, message } = res.data;
              if (code === "OK") {
                //loginsuccesfull
                const { token } = data;
                console.log(token);
                localStorage.setItem("token", token);
                toasts.successMsg(message);
                navigate("/transactions");
              } else {
                //loginUnsuccesfull
                toasts.errorMsg(message);
              }
            })
            .catch((err) => {
              console.log(err)
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
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <br />
            <input
              type="text"
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email}
            <br />
            <label>Password</label>
            <br />
            <input
              type="text"
              value={values.password}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password}
            <br />
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => {
                setRemoveError(true);
              }}
            >
              Login
            </button>
          </form>
        )}
      </Formik>
      <p>
        Don't have account <Link to={"/register"}>Register</Link>
      </p>
    </>
  );
};

export default Login;
