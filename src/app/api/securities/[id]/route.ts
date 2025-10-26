import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const item = await prisma.security.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const { securityKey, name, type = 'stock', currency = 'USD', isActive = true } = body || {};
  if (!securityKey || !name) {
    return NextResponse.json({ error: 'securityKey and name are required' }, { status: 400 });
  }
  const updated = await prisma.security.update({
    where: { id: params.id },
    data: {
      securityKey: String(securityKey).trim(),
      name: String(name).trim(),
      type: String(type).trim(),
      currency: String(currency).trim().toUpperCase(),
      isActive: Boolean(isActive),
    },
  });
  return NextResponse.json({ item: updated });
}

export async function DELETE(_: Request, { params }: Params) {
  await prisma.security.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

