import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Örnek STK'ları ekle
  const ngo1 = await prisma.nGO.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'TEMA Vakfı',
      logoUrl: '/Tema_Vakfı_logo.png',
      iban: 'TR12 0001 0002 3456 7890 1234 56'
    }
  })

  const ngo2 = await prisma.nGO.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Kartap',
      logoUrl: '/kartap logo.png',
      iban: 'TR98 0001 0003 4567 8901 2345 67'
    }
  })

  const ngo3 = await prisma.nGO.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'İKEV',
      logoUrl: '/İkev logo.png',
      iban: 'TR55 0001 0004 5678 9012 3456 78'
    }
  })

  // Örnek bağışçıları ekle
  const donor1 = await prisma.donor.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      fullName: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '0532 123 45 67',
      ngoId: 1,
      amount: 100.0,
      treeCount: 10,
      createdAt: new Date()
    }
  })

  const donor2 = await prisma.donor.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      fullName: 'Fatma Demir',
      email: 'fatma@example.com',
      phone: '0533 987 65 43',
      ngoId: 2,
      amount: 150.0,
      treeCount: 15,
      createdAt: new Date()
    }
  })

  const donor3 = await prisma.donor.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      fullName: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      phone: '0534 555 44 33',
      ngoId: 3,
      amount: 200.0,
      treeCount: 20,
      createdAt: new Date()
    }
  })

  console.log({ ngo1, ngo2, ngo3, donor1, donor2, donor3 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 