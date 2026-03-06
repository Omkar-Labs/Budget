import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {DashBoard} from './components/dashboard/DashBoard.jsx'
import { SignupLoginPage } from './components/login/SignupLoginPage.jsx'
import { dashboardLoader } from './hooks/authUser.hook.js'
import Transactions from './components/Transaction/Transaction.jsx'
import { Budgets } from './components/budgets/budgets.jsx'
import { Analytics } from './components/analytics/Analytics.jsx'
import { filterData } from './hooks/fetchTransactions'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      {
        path: "analytics",
        element: <Analytics />
      }

    ]
  },
  {
    path: "login",
    element: <SignupLoginPage />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
