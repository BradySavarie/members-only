import axios from 'axios';
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from 'react';

export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    isMember: boolean;
    _v: number;
};

export type UserContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    ready: boolean;
};

type UserContextProviderProps = {
    children: ReactNode;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
                setReady(true);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
