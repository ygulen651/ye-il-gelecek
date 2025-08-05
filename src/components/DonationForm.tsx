'use client'

import { useState } from 'react'
import { TreePine, Send, Loader2 } from 'lucide-react'

interface NGO {
  id: number
  name: string
  iban: string
}

interface DonationFormProps {
  ngos: NGO[]
}

export default function DonationForm({ ngos }: DonationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ngoId: '',
    amount: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const selectedNGO = ngos.find(ngo => ngo.id.toString() === formData.ngoId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage('Bağışınız başarıyla alındı! Sertifikanız e-posta ile gönderilecek.')
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          ngoId: '',
          amount: ''
        })
      } else {
        setMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      console.error('Donation form error:', error)
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl p-8 border border-green-200 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="currentColor" className="text-green-600"/>
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="currentColor" className="text-green-500"/>
        </svg>
      </div>

      <div className="flex items-center space-x-3 mb-8">
        <div className="relative">
          <TreePine className="h-8 w-8 text-green-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Bağış Yap
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <label htmlFor="fullName" className="block text-sm font-bold text-black mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Ad Soyad *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-bold text-black bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-green-300"
            />
          </div>

          <div className="relative group">
            <label htmlFor="email" className="block text-sm font-bold text-black mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              E-posta *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-bold text-black bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-green-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <label htmlFor="phone" className="block text-sm font-bold text-black mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Telefon *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-bold text-black bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-green-300"
            />
          </div>

          <div className="relative group">
            <label htmlFor="ngoId" className="block text-sm font-bold text-black mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              STK Seçin *
            </label>
            <select
              id="ngoId"
              name="ngoId"
              value={formData.ngoId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-bold text-black bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-green-300"
            >
              <option value="" className="font-bold text-black">STK seçin</option>
              {ngos.map((ngo) => (
                <option key={ngo.id} value={ngo.id} className="font-bold text-black">
                  {ngo.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative group">
          <label htmlFor="amount" className="block text-sm font-bold text-black mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Bağış Miktarı (TL) *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-bold text-black bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-green-300"
          />
        </div>

        {selectedNGO && (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl border-2 border-green-200 relative overflow-hidden">
            {/* Decorative Leaf */}
            <div className="absolute top-2 right-4 w-8 h-8 opacity-20">
              <svg viewBox="0 0 24 24" className="w-full h-full text-green-600">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <h3 className="font-bold text-black text-lg">{selectedNGO.name} - Ödeme Bilgileri</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-white/60 rounded-lg">
                <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-black">
                  <strong>IBAN:</strong> {selectedNGO.iban}
                </span>
              </div>
              
              <div className="flex items-start p-3 bg-white/60 rounded-lg">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-bold text-black">
                  Bağışınızı yaptıktan sonra dekontunuzu info@yesilgelecek.org adresine gönderebilirsiniz.
                </span>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className={`p-4 rounded-md ${message.includes('başarıyla') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Gönderiliyor...</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Send className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              </div>
              <span>Bağış Yap</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
} 