import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/play/:id" component={Play} />
      </Switch>
    </Router>
  );
}

export default App;
