import "./styles/globals.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardHome from './pages/DashboardHome';
import AlertMessage from "./components/AlertMessage";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const App:React.FC = () => {
  const { showAlert, message } = useSelector((state: RootState) => state.alert);

  return   <BrowserRouter>
            {
              showAlert &&
                <AlertMessage message={ message } />
            }
            <Routes>
              <Route  path="/" element={<Login />} />
              <Route  path="/register" element={<Register />} />
              <Route  element={ <ProtectedRoute />}>
                <Route path="/dashboard" element={ <DashboardHome /> } />
              </Route>
            </Routes>
          </BrowserRouter>;
}

export default App;
