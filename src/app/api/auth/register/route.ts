import { query } from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, displayName, photoURL, uid } = await req.json();

    // Check if user exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(existingUser[0], { status: 200 });
    }

    // Create new user
    const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const role = isAdmin ? 'admin' : 'member';

    await query(
      'INSERT INTO users (email, display_name, photo_url, role, is_approved, firebase_uid, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [email, displayName, photoURL, role, isAdmin ? 1 : 0, uid]
    );

    const newUser = await query(
      'SELECT id, email, display_name, role, is_approved, photo_url FROM users WHERE email = ?',
      [email]
    );

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In production, verify the token with Firebase
    // For now, extract email from token

    const users = await query('SELECT id, email, display_name, role, is_approved FROM users LIMIT 1');
    return NextResponse.json(users[0] || {}, { status: 200 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}
