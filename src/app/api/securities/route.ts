import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const items = await prisma.security.findMany({ orderBy: { updatedAt: 'desc' }, take: 100 });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body = await req.json();
  // Minimal validation to keep it simple for now:
  const { securityKey, name, type = 'stock', currency = 'USD', isActive = true } = body || {};
  if (!securityKey || !name) {
    return NextResponse.json({ error: 'securityKey and name are required' }, { status: 400 });
  }
  const created = await prisma.security.create({
    data: {
      securityKey: String(securityKey).trim(),
      name: String(name).trim(),
      type: String(type).trim(),
      currency: String(currency).trim().toUpperCase(),
      isActive: Boolean(isActive),
    },
  });
  return NextResponse.json({ item: created }, { status: 201 });
}

