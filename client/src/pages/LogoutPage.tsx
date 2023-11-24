import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router';
import axios from 'axios';

export default function LogoutPage() {
    const contextValue = useContext(UserContext);
    const [redirect, setRedirect] = useState('');

    if (!contextValue) {
        return null;
    }
    const { setUser } = contextValue;

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="flex justify-center grow py-32">
            <div>
                <div>Are you sure you want to log out?</div>
                <button onClick={logout} className="primary max-w-sm mt-2">
                    Logout
                </button>
            </div>
        </div>
    );
}
