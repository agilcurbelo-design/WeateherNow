import { Clima } from "./Clima.jsx";
import "./App.css";
function App() {
  return (
    <section className="All">
      <div className="FirstPage">
        <div className="SerchClima">
          <Clima />
        </div>
        <div className="ClimaInfo">
          {/* Podés mostrar más info del clima acá */}
        </div>
      </div>
    </section>
  );
}

export default App;
