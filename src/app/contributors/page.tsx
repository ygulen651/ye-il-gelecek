'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import DonorCard from '@/components/DonorCard'
import { Search, Filter, Calendar } from 'lucide-react'

interface Donor {
  id: number
  fullName: string
  email: string
  phone: string
  amount: number
  treeCount: number
  createdAt: Date
  NGO: {
    id: number
    name: string
  }
}

interface NGO {
  id: number
  name: string
}

export default function ContributorsPage() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [ngos, setNgos] = useState<NGO[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNGO, setSelectedNGO] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    fetchDonors()
    fetchNGOs()
  }, [])

  const fetchDonors = async () => {
    try {
      const response = await fetch('/api/donors')
      const data = await response.json()
      setDonors(data)
    } catch (error) {
      console.error('Error fetching donors:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchNGOs = async () => {
    try {
      const response = await fetch('/api/ngos')
      const data = await response.json()
      setNgos(data)
    } catch (error) {
      console.error('Error fetching NGOs:', error)
    }
  }

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesNGO = !selectedNGO || donor.NGO.id.toString() === selectedNGO
    const matchesDate = !selectedDate || donor.createdAt.toISOString().split('T')[0] === selectedDate
    
    return matchesSearch && matchesNGO && matchesDate
  })

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedNGO('')
    setSelectedDate('')
  }

  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bağışçılarımız
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Yeşil Gelecek projemize destek olan değerli bağışçılarımız
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 rounded-lg p-6">
            <h2 className="text-xl font-black text-black mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtreler
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Bağışçı adı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-black text-black"
                />
              </div>

              {/* NGO Filter */}
              <select
                value={selectedNGO}
                onChange={(e) => setSelectedNGO(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-black text-black"
              >
                <option value="" className="font-black text-black">Tüm STK&apos;lar</option>
                {ngos.map((ngo) => (
                  <option key={ngo.id} value={ngo.id} className="font-black text-black">
                    {ngo.name}
                  </option>
                ))}
              </select>

              {/* Date Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-black text-black"
                />
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-black"
              >
                Filtreleri Temizle
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Donors List Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Bağışçı Listesi
            </h2>
            <p className="text-gray-600">
              {filteredDonors.length} bağışçı bulundu
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Yükleniyor...</p>
            </div>
          ) : filteredDonors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor) => (
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
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm || selectedNGO || selectedDate 
                  ? 'Arama kriterlerinize uygun bağışçı bulunamadı.'
                  : 'Henüz bağışçı bulunmuyor.'
                }
              </p>
            </div>
          )}
        </div>
      </section>

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