import { useState } from 'react';

export default function MemberPage() {
    const [secret, setSecret] = useState('');

    function handleSignUp() {
        console.log('ok');
    }

    return (
        <div className="mt-10 flex grow items-center justify-around">
            <div className="mb-36">
                <h1 className="text-4xl font-bold text-center mb-4">
                    Solve This Riddle
                </h1>
                <p className="text-lg text-center mb-4">
                    What is a computers favourite snack?
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
                    <button className="primary mt-4">Become a Member</button>
                </form>
            </div>
        </div>
    );
}
