import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SearchPage from "./SearchPage";
import App from "../App";
import { PropsWithChildren, useContext } from "react";
import { SwapiContext } from "../context";
import CategoryPage from "./CategoryPage";

const ProtectedRoute = (props: PropsWithChildren) => {
  const { api } = useContext(SwapiContext);

  if (!api) return <Navigate to="/" replace />;

  return props.children;
};

// One of the routes is "protected", just for example if we don't want to load some routes until api is not ready yet(or any other condition is not met)
export default (
  <Routes>
    <Route path="/" element={<App />} />
    <Route
      path="/search"
      element={
        <ProtectedRoute>
          <SearchPage />
        </ProtectedRoute>
      }
    />
    <Route path="/category/:categoryName" element={<CategoryPage />} />
    <Route path="*" element={"Not found"} />
  </Routes>
);
