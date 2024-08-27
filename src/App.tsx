import { Navigate, Route, Router } from "@solidjs/router";
import Layout from "./components/layout";
import HomePage from "../src/pages/Home";
import AlgorithmPage from "../src/pages/Algorithm";
import SortingVisualizer from "../src/pages/Visualizer/Sorting";
import SearchingVisualizer from "../src/pages/Visualizer/Searching";
import NotFoundPage from "../src/pages/404";

function App() {
  return (
    <Router root={Layout}>
      <Route path={"/"} component={HomePage} />
      <Route path={"/algorithm"} component={AlgorithmPage} />
      <Route path={"/algorithm/sorting"}>
        <Route path={"/"} component={() => <Navigate href={"/algorithm"} />} />
        <Route path={"/:id"} component={SortingVisualizer} />
      </Route>
      <Route path={"/algorithm/searching"}>
        <Route path={"/"} component={() => <Navigate href={"/algorithm"} />} />
        <Route path={"/:id"} component={SearchingVisualizer} />
      </Route>
      <Route path={"/*all"} component={NotFoundPage} />
    </Router>
  );
}

export default App;
