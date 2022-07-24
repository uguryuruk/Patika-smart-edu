# Patika Smart Edu Project
## GENERAL
* Made with express, ejs, mongoose and mongoDB
* Includes authentication, using bcrypt

## HOW TO USE
### VISITOR-USER
* As a normal visitor (user) you can navigate between pages and list courses, with its creator teacher
* You can't see the dashboard unless logged in.
* You can filter courses by category.
* You can search courses with keywords.
* You can send a contact message (will be sent via nodemailer)
* You can register as a student or a teacher
### STUDENT
* As student, you can enroll courses, or quit

### TEACHER
* As a teacher, you can create new courses and see them in your dashboard.


# Patika-smart-edu- TÜRKÇE
Patika nodejs smart edu projesidir. Kurs oluşturulan, kursa hoca atanabilen, öğrencinin kurs alabildiği bir projedir.

## Dersler ve Yapılanlar:
### Ders 1-2
* Projenin temeli oluşturulmuş ve aktif menü yönlendirmesi yapılmıştır.
### Ders 3
* Ayrı route dosyası oluşturulmuştur.
* pageContoller ve app ile bağlanmıştır.
### Ders 4-7
* Course sayfası, listeleme ve tekil sayfa oluşturulmuştur.
### Ders 8
* Category modeli, controller ve kategoriye göre filtreleme eklendi.
### Ders 9
* Kayıt sayfası işlemleri, user modeli, kayıt sırasında hashed password (bcrypt)
### Ders 10
* Login işlemi
### Ders 11
* Session oluşturma
### Ders 12
* Logout işlemi(session destroy), ayrıca mongo-connect ile session saklama.
### ders 13-16 
* Role ve Route Protection işlemleri(middleware oluşturulması)
### Ders 17
* Kurs-öğretmen ilişkisi, kursun ait olduğu öğretmeni ve öğretmene ait kursları listeleme.

### Ders 18
* Öğrenci olarak Kursa kaydolma ve kayıt olduğu kursları görüntüleme
### Ders 19
* Kurstan çıkma (release)
* Text truncate (belli kısmı aşan metni ... yapma)
### Ders 20
* Arama fonksiyonu
* Tek kurs sayfasında kategorilerin eklenmesi
* Kursun altında öğretmen adının gözükmesi
### Ders 21
* Mail ayarları, iletişim sayfasından mail göndermek
### Ders 22
* İletişim sayfası, kurs sayfasına olumlu ve hata bildirimleri eklendi.

### Ders 23
* Register ve Login için Data validation yapıldı.
### Ders 24-25
* Kurs Silme ve Güncelleme Yapıldı (Teacher için)
### Ders 26
* Admin dashboard oluşturulması
* Kullanıcı silmek
* kullanıcı öğretmense, ilgili kurslarını silmek.
### Ders 27
* Kategori Ekleme - Silme
* Ana sayfaya istatistikleri yansıtma yapıldı.
