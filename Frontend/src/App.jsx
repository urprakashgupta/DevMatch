import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/Login" element={<Body />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
