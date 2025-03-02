import React from "react";
import { Header } from "./components/header";
import { Outlet, Route, Routes } from "react-router";
import { NavigateToResource } from "@refinedev/react-router";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "./pages/categories";
import { QuotationList } from "./pages/products";
import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";

export const RoutesBundle: React.FC = () => (
  <Routes>
    <Route
      element={
        <ThemedLayoutV2 Header={() => <Header sticky />} Sider={(props) => <ThemedSiderV2 {...props} fixed />}>
          <Outlet />
        </ThemedLayoutV2>
      }
    >
      <Route index element={<NavigateToResource resource="categories" />} />
      <Route path="/categories">
        <Route index element={<CategoryList />} />
        <Route path="create" element={<CategoryCreate />} />
        <Route path="edit/:id" element={<CategoryEdit />} />
        <Route path="show/:id" element={<CategoryShow />} />
      </Route>
      <Route path="/products">
        <Route index element={<QuotationList />} />
      </Route>
      <Route path="*" element={<ErrorComponent />} />
    </Route>
  </Routes>
);
