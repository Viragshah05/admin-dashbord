import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RootLayout from "./layout/RootLayout";
import ProductLayout from "./layout/ProductLayout";
import ProductInfo from "./components/product/productInfo";
import InquiryForm from "./components/product/inquiryForm";
import JobsLayout from "./layout/JobsLayout";
import JobOpening, { jobDetailsLoader } from "./components/jobs/jobOpening";
import Jobs, { JobLoader } from "./pages/Jobs";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  const routerList = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="/product" element={<ProductLayout />}>
          <Route path="info" element={<ProductInfo />} />
          <Route path="form" element={<InquiryForm />} />
        </Route>
        <Route path="/jobs" element={<JobsLayout />}>
          <Route index element={<Jobs />} loader={JobLoader} />
          <Route
            path=":id"
            element={<JobOpening />}
            loader={jobDetailsLoader}
          />
        </Route>
      </Route>
    )
  );
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={routerList} />
      </AuthProvider>
      {/* <Navbar />
      <div className="container">
        <Routes></Routes>
      </div> */}
    </div>
  );
}

export default App;
