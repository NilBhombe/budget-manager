import { createBrowserRouter } from "react-router-dom";
import Login from "../Screens/Login";
import { Register } from "../Screens/Register";
import { Transactions } from "../Screens/Transactions";
import { WithoutLogin } from "../components/withoutLogin";
import { Auth } from "../components/Auth";
import { EditTransaction } from "../Screens/EditTransaction";
import { AddTransaction } from "../Screens/AddTransaction";

const Routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/login",
        element: (
          <WithoutLogin>
            <Login />
          </WithoutLogin>
        ),
      },
      {
        path: "/register",
        element: (
          <WithoutLogin>
            <Register />
          </WithoutLogin>
        ),
      },
      {
        path: "/transactions",
        element: (
          <Auth>
            <Transactions />
          </Auth>
        ),
      },
      {
        path: "/add-transaction",
        element: (
          <Auth>
            <AddTransaction />
          </Auth>
        ),
      },
      {
        path: "/edit-transaction/:txnId",
        element: (
          <Auth>
            <EditTransaction />
          </Auth>
        ),
      },
    ],
  },
]);

export default Routes;
