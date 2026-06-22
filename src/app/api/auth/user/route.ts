import { query } from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In production, verify the token with Firebase Admin SDK
    // For now, this is a placeholder

    const users = await query('SELECT id, email, display_name, role, is_approved FROM users LIMIT 1');
    return NextResponse.json(users[0] || {}, { status: 200 });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}