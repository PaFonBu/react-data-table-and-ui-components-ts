import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { DataTable } from "./pages/DataTable";
import { UIComponents } from "./pages/UIComponents";
import { Layout } from "./components/Layout";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/data-table" element={<DataTable />} />
        <Route path="/ui-components" element={<UIComponents />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
