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

function App() {
  const routerList = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="home" element={<Home />} />
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
      <RouterProvider router={routerList} />
      {/* <Navbar />
      <div className="container">
        <Routes></Routes>
      </div> */}
      {/* <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/product" element={<ProductLayout />}>
            <Route path="info" element={<ProductInfo />} />
            <Route path="form" element={<InquiryForm />} />
          </Route>
          <Route path="/jobs" element={<JobsLayout />} loader={JobLoader}>
            <Route index element={<Jobs />} />
            <Route path=":id" element={<JobOpening />} />
          </Route>
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
