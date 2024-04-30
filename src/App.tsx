import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Example from "./views/Example";
import "./App.css";

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/example" element={<Example />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
