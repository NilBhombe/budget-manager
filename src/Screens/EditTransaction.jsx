import React, { useState } from "react";
import { Header } from "../components/comman/header";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import config from "../configs/config";
import toasts from "../configs/toasts";

const editSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1, "minimum amount should be 1")
    .required("Required"),
  remark: Yup.string().required("required"),
  transactionType: Yup.string()
    .oneOf(["CREDIT", "DEBIT"], "value should match the dropdown")
    .required(),
});
export const EditTransaction = () => {
  const navigate = useNavigate();
  const [errorTouch, setErrorTouch] = useState(false);
  const { txnId } = useParams();
  const [queryParams] = useSearchParams();
  const amount = queryParams.get("amount");
  const remark = queryParams.get("remark");
  const transactionType = queryParams.get("transactionType");
  console.log(amount, remark, transactionType, txnId);
  const editTransaction = (amount, remark, transactionType) => {
    axios
      .put(
        `${config.baseUrl}/transaction/app/${txnId}`,
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
        initialValues={{
          amount: amount,
          remark: remark,
          transactionType: transactionType,
        }}
        validationSchema={editSchema}
        validateOnBlur={errorTouch}
        validateOnChange={errorTouch}
        onSubmit={(values, { setSubmitting }) => {
          const { amount, remark, transactionType } = values;
          editTransaction(amount, remark, transactionType);
          setTimeout(() => {
            setSubmitting(false);
          }, 4000);
          navigate("/transactions");
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
              Edit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};
