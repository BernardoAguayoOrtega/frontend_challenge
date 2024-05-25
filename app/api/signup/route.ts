import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const usersFilePath = path.resolve(process.cwd(), 'users.json');

const readUsers = (): User[] => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, '[]', 'utf-8');
  }
  const usersData = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(usersData) as User[];
};

const writeUsers = (users: User[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    const users = readUsers();
    const newUser: User = {
      id: (users.length + 1).toString(),
      username,
      email,
      password,
    };

    users.push(newUser);
    writeUsers(users);

    return NextResponse.json({ message: 'Signup successful' });
  } catch (error) {
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}
