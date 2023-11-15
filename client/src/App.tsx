import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
