import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { AddCard } from "./pages/addCard";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/walletSlice";
import { useEffect } from "react";

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={(props) => <Home />} />
        <Route path="/addcard" render={(props) => <AddCard />} />
      </Switch>
    </div>
  );
}

export default App;
