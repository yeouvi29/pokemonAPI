import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Main from "./components/Main";

import classes from "./App.module.css";

function App() {
  console.log("app is rendering");
  return (
    <div className={classes.app}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
