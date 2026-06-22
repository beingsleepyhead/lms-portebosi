import { query } from '@/lib/mysql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cycles = await query(
      `SELECT id, subject, chapter, start_date, deadline, status, created_by, created_at 
       FROM study_cycles 
       ORDER BY created_at DESC`
    );

    // Fetch topics for each cycle
    const cyclesWithTopics = await Promise.all(
      cycles.map(async (cycle: any) => {
        const topics = await query(
          'SELECT id, name, math_numbers FROM topics WHERE cycle_id = ? ORDER BY created_at ASC',
          [cycle.id]
        );
        return { ...cycle, topics };
      })
    );

    return NextResponse.json(cyclesWithTopics, { status: 200 });
  } catch (error) {
    console.error('Fetch cycles error:', error);
    return NextResponse.json({ error: 'Failed to fetch cycles' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { subject, chapter, topics, deadline, studyPhaseDuration, createdBy } = await req.json();

    const result = await query(
      `INSERT INTO study_cycles (subject, chapter, start_date, deadline, study_phase_duration, status, created_by, created_at) 
       VALUES (?, ?, NOW(), ?, ?, 'planning', ?, NOW())`,
      [subject, chapter, deadline, studyPhaseDuration, createdBy]
    );

    const cycleId = (result as any).insertId;

    // Insert topics
    if (topics && topics.length > 0) {
      for (const topic of topics) {
        await query(
          `INSERT INTO topics (cycle_id, name, math_numbers, created_at) 
           VALUES (?, ?, ?, NOW())`,
          [cycleId, topic.name, topic.mathNumbers?.join(',') || null]
        );
      }
    }

    return NextResponse.json({ id: cycleId }, { status: 201 });
  } catch (error) {
    console.error('Create cycle error:', error);
    return NextResponse.json({ error: 'Failed to create cycle' }, { status: 500 });
  }
}
