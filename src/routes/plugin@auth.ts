import { QwikAuth$ } from "@auth/qwik";
import CredentialsProvider from "@auth/qwik/providers/credentials";
import {users} from "~/data/usersDB";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [CredentialsProvider({
        name: 'Login',
        authorize: (credentials) => {
            if (credentials) {
                const user = users.get(credentials.username as string);
                if (user) {
                    if (user.password === credentials.password) {
                        return { id: user.username, name: user.username, email: `${user.username}@gmail.com`};
                    }
                }
            }
            return null;
        },
        credentials: {
            username: { label: 'Username', type: 'text' },
            password: { label: 'Password', type: 'password' },
        },
    })],
  }),
);
