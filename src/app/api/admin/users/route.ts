import { query } from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await query(
      'SELECT id, email, display_name, role, is_approved, created_at FROM users ORDER BY created_at DESC'
    );

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Fetch users error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId, isApproved } = await req.json();

    await query(
      'UPDATE users SET is_approved = ?, updated_at = NOW() WHERE id = ?',
      [isApproved ? 1 : 0, userId]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
