import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layaout } from "./components/layaout"
import { Home } from "./page/Home/Home"
import { Register } from "./page/Auth/Register"
import { Login } from "./page/Auth/Login"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layaout/>,
      children: [
        {
          index: true,
          element: <Home/>
        },
      ]
    },
    {
      path: '/registerAuth',
      element: <Register/>
    },
    {
      path: '/loginAuth',
      element: <Login/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
