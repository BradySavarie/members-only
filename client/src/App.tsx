import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import { UserContextProvider } from './context/UserContext';
import LogoutPage from './pages/LogoutPage';
import MemberPage from './pages/MemberPage';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export default function App() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<IndexPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/logout" element={<LogoutPage />} />
                        <Route path="/member" element={<MemberPage />} />
                    </Route>
                </Routes>
            </UserContextProvider>
        </BrowserRouter>
    );
}
