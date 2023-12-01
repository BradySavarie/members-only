import axios from 'axios';
import { format, parseISO } from 'date-fns';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/UserContext';

type MessageType = {
    user: { email: string; _id: string };
    time: string;
    body: string;
};

export default function MessageBoard() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<MessageType[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const contextValue = useContext(UserContext);

    useEffect(() => {
        axios.get('/messages').then((response) => {
            setMessages(response.data);
            scrollToBottom();
        });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!contextValue) {
        return null;
    }
    const { user } = contextValue;

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { data: newMessage } = await axios.post('/newMessage', {
            message,
        });
        setMessage('');
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    return (
        <div className="flex flex-col grow w-full outline outline-gray-200 shadow-md justify-center px-4 pb-2 pt-4 gap-2 relative bg-secondary rounded-2xl">
            <div className="overflow-y-auto max-h-60 mb-20">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center gap-1 grow justify-center">
                        <p className="text-xl">No Messages</p>
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
                                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                            />
                        </svg>
                    </div>
                )}
                {messages.length > 0 && (
                    <div className="flex flex-col justify-end gap-2 ">
                        {messages.map((curr, index) => (
                            <div className="flex flex-col gap-1 p-1">
                                <div
                                    className="rounded-2xl bg-white px-4 py-2"
                                    key={index}
                                >
                                    <div className="flex gap-2">
                                        <div className="bg-gray-500 rounded-full text-white border border-gray-500 overflow-hidden">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill={'currentColor'}
                                                className="w-6 h-6 relative top-1"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <p>{curr.body}</p>
                                    </div>
                                </div>
                                {user?.isMember && (
                                    <div className="flex justify-between">
                                        <p className="text-xs text-gray-500 pr-4">
                                            {curr.user.email}
                                        </p>
                                        <p className="text-xs text-gray-500 justify-end flex pr-4">
                                            Sent on{' '}
                                            {format(
                                                parseISO(curr.time),
                                                'MMM dd'
                                            )}{' '}
                                            at{' '}
                                            {format(
                                                parseISO(curr.time),
                                                'h:mm'
                                            )}
                                        </p>
                                    </div>
                                )}
                                {!user?.isMember && (
                                    <div className="flex justify-between">
                                        <p className="text-xs text-gray-500 pr-4">
                                            Anonymous
                                        </p>
                                        <p className="text-xs text-gray-500 pr-4">
                                            Sent
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            <form
                action=""
                className="flex items-end w-full absolute bottom-2 left-0 p-2"
                onSubmit={handleSubmit}
            >
                <div className="flex gap-2 items-center w-full px-4">
                    {user && (
                        <>
                            <textarea
                                name="newMessage"
                                placeholder="Enter Message"
                                rows={1}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="shadow-md bg-white"
                            />
                            <button type="submit" className="flex gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="white"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="black"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                    {!user && (
                        <div className="flex grow bg-white rounded-2xl shadow-md justify-center px-6 py-2 mx-28 whitespace-nowrap">
                            <p className="text-md ">Login to post a message!</p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
