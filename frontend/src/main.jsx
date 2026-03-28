import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {DashBoard} from './components/dashboard/DashBoard.jsx'
import { SignupLoginPage } from './components/login/SignupLoginPage.jsx'
import { dashboardLoader } from './hooks/authUser.hook.js'
import Transactions from './components/Transaction/Transaction.jsx'
import { Budgets } from './components/budgets/Budgets.jsx'
import { GlobalLoader } from './GlobalLoader.jsx'
import { filterData } from './hooks/fetchTransactions'
import NotFound from './NotFound.jsx'
import { CustomErrorElement } from './CustomErrorElement.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <CustomErrorElement />,
    loader: dashboardLoader,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "transactions",
        loader: filterData,
        element: <Transactions />
      },
      {
        path: "budgets",
        element: <Budgets />
      },
      
    ]
  },
  {
    path: "login",
    element: <SignupLoginPage />
  },
  {
    path: "*",
    element: <NotFound />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<GlobalLoader />} />
  </StrictMode>,
)
