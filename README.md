# Next.js Auth0 Kimlik Doğrulama Projesi

Bu proje, Next.js 14 (App Router), Auth0 ve NextAuth.js kullanarak güvenli bir kimlik doğrulama ve yetkilendirme sistemi sunar. Proje, rol tabanlı erişim kontrolü ve korumalı sayfalar içerir.

## Özellikler

- Auth0 ile OAuth tabanlı kimlik doğrulama
- JWT tabanlı oturum yönetimi
- Kullanıcı ve admin rolleriyle rol tabanlı erişim
- Korumalı sayfalar ve yönlendirme
- TailwindCSS ile modern ve duyarlı arayüz
- TypeScript desteği


## Kullanım

- Giriş yapmak için ana sayfada Auth0 ile giriş butonunu kullanın.
- Başarılı giriş sonrası kullanıcılar `/dashboard` sayfasına yönlendirilir.
- Eğer kullanıcı admin rolündeyse, admin paneline erişim için ek bir bağlantı görünür.
- `/dashboard/admin` sayfası sadece admin rolüne sahip kullanıcılar tarafından görüntülenebilir.
- Çıkış yapmak için paneldeki "Çıkış Yap" butonunu kullanabilirsiniz.

## Proje Yapısı

- `src/app` : Sayfalar ve API route'ları
- `src/components` : Tekrar kullanılabilir React bileşenleri
- `src/auth.ts` : Auth0 ve NextAuth.js yapılandırması
- `middleware.ts` : Rota koruma ve rol kontrolü

## Rol Tabanlı Erişim

- **Kullanıcı:** Dashboard'a erişebilir.
- **Admin:** Dashboard ve admin paneline erişebilir.

