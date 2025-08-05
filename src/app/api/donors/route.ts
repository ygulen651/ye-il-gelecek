import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const donors = await prisma.donor.findMany({
      include: {
        NGO: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(donors)
  } catch (error) {
    console.error('Error fetching donors:', error)
    return NextResponse.json(
      { error: 'Bağışçılar yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 