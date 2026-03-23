import { NextResponse } from 'next/server';
import { getAllInfo, addInfo } from '@/lib/db';

export async function GET() {
  try {
    const data = getAllInfo();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch info' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, author, password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const id = addInfo(title, content, author || 'Anonymous');
    return NextResponse.json({ message: 'Success', id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add info', details: error.message }, { status: 500 });
  }
}
