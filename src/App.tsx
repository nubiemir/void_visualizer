import { Router } from "@solidjs/router";
import { routes } from "./routes";
import Layout from "./components/layout";

function App() {
  return <Router root={Layout}>{routes}</Router>;
}

export default App;
