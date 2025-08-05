import Header from '@/components/Header'
import { TreePine, Target, Users, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hakkımızda
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Gelecek nesillere yaşanabilir bir dünya bırakma misyonumuz
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Misyonumuz
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Yeşil Gelecek olarak, iklim değişikliği ve çevre kirliliği gibi küresel sorunlara 
                karşı mücadele etmek için ağaçlandırma projeleri yürütüyoruz. Amacımız, 
                gelecek nesillere daha yeşil ve yaşanabilir bir dünya bırakmaktır.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Bağışçılarımızın desteğiyle, Türkiye&apos;nin farklı bölgelerinde ağaçlandırma 
                çalışmaları yapıyor ve yerel topluluklarla işbirliği içinde sürdürülebilir 
                çevre projeleri geliştiriyoruz.
              </p>
            </div>
            <div className="flex justify-center">
              <TreePine className="h-64 w-64 text-green-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sürdürülebilirlik</h3>
              <p className="text-gray-700">
                Tüm projelerimizde sürdürülebilir çevre yaklaşımını benimsiyor ve 
                gelecek nesillerin ihtiyaçlarını göz önünde bulunduruyoruz.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Topluluk</h3>
              <p className="text-gray-700">
                Yerel topluluklarla işbirliği yaparak, onların ihtiyaçlarını anlayıp 
                birlikte çözümler üretiyoruz.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Şeffaflık</h3>
              <p className="text-gray-700">
                Tüm bağışçılarımıza karşı şeffaf olmayı taahhüt ediyor ve 
                projelerimizin sonuçlarını düzenli olarak paylaşıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nasıl Çalışıyoruz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bağış Yapın</h3>
              <p className="text-gray-700">
                İstediğiniz miktarda bağış yaparak ağaçlandırma projelerimize destek olun.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ağaç Dikin</h3>
              <p className="text-gray-700">
                Bağışınızla belirlenen sayıda ağaç, uzman ekibimiz tarafından dikilir.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Takip Edin</h3>
              <p className="text-gray-700">
                Dikilen ağaçların büyümesini ve projelerin gelişimini takip edin.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Etki Yaratın</h3>
              <p className="text-gray-700">
                Bağışınızla çevreye ve gelecek nesillere pozitif etki yaratın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Etkimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Çevresel Etki</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Karbon emisyonlarının azaltılması</li>
                <li>• Hava kalitesinin iyileştirilmesi</li>
                <li>• Toprak erozyonunun önlenmesi</li>
                <li>• Biyolojik çeşitliliğin korunması</li>
                <li>• Su kaynaklarının korunması</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sosyal Etki</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Yerel istihdamın artırılması</li>
                <li>• Topluluk bilincinin geliştirilmesi</li>
                <li>• Eğitim programlarının desteklenmesi</li>
                <li>• Sürdürülebilir kalkınmanın teşvik edilmesi</li>
                <li>• Gelecek nesillere örnek olma</li>
              </ul>
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