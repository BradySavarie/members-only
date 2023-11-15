import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
