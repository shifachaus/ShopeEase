import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Body from "./component/Body";
import SingleProduct from "./component/SingleProduct";
import { Provider } from "react-redux";
import store from "./utils/Store";
import Cart from "./component/Cart";
import Products from "./component/Products";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Body />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/product/:id" element={<SingleProduct />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
