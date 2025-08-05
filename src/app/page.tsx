import Header from '@/components/Header'
import StatsCard from '@/components/StatsCard'
import DonorCard from '@/components/DonorCard'
import DonationForm from '@/components/DonationForm'
import LogoSlider from '@/components/LogoSlider'
import { TreePine, MapPin, Users } from 'lucide-react'
import { prisma } from '@/lib/prisma'

async function getStats() {
  const totalDonors = await prisma.donor.count()
  const totalAmount = await prisma.donor.aggregate({
    _sum: {
      amount: true
    }
  })
  const totalTrees = await prisma.donor.aggregate({
    _sum: {
      treeCount: true
    }
  })

  return {
    totalDonors,
    totalAmount: totalAmount._sum.amount || 0,
    totalTrees: totalTrees._sum.treeCount || 0
  }
}

async function getTodayDonors() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return await prisma.donor.findMany({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow
      }
    },
    include: {
      NGO: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  })
}

async function getNGOs() {
  return await prisma.nGO.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}

export default async function Home() {
  const [stats, todayDonors, ngos] = await Promise.all([
    getStats(),
    getTodayDonors(),
    getNGOs()
  ])

  const afforestedArea = Math.round(stats.totalTrees * 10) // Her ağaç 10m²

  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/Basliksiz-2.png"
          alt="Yeşil Gelecek"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          style={{
            objectPosition: 'center center'
          }}
        />
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className="bg-green-600 text-white px-12 py-6 rounded-2xl font-black hover:bg-green-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-110 text-xl border-4 border-white">
              Bağış Yap
            </button>
            <button className="bg-white text-green-700 px-12 py-6 rounded-2xl font-black hover:bg-green-600 hover:text-white transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-110 text-xl border-4 border-green-600">
              Daha Fazla Bilgi
            </button>
          </div>
        </div>
      </section>

      {/* Today's Donors Section - İLK */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Bugünün Bağışçıları
          </h2>
          {todayDonors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todayDonors.map((donor) => (
                <DonorCard
                  key={donor.id}
                  fullName={donor.fullName}
                  amount={donor.amount}
                  treeCount={donor.treeCount}
                  createdAt={donor.createdAt}
                  ngoName={donor.NGO.name}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Bugün henüz bağış yapılmamış.</p>
            </div>
          )}
        </div>
      </section>

      {/* Donation Form Section - İKİNCİ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DonationForm ngos={ngos} />
        </div>
      </section>

      {/* Stats Section - ÜÇÜNCÜ */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Bağışlarımız
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsCard
              title="Toplam Bağışlanan Ağaç"
              value={stats.totalTrees.toLocaleString('tr-TR')}
              icon={TreePine}
              description="Dikilen ağaç sayısı"
            />
            <StatsCard
              title="Toplam Ağaçlandırılan Alan"
              value={`${afforestedArea.toLocaleString('tr-TR')} m²`}
              icon={MapPin}
              description="Ağaçlandırılan alan"
            />
            <StatsCard
              title="Toplam Bağış"
              value={stats.totalAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              icon={Users}
              description="Toplam bağış miktarı"
            />
          </div>
        </div>
      </section>

      {/* NGO Logos Section */}
      <LogoSlider ngos={ngos} />

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Yeşil Gelecek</h3>
              <p className="text-green-100">
                Gelecek nesillere yaşanabilir bir dünya bırakmak için çalışıyoruz.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">İletişim</h3>
              <p className="text-green-100">
                info@yesilgelecek.org<br />
                +90 212 123 45 67
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Sosyal Medya</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-green-100 hover:text-white">Twitter</a>
                <a href="#" className="text-green-100 hover:text-white">Facebook</a>
                <a href="#" className="text-green-100 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
            <p>&copy; 2024 Yeşil Gelecek. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
