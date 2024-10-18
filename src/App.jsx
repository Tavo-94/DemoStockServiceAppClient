import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"

import StocksAbmPage from "./pages/StocksAbmPage"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <div>Error</div>,
      children: [
        {
          index: true,
          element: <StocksAbmPage />,
        },
        {
          path: "/stocks-abm",
          element: <StocksAbmPage />
        }

      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
