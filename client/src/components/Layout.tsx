import { Outlet } from 'react-router';
import Header from './Header';

export default function Layout() {
    return (
        <div className="py-12 px-16 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    );
}
