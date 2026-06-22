import { query } from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const cycle = await query(
      'SELECT * FROM study_cycles WHERE id = ?',
      [params.id]
    );

    if (cycle.length === 0) {
      return NextResponse.json({ error: 'Cycle not found' }, { status: 404 });
    }

    const topics = await query(
      'SELECT id, name, math_numbers FROM topics WHERE cycle_id = ? ORDER BY created_at ASC',
      [params.id]
    );

    const submissions = await query(
      `SELECT s.*, u.display_name, u.email 
       FROM submissions s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.cycle_id = ?`,
      [params.id]
    );

    return NextResponse.json(
      { ...cycle[0], topics, submissions },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch cycle error:', error);
    return NextResponse.json({ error: 'Failed to fetch cycle' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();

    await query(
      'UPDATE study_cycles SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, params.id]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Update cycle error:', error);
    return NextResponse.json({ error: 'Failed to update cycle' }, { status: 500 });
  }
}
