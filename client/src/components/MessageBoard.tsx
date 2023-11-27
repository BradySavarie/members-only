import { useState } from 'react';

export default function MessageBoard() {
    const [message, setMessage] = useState('');

    return (
        <div className="flex grow w-full outline justify-center px-4 py-2">
            <form action="" className="flex items-end grow w-full">
                <div className="flex gap-2 items-center w-full">
                    <textarea
                        name="newMessage"
                        placeholder="Enter Message"
                        rows={1}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className="flex gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
