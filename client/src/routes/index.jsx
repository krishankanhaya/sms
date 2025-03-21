import {createBrowserRouter} from 'react-router-dom'
import routes from './routes.jsx'

// Importing Layouts
import BlankLayout from '../layouts/BlankLayout.jsx'
import ProtectedLayout from '../layouts/ProtectedLayout.jsx'

const finalRoutes = routes.map((route) => {
  return {
    ...route,
    element: 
      route.layout === 'blank' ? (
        <BlankLayout>{route.element}</BlankLayout>
      ) : (
        <ProtectedLayout>{route.element}</ProtectedLayout>
      ),
    };
  }
);

const router = createBrowserRouter(finalRoutes)

export default router
