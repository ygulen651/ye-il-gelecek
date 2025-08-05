import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, ngoId, amount } = body

    // Validation
    if (!fullName || !email || !phone || !ngoId || !amount) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    // Calculate tree count (1 TL = 1 tree for demo)
    const treeCount = Math.floor(parseFloat(amount))

    // Create donation
    const donation = await prisma.donor.create({
      data: {
        fullName,
        email,
        phone,
        ngoId: parseInt(ngoId),
        amount: parseFloat(amount),
        treeCount,
      },
      include: {
        NGO: true
      }
    })

    // Send email with certificate
    await sendCertificateEmail(donation)

    return NextResponse.json({ 
      success: true, 
      message: 'Bağışınız başarıyla alındı',
      donation 
    })

  } catch (error) {
    console.error('Donation error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

async function sendCertificateEmail(donation: { fullName: string; email: string; amount: number; treeCount: number; NGO: { name: string }; createdAt: Date }) {
  // Resend ile gerçek e-posta gönderme
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
             const { data, error } = await resend.emails.send({
         from: 'Yeşil Gelecek <onboarding@resend.dev>',
         to: ['ygulen651@gmail.com'], // Test modunda sadece kendi e-postanıza gönderebilirsiniz
        subject: '🌱 Yeşil Gelecek - Bağış Sertifikanız',
        html: `
          <!DOCTYPE html>
          <html lang="tr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bağış Sertifikanız</title>
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">🌱 Yeşil Gelecek</h1>
                <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Geleceğe Yeşil Bir Dünya Bırakıyoruz</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 30px;">
                <h2 style="color: #374151; text-align: center; margin-bottom: 30px; font-size: 24px;">🎉 Bağış Sertifikanız</h2>
                
                <div style="background-color: #f0fdf4; padding: 25px; border-radius: 12px; border-left: 4px solid #059669; margin-bottom: 25px;">
                  <p style="margin: 0 0 15px 0; font-size: 16px;"><strong>Sayın ${donation.fullName},</strong></p>
                  <p style="margin: 0; font-size: 16px; line-height: 1.6;">Yeşil Gelecek projemize yaptığınız değerli bağış için içtenlikle teşekkür ederiz! 🌿</p>
                  <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;"><em>Test: Bu e-posta ${donation.email} adresine gönderilecek</em></p>
                </div>
                
                <!-- Certificate Details -->
                <div style="background-color: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb; margin-bottom: 25px;">
                  <h3 style="color: #059669; margin-top: 0; margin-bottom: 20px; font-size: 20px;">📋 Bağış Detayları</h3>
                  
                  <div style="display: grid; gap: 15px;">
                    <div style="display: flex; justify-content: space-between; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
                      <span style="font-weight: 600; color: #374151;">Bağış Miktarı:</span>
                      <span style="color: #059669; font-weight: 600;">${donation.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
                      <span style="font-weight: 600; color: #374151;">Dikilen Ağaç Sayısı:</span>
                      <span style="color: #059669; font-weight: 600;">🌳 ${donation.treeCount} ağaç</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
                      <span style="font-weight: 600; color: #374151;">STK:</span>
                      <span style="color: #059669; font-weight: 600;">${donation.NGO.name}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
                      <span style="font-weight: 600; color: #374151;">Bağış Tarihi:</span>
                      <span style="color: #059669; font-weight: 600;">${new Date(donation.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Impact Message -->
                <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
                  <h3 style="color: #065f46; margin-top: 0; margin-bottom: 15px;">🌍 Etkiniz</h3>
                  <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #065f46;">
                    Bağışınız sayesinde <strong>${donation.treeCount} ağaç</strong> dikilecek ve gelecek nesillere daha yeşil, daha temiz bir dünya bırakacağız. 
                    Her ağaç, geleceğimiz için bir umut tohumudur. 🌱
                  </p>
                </div>
                
                <!-- Call to Action -->
                <div style="text-align: center; margin-bottom: 25px;">
                  <a href="#" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    🌱 Daha Fazla Bilgi
                  </a>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f9fafb; padding: 25px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                  Bu e-posta Yeşil Gelecek tarafından otomatik olarak gönderilmiştir.
                </p>
                <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                  © 2024 Yeşil Gelecek. Tüm hakları saklıdır.
                </p>
              </div>
            </div>
          </body>
          </html>
        `
      });

      if (error) {
        console.error('❌ Resend e-posta hatası:', error);
        return;
      }

      console.log('✅ Gerçek e-posta başarıyla gönderildi:', data?.id);
      return;
      
    } catch (error) {
      console.error('❌ Resend e-posta gönderme hatası:', error);
      return;
    }
  }

  // Fallback: Test ortamı için Ethereal Email
  console.log('📧 Resend API anahtarı bulunamadı, test e-postası gönderiliyor...');
  
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const mailOptions = {
    from: '"Yeşil Gelecek" <noreply@yesilgelecek.com>',
    to: donation.email,
    subject: '🌱 Yeşil Gelecek - Bağış Sertifikanız',
    html: `
      <!DOCTYPE html>
      <html lang="tr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bağış Sertifikanız</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">🌱 Yeşil Gelecek</h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Geleceğe Yeşil Bir Dünya Bırakıyoruz</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #374151; text-align: center; margin-bottom: 30px; font-size: 24px;">🎉 Bağış Sertifikanız</h2>
            
            <div style="background-color: #f0fdf4; padding: 25px; border-radius: 12px; border-left: 4px solid #059669; margin-bottom: 25px;">
              <p style="margin: 0 0 15px 0; font-size: 16px;"><strong>Sayın ${donation.fullName},</strong></p>
              <p style="margin: 0; font-size: 16px; line-height: 1.6;">Yeşil Gelecek projemize yaptığınız değerli bağış için içtenlikle teşekkür ederiz! 🌿</p>
            </div>
            
            <!-- Certificate Details -->
            <div style="background-color: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb; margin-bottom: 25px;">
              <h3 style="color: #059669; margin-top: 0; margin-bottom: 20px; font-size: 20px;">📋 Bağış Detayları</h3>
              
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; justify-content: space-between; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
                  <span style="font-weight: 600; color: #374151;">Bağış Miktarı:</span>
                  <span style="color: #059669; font-weight: 600;">${donation.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
                  <span style="font-weight: 600; color: #374151;">Dikilen Ağaç Sayısı:</span>
                  <span style="color: #059669; font-weight: 600;">🌳 ${donation.treeCount} ağaç</span>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
                  <span style="font-weight: 600; color: #374151;">STK:</span>
                  <span style="color: #059669; font-weight: 600;">${donation.NGO.name}</span>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
                  <span style="font-weight: 600; color: #374151;">Bağış Tarihi:</span>
                  <span style="color: #059669; font-weight: 600;">${new Date(donation.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </div>
            
            <!-- Impact Message -->
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
              <h3 style="color: #065f46; margin-top: 0; margin-bottom: 15px;">🌍 Etkiniz</h3>
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #065f46;">
                Bağışınız sayesinde <strong>${donation.treeCount} ağaç</strong> dikilecek ve gelecek nesillere daha yeşil, daha temiz bir dünya bırakacağız. 
                Her ağaç, geleceğimiz için bir umut tohumudur. 🌱
              </p>
            </div>
            
            <!-- Call to Action -->
            <div style="text-align: center; margin-bottom: 25px;">
              <a href="#" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                🌱 Daha Fazla Bilgi
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 25px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
              Bu e-posta Yeşil Gelecek tarafından otomatik olarak gönderilmiştir.
            </p>
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
              © 2024 Yeşil Gelecek. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.verify();
    console.log('✅ Test SMTP bağlantısı başarılı');
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test e-posta başarıyla gönderildi:', info.messageId);
    
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log('📧 Test e-posta önizleme linki:', previewUrl);
    
  } catch (error) {
    console.error('❌ Test e-posta gönderme hatası:', error instanceof Error ? error.message : error);
  }
} 