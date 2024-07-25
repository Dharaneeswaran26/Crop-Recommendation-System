import Navigation from "./Routes/Navbar/Navbar";
import Home from "./Routes/Home/Home";
import Crop from "./Routes/Crop/Crop";
// import Authentication from "./Routes/Auth/Authentication";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form";
import SignIn from "./components/auth/Sign-In-Form/SignIn";
import SignUp from "./components/auth/Sign-Up-Form/SignUp";
import Shop from "./components/shop/Shop-main";
import Checkout from "./components/checkout/Checkout";
import PredictionResult from "./components/Prediction-Result/PredictionResult";
import Delivery from "./components/Delivery/Delivery";

import { useState } from "react";

function App() {
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = (data) => {
    setPrediction(data.prediction);
  };
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/crop-recommendation" element={<Crop />} />
        <Route path="shop" element={<Shop />} />
        {/* <Route path="auth" element={<Authentication />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route> */}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="PredictionResult" element={<PredictionResult />} />
        <Route path="delivery" element={<Delivery />} />

        <Route
          path="/form"
          element={<Form handlePrediction={handlePrediction} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
