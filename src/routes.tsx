import React from "react";
import { Header } from "./components/header";
import { Outlet, Route, Routes } from "react-router";
import { NavigateToResource } from "@refinedev/react-router";
import { ActorList } from "./pages/actors";
import { FilmList } from "./pages/films";
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
      <Route index element={<NavigateToResource resource="actors" />} />
      <Route path="/actors">
        <Route index element={<ActorList />} />
      </Route>
      <Route path="/films">
        <Route index element={<FilmList />} />
      </Route>
      <Route path="*" element={<ErrorComponent />} />
    </Route>
  </Routes>
);
