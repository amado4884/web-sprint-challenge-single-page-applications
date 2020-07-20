import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./routes/Header";
import Footer from "./routes/Footer";
import Home from "./routes/Home";
import Pizza from "./routes/Pizza";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pizza">
          <Pizza />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};
export default App;
