import axios from 'axios';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { UserContext } from '../context/UserContext';

export default function MemberPage() {
    const [secret, setSecret] = useState('');
    const [isInvalid, setIsInvalid] = useState(true);
    const [isMember, setIsMember] = useState(false);
    const contextValue = useContext(UserContext);

    useEffect(() => {
        if (!isInvalid) {
            setTimeout(() => {
                setIsInvalid(true);
            }, 1500);
        }
    }, [isInvalid]);

    if (!contextValue) {
        return null;
    }
    const { setUser } = contextValue;

    async function handleSignUp(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (secret === 'cookies') {
            const { data } = await axios.put('/member');
            if (data) {
                setUser(data);
            }
            if (data.isMember) {
                setIsMember(true);
            }
        } else {
            setIsInvalid(false);
        }
    }

    if (isMember) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="mt-10 flex grow items-center justify-around">
            <div className="mb-36">
                <h1 className="text-4xl font-bold text-center mb-4">
                    Solve This Riddle
                </h1>
                <p className="text-lg text-center mb-4">
                    What is a computer's favourite snack?
                </p>
                <form
                    action=""
                    className="max-w-md mx-auto"
                    onSubmit={handleSignUp}
                >
                    <input
                        type="text"
                        placeholder="enter answer"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                    />
                    {!isInvalid && (
                        <div className="max-w-md mx-auto flex justify-center">
                            <p className="font-bold text-red-500">
                                Incorrect. Try Again!
                            </p>
                        </div>
                    )}
                    <button type="submit" className="primary mt-4">
                        Become a Member
                    </button>
                </form>
            </div>
        </div>
    );
}
