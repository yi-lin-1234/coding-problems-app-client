import { Route, Routes } from "react-router-dom";

import Dashboard from "./view/Dashboard";
import All from "./view/All";
import Create from "./view/Create";
import Search from "./view/Search";
import Topic from "./view/Topic";
import Difficulty from "./view/Difficulty";
import BarChart from "./view/BarChart";
import Edit from "./view/Edit";
import Detail from "./view/Detail";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<All />} />
        <Route path="create" element={<Create />} />
        <Route path="search" element={<Search />} />
        <Route path="topic" element={<Topic />} />
        <Route path="difficulty" element={<Difficulty />} />
        <Route path="chart" element={<BarChart />} />

        <Route path="detail/:id" element={<Detail />} />
        <Route path="edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  );
}

export default App;
