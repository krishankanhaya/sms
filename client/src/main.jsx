import * as ReactDOM from "react-dom/client"
import './index.css'
import './App.css'
import router from './routes/index.jsx'
import {
  RouterProvider,
} from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
