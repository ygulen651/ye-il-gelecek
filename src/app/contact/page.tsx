'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.')
        setFormData({
          name: '',
          email: '',
          message: ''
        })
      } else {
        setMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            İletişim
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Sorularınız için bizimle iletişime geçin
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Bize Yazın
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mesajınız *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {message && (
                  <div className={`p-4 rounded-md ${message.includes('başarıyla') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Mesaj Gönder</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                İletişim Bilgileri
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">E-posta</h3>
                    <p className="text-gray-700">info@yesilgelecek.org</p>
                    <p className="text-gray-700">destek@yesilgelecek.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Telefon</h3>
                    <p className="text-gray-700">+90 212 123 45 67</p>
                    <p className="text-gray-700">+90 532 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Adres</h3>
                    <p className="text-gray-700">
                      Yeşil Gelecek Derneği<br />
                      Çevre Mahallesi, Ekoloji Sokak No:1<br />
                      34000 İstanbul, Türkiye
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 p-6 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Çalışma Saatleri</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Pazartesi - Cuma:</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cumartesi:</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pazar:</span>
                    <span>Kapalı</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Sık Sorulan Sorular
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Bağışım nasıl takip edilebilir?
              </h3>
              <p className="text-gray-700">
                Bağışınızı yaptıktan sonra size e-posta ile sertifika gönderilir. 
                Ayrıca web sitemizden bağışçılar sayfasında bağışınızı görebilirsiniz.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Hangi bölgelerde ağaçlandırma yapıyorsunuz?
              </h3>
              <p className="text-gray-700">
                Türkiye'nin farklı bölgelerinde, ihtiyaç duyulan alanlarda ağaçlandırma 
                projeleri yürütüyoruz. Projelerimiz hakkında detaylı bilgi için iletişime geçebilirsiniz.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Bağış miktarı ne kadar olmalı?
              </h3>
              <p className="text-gray-700">
                Bağış miktarı tamamen size kalmıştır. Her miktar değerlidir ve 
                çevreye katkı sağlar. Minimum bağış miktarı 10 TL'dir.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Vergi indirimi alabilir miyim?
              </h3>
              <p className="text-gray-700">
                Evet, derneğimize yapılan bağışlar vergi indirimi kapsamındadır. 
                Bağış dekontunuzu maliye bakanlığına sunarak indirim alabilirsiniz.
              </p>
            </div>
          </div>
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