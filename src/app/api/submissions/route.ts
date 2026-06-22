import { query } from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { cycleId, userId, notesUrl } = await req.json();

    await query(
      `INSERT INTO submissions (cycle_id, user_id, notes_url, submitted_at, created_at) 
       VALUES (?, ?, ?, NOW(), NOW())`,
      [cycleId, userId, notesUrl]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { cycleId: string } }) {
  try {
    const submissions = await query(
      `SELECT s.*, u.display_name, u.email 
       FROM submissions s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.cycle_id = ? 
       ORDER BY s.submitted_at DESC`,
      [params.cycleId]
    );

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Fetch submissions error:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
