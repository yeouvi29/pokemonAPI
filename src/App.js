import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Main from "./layout/Main";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.app}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
