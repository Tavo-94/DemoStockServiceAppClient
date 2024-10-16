import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import FreeFormPage from "./pages/FreeFormPage"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <div>Error</div>,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/free-form-page",
          element: <FreeFormPage />,

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
