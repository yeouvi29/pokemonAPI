import { Switch, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import BlindQuiz from "./pages/BlindQuiz";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/blind-quiz">
          <BlindQuiz />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
