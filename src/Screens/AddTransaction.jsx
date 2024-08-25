import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import config from "../configs/config";
import toasts from "../configs/toasts";
import { Header } from "../components/comman/header";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const addSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1, "minimum amount should be 1")
    .required("Requires"),
  remark: Yup.string().required("required"),
  transactionType: Yup.string()
    .oneOf(["CREDIT", "DEBIT"], "value should match the dropdown")
    .required(),
});
export const AddTransaction = () => {
  const navigate = useNavigate();
  const [errorTouch, setErrorTouch] = useState(false);
  const saveTransaction = (amount, remark, transactionType) => {
    axios
      .post(
        `${config.baseUrl}/transaction/app/add`,
        {
          amount,
          remark,
          transactionType,
        },
        { headers: config.getToken() }
      )
      .then((res) => {
        const { message, code } = res.data;
        if (code === "OK") {
          toasts.successMsg(message);
          console.log(res.data);
        } else {
          toasts.errorMsg(message);
        }
      })
      .catch(() => {
        toasts.errorMsg("something went wrong");
      });
  };
  return (
    <>
      <Header />
      <Formik
        initialValues={{ amount: 0, remark: "", transactionType: "" }}
        validationSchema={addSchema}
        validateOnBlur={errorTouch}
        validateOnChange={errorTouch}
        onSubmit={(values, { setSubmitting }) => {
          const { amount, remark, transactionType } = values;
          saveTransaction(amount, remark, transactionType);
          setTimeout(() => {
            setSubmitting(false);
          }, 4000);
          navigate("/transactions")
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          errors,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <label>Amount</label>
            <br />
            <input
              type="text"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {touched.amount && errors.amount}
            <br />
            <label>Remark</label>
            <br />
            <input
              type="text"
              name="remark"
              value={values.remark}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {touched.remark && errors.remark}
            <br />
            <label>Transaction Type</label>
            <br />
            <select
              name="transactionType"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.transactionType}
            >
              <option>Select option</option>
              <option value="CREDIT">Credit</option>
              <option value="DEBIT">Debit</option>
            </select>
            <br />
            {touched.transactionType && errors.transactionType}
            <br />
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => setErrorTouch(true)}
            >
              Add
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};
