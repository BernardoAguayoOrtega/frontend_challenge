import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.resolve(process.cwd(), 'users.json');

const readUsers = (): User[] => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, '[]', 'utf-8');
  }
  const usersData = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(usersData) as User[];
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const users = readUsers();
        const user = users.find(
          (user) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
