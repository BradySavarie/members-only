import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { data } = await axios.post('/login', { email, password });
        console.log(data);
    }

    return (
        <div className="mt-4 flex grow items-center justify-around">
            <div className="mb-36">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form
                    action=""
                    className="max-w-md mx-auto"
                    onSubmit={handleLoginSubmit}
                >
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="primary mt-4">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account?{' '}
                        <Link className="underline text-black" to={'/register'}>
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
