import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Main from "./layout/Main";
import PokemonProvider from "./store/PokemonProvider";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.app}>
      <PokemonProvider>
        <Header />
        <Main />
        <Footer />
      </PokemonProvider>
    </div>
  );
}

export default App;
