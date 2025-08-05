import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const ngos = await prisma.nGO.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(ngos)
  } catch (error) {
    console.error('Error fetching NGOs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch NGOs' },
      { status: 500 }
    )
  }
} 