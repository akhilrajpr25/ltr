import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { AuthWrapper } from "./auth/AuthWrapper";

function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <AppRouter />
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
