import { Switch, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Main from "./layout/Main";
import PokemonProvider from "./store/PokemonProvider";
import classes from "./App.module.css";

function App() {
  return (
    <PokemonProvider>
      <div className={classes.app}>
        <Header />
        <Main />
        <Footer />
      </div>
    </PokemonProvider>
  );
}

export default App;
