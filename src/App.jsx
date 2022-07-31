import logo from "./logo.svg";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Properties from "./Components/properties";
import Sell from "./Components/sell";
import Rentals from "./Components/rentals";
import NotFound from "./Components/notFound";
import Navbar from "./Components/navbar";
import LoginForm from "./Components/loginForm";
import Register from "./Components/register";

function App() {
  return (
    <main>
      <Navbar />
      <Switch>
        <Route path="/properties" component={Properties}></Route>
        <Route path="/customers" component={Sell}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/movies" />
        <Redirect to="not-found" />
      </Switch>
    </main>
  );
}

export default App;
