import React, { useEffect, useState } from "react";
import { Header } from "../components/comman/header";
import axios from "axios";
import config from "../configs/config";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import toasts from "../configs/toasts";
import { ModalComponent } from "../components/comman/Modal";

export const Transactions = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [perPage, setPerPage] = useState(5);
  const [pagination, setPagination] = useState(1);
  const [search, setSearch] = useState();
  const [dateSearch, setDateSearch] = useState({
    dateFilterKey: "createdAt",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [txnId, setTxnId] = useState(null);
  const deleteTransaction = (txnId) => {
    axios
      .delete(`${config.baseUrl}/transaction/app/${txnId}`, {
        headers: config.getToken(),
      })
      .then((res) => {
        const { message, code } = res.data;
        if (code == "OK") {
          toasts.successMsg(message);
        } else {
          toasts.errorMsg(message);
        }
      })
      .catch((err) => {})
      .finally(setShow(false));
  };

  const getTransaction = () => {
    setInterval(setLoading(true), 5000);
    axios
      .post(
        `${config.baseUrl}/transaction/app`,
        {
          "limit": perPage,
          "searchValue": search,
          "params": ["remark", "transactionType"],
          "page": pagination,
          "filterBy": [],
          "dateFilter": 
              dateSearch
          ,
          "orderBy": "createdAt",
          "orderByValue": -1,
          "isPaginationRequired": true
        },
        { headers: config.getToken() }
      )
      .then((res) => {
        setTransaction(res.data);
      })
      .catch((err) => {})
      .finally(setLoading(false));
  };

  useEffect(() => {
    getTransaction();
  }, [perPage, pagination, search, dateSearch, show]);
  return (
    <>
      <Header />
      <div style={{ marginTop: "50px" }}>
        <div>
          <label htmlFor="search">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            id="search"
          />
        </div>
        <div>
          <span>
            start date:{" "}
            <input
              type="date"
              value={dateSearch.startDate}
              onChange={(e) =>
                setDateSearch({ ...dateSearch, startDate: e.target.value })
              }
            />
          </span>
          <span>
            end date:{" "}
            <input
              type="date"
              value={dateSearch.endDate}
              onChange={(e) =>
                setDateSearch({ ...dateSearch, endDate: e.target.value })
              }
            />
          </span>
        </div>
      </div>
      <div>
        <button onClick={() => navigate("/add-transaction")}>
          Add Transaction
        </button>
      </div>
      <table
        border={1}
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "50px" }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Remark</th>
            <th>Transaction Type </th>
          </tr>
        </thead>
        {loading ? (
          <tr>
            <td colSpan={5}>
              <p>Loading</p>
            </td>
          </tr>
        ) : (
          <tbody>
            {transaction?.data?.map((item, index) => (
              <tr key={index}>
                <td>{format(new Date(item.createdAt), "do MMMM y")}</td>
                <td>{item.amount}</td>
                <td>{item.remark}</td>
                <td>{item.transactionType}</td>
                <td>
                  <Link
                    to={`/edit-transaction/${item._id}?amount=${item.amount}&remark=${item.remark}&transactionType=${item.transactionType}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setShow(true);
                      setTxnId(item._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div style={{ marginTop: "20px" }}>
        <div>
          <span>Data Per Page: </span>
          <select value={perPage} onChange={(e) => setPerPage(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div>
          <ul style={{ display: "flex", padding: "0" }}>
            {Array(transaction?.totalPage)
              .fill()
              .map((_, i) => (
                <li key={i} style={{ listStyle: "none", margin: "0 2px" }}>
                  <button
                    onClick={(e) => setPagination(i + 1)}
                    disabled={pagination == i + 1}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <ModalComponent
        show={show}
        handleTask={() => deleteTransaction(txnId)}
        handleClose={() => setShow(false)}
      />
    </>
  );
};
