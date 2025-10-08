http://localhost:8000
Menjawab Pertanyaan
1.Cara mengimplementasikan checklist di atas
-Membuat direktori baru yaitu BWBall-shop
-Membuat dan mengaktifkan virtual environment
-Membuat file requirements.txt dan menginstall dependencies (dengan pip install -r requirements.txt)
-Membuat proyek Django dengan nama BWBall_shop
-Membuat file .env yang digunakan untuk development lokal dan file .env.prod untuk production deployment
-Memodifikasi file settings.py yaitu; menambahkan load_dotenv(), mengatur allowed host, menambahkan konfig production, dan mengubah konfig database
-Menjalankan server dengan migrasi database dahulu lalu menjanlakan server django
-Membuat repo baru yaitu BWBall-shop, menjalankan git init di terminal untuk melacak perubahan file
-Membuat berkas .gitignore dan mengisi berkas tersebut agar berkas-berkas yang tidak penting tidak di push ke repo github
-Menghubungkan repo lokal dengan repo github, membuat branch, dan melakukan add, commit, push dari repo lokal
-Membuat project baru di PWS dengan crate new project, kemudian mengisi raw environment dengan isi file yang ada di .env.prod
-Menambahkan allowed host di settings.py dengan url deployment pws
-Melakukan add, commit, push ke repo github dan menjalankan git remote add pws, git branch, dan git push pws (saat push akan diminta username dan password yang ada saat membuat project baru di pws)
-Menambahkan aplikasi baru yaitu main di BWBall-shop serta mendaftarkan apliasi main tersebut ke dalam proyek (dengan menambahkan 'main' pada bagian akhir installed_apps di settings.py)
-Menambahkan function show_main di views.py dimana function ini memiliki parameter request, didalam function tsbt terdapat context (dictionary data pribadi) serta ada return render untuk me-render tampilan main.html 
-Membuat direktori baru yaitu templates di main, kemudian membuat berkas baru yaitu main.html dan diisi dengan nama aplikasi, nama, kelas (menggunakan template variabel)
-Membuat file models.py di main dan mengisi models.py dengan atribut nama, price, description, thumbnail, category, is_featured, stock, dan rating. Dan membuat method __str__ untuk mengembalikan represntesi string
-Melakukan migrasi model dengan makemigrations dan migrate
-Membuat berkas urls.py di direktori main dan mengisi file urls.py tersebut. Terakhir menjalankan proyek Django dengan python manage.py runserver

2.HTTP Request (Client(Browser)) -> urls.py 
                                        |
                        models.py  <- views.py -> HTTP Response(HTML)
                                        ^
                                        |
                                Template (filename).html
-urls.py berperan sebegai router global yang menerima request masuk dan meneruskan ke app yang sesuai
-views.py berperan menangani request dengan mengambil data dari model, membuat context, dan me-render templat
-models.py digunakan untuk mendefinisikan model baru dan berisikan field untuk merepresentasikan kolom di database
-berkas html ini akan menerima context dari views.py dan akan menghasilkan html akhir

3.Fungsi utama settings.py adalah sebagai pusat konfigurasi, seperti menentukan aplikasi yang terinstal(INSTALLED_APPS), 
membuat pengaturan keamanan (ALLOWED_HOSTS dan SECRET_KEY), Mengatur lokasi template (TEMPLATES), dan masih banyak lagi

4.Migrasi sendiri merupakan cara Django melacak perubahan struktur database. 
Cara kerja migrasi databse di django yakni pertama-tama akan menjalankan 'makemigrations' yang akan mencatat perubahan model 
ke dalam file migrasi tetapi belum  mengubah database. Kemudian dilanjutkan dengan perintah 'migrate' agar django membaca file 
migrasi tersebut dan akan mengubah database sesuai model terbaru

5.Menurut saya framework django dijadikan permulaan karena 
a. Web framework DJango open source
b. Dapat digunakan untuk skala yang besar ataupun kecil
c. Dapat digunakan untuk berbagai jenis aplikasi (versatile) untuk berbagai macam kegunaan
d. Banyak fitur bawaan tampa perlu install library tambahan
e. ORM (Object Relational Mapper) memudahkan akses database tanpa harus menulis query SQL

6.Di tutorial 1 asdos saya yaitu ka sayyid sangat fast respon dan sangat membantu kalau saya memiliki kendala



---------------------- R E A D M E T U G A S 3 ----------------------
1.Kita memerlukan data delivery untuk mengimplementasikan sebuah platform karena merupakan sebuah fondasi untuk komunikasi antar klien. Dimana sebuah platform harus dapat mengirim dan menerima data secara dinamin antara client dan seerver. Komunikasi di web dilakukan dengan mengirimkan HTTPS Request dan menerima HTTP Response, dimama data delivery akan memastikan bahwa setiap request direspon dengan data yang sesuai dalam format HTML, XML, ataupun JSON. Dengan menggunakan data delivery maka akan membedakan komunikasi web secara sinkronus dimana user harus menggu setiap halaman dimuat seluruhnya dan asinkronus dmana user dapat berinteraksi dengan halaman walaupun data masih loading

2.Menurut saya dianatara XML dan JSON yang lebih baik untuk diaplikasikan dalam membuat web adalah JSON. Dimana JSON memiliki sintaks yang lebih ringkas sehingga lebih mudah di baca dan di pahami. Selain itu proses parsing di JSON lebih efisien di bandingkan XML karena JSON tidak memerlukan DOM parser melainkan kita dapat menggunakan JSON.parse() untuk mengonversikan string json menjadi objek Java Script yang dapat langsung digunakan.JSON lebih populer digunakan di bandingkan XML karena json berbentuk dictionary yg terdiri atas key dan value, sehingga ketika kita mau mengambil misal "title" kita dapat langsung mendapatkannya. Sedangkan XML jarang di gunakan karena lebih rumit dan double-double untuk mendapatkan suatu value dimana kita harus mengecek dari root, kemudian diubah bentuknya mirip json baru dapat di ambil valuenya.

3.Fungsi dari method is_valid() pada form DJango adalah memvalidasi data yang dikirimkan oleh pengguna melalui form. Awalnya form yg di submit oleh user akan diterima oleh django, dan akan di verifikasi apakah data nya sesuai dengan aturan yang ada misalnya apakah semua form sudah ke isi atau apakah input nya sesuai dengan field yg seharusnya. Kemudian jika sudah sesuai maka is_valid() akan mengembalikan true, dan sebaliknya. Kita membutuhkan is_valid ini untuk memastikan bahwa semua data yang masuk dan disimpan dalam database konsisten dan valid serta jika terdapat kesalahan dari user kita dapat membuat feedback pesan agar mereka tahu salahnya dimana dan dapat menginput ulang.

4.csrf_token merupakan singkatan dari Cross-Site Request Forgery token yang memiliki fungsi utama sebagai pelindung dari serangan CRSF(user dipaksa untuk melakukan tindakan yg tidak sesuai dengan web tersebut). Oleh karena itu tentu saja kita membutuhkan csrf_token untuk menjaga keamanan dan integritas data. Jika kita tidak menambahkan csrf_token di dalam form, selain rentan terhadap serangan, formulir juga tidak dapat memproses request untuk POST, PUT, maupun DELETE karena jika csrf_token tidak ada atau tidak valid maka secara default django akan menolak request dan akan menghasilkan error berupa "403 forbidden". Cara penyerang memanfaatkan csrf_token adalah dengan membuat halaman web yang berisi form tersembunyi ataupun dengan menipu user yang sedang login ke aplikasi untuk membuka halaman berbahaya.

5.Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
-Saya membuat direktori templates pada root folder kemudian membuat file base.html yang menjadi template dasar untuk keseluruhan
-Di settings.py pada direktori BWBall_shop saya menambahkan pada variabel templates dengan kode BASE_DIR/'templates'
-Pada main.html saya menambahkan baris yang mengextend dari base.html 
-Selanjutnya pada views.py saya menambahkan function add_product dan show_product terlebih dahulu serta mengimport beberapa modul
-Saya membuat file baru di direktori main yaitu forms.py untuk membuat struktur form yang akan di isi oleh user ketika menambahkan produk dan akan menerima data produk
-Saya mengubah urls.py pada direktori main dengan menambahkan path untuk add_product dan show_product
-Kemudian saya membuat perubahan di file main.html serta menambahkan 3 files terlebih dahulu di templates pada direktori main yaitu
a.main.html -> saya membuat 2 button yaitu score board dan juga our product, dimana score board nantinya akan menampilkan jumlah score pertandingan terbaru saat ada liga, sedangkan our product berisi product product yang di jual oleh BWBall-shop
b.score_board.html -> ini baru di isi dengan informasi namun rencananya akan saya tampilkan score pertandingan terbaru dan ada histori score pertandingan sebelumnya
c.add_product.html -> berfungsi untuk menambahkan suatu produk dimana terdapat form yg harus di isi
-Pada models.py saya menambahkan is_favorite, kemudian saya melakukan migrasi data lagi karena terdapat perubahan di models
-Kemudian di views.py saya menambahkan lagi method product_list, dimana di halaman our product akan ada 3 button yaitu favorite, unfavorite, dan all products. Saya memisahkan antara produk favorit dan tidak agar memudahkan user untuk melihat produk rekomen serta default ketika kita membuka page our product adalah menampilkan product favorite
-Kemudian saya membuat file baru di direktori main yaitu product_list yang akan menampilkan produk yang telah di tambahkan serta di setiap produknya terdapat button untuk melihat details produk
-Selanjutnya di settings.py saya menambahkan url deployment pws saya pada vaiabel CSRF_TRUSTED_ORIGIN
-Kemudian di views.py saya juga menambahkan 4 fungsi baru yaitu show_xml, show_json, show_xml_by_id, dan show_json_by_id
-Sebagai penutup saya melakukan add, commit, push ke dalam github dan PWS


6.Di tutorial 2 asdos saya yaitu ka sayyid sangat fast respon dan sangat membantu kalau saya memiliki kendala

#Hasil postman
![Hasil Postman](images/hasil_postman.png)



---------------------- R E A D M E T U G A S 4 -----------------------------
1.Apa itu Django AuthenticationForm? Jelaskan juga kelebihan dan kekurangannya.
Django AuthenticationForm merupakan from bawaan Django yang digunakana saat proses memverifikasi seseorang ketika login. From ini secara otomatis akan memvalidasi username dengan password, serta kita tidak perlu membuat form login dari nol karena sudah tedapat class yang di siapkan oleh Django.
#Kelebihan AuthenticationForm
a. Dapat dikostumisasi ketika ingin menambahkan verfikasi seperti tanggal lahir dengan meng-extend
b. Terdapat keamanan bawaan sehingga menghindari kesalahan umum saat membuat login system sendiri
c. Praktis karena sudah ada form login bawaan django sehingga tidak perlu membuat dari awal
#Kekurangan AutheticationForm
a. Tampilan dari authetication form sederhana sehingga perlu penyesuaian dengan desian UI/UX agar memiliki tampilan lebih menarik
b. Keamanan tambahan seperti CAPTHA ataupun 2FA tidak terdapat di sistem keamanan bawaan sehingga perlu ditambahkan secara manual

2.Apa perbedaan antara autentikasi dan otorisasi? Bagaiamana Django mengimplementasikan kedua konsep tersebut?
Perbedaan antara autentikasi dengan otorisasi yaitu, autentikasi merupakan proses memverifikasi data diri kita saat berusaha login, sedangkan otorisasi merupakan proses verifikasi apa saja yang dapat dilakukan oleh seseorang sesuai dengan rolenya.
#Pengimplementasian Autentikasi
a. Django menyediakan user model bawaan yang standar seperti username, password, dll
b. Password disimpan dalam bentuk hash dan terdapat beberapa function bawaan seperti authenticate untuk meverifikasi kredensial, login untuk menyimpan user ke session, dan logout untuk menghapus session user.
#Pengimplementasian Otorisasi
a. Terdapat permission system dimana setiap model memiliki izin otomatis untuk add,d elete, change, dan view
b. terdapat groups yang berisi kumpulan permission serta ada decorator untuk membatasi akses user sesuai dengan role nya

3.Apa saja kelebihan dan kekurangan session dan cookies dalam konteks menyimpan state di aplikasi web?
-SESSION
#Kelebihan
a.Ukuranya lebih fleksibel yakni dapat menyimpan data yang lebih besar daripada cookie
b.Data sensitif lebih aman karena disimpannya di server bukan di browser
c.Terdapat database model untuk menyimpan state user
#Kekurangan
a.Tetap membutuhkan cookie untuk menyimpan session ID agar proses identifikasi dapat dijalankan
b.Diperlukan manajemen yang baik untuk memastikan masa berlaku session dab logout, serta menjaga dari serangan seperti session hijacking
-COOKIES
#Kelebihan
a.Dapat di gunakan secara langsung karena data di simpan di dalam browser sehingga saat terdapat request otomatis terkirim ke server
b.Dapat digunakan lintas browser dengan menggunakan persistent cookie
#Kekurangan
a.Ukurannya terbatas hanya sekitar 4KB per cookie sehingga hanya cocok di gunakan oleh data yang kecil
b.Rawan terhadap serangan seperti Cross Site Scripting dimana cookie dapat tercuri

4.Apakah penggunaan cookies aman secara default dalam pengembangan web, atau apakah ada risiko potensial yang harus diwaspadai? Bagaimana Django menangani hal tersebut?
Secara default cookies tidak sepenuhnya aman dikarenakan cookies merupakan data yang disimpan langsung di browser. Risiko yang dapat terjadi misalnya Cross Site Scripting(XSS) dimana attacker dapat menucri cookie user, Session hijacking yaitu attacker dapat memakai session ID palsu untuk menjadi user lain, dan Cross Sote Reqeuest Forgery dimana attacker dapat memanfaatkan cookie terdapat di setiap request. Django menangani hal ini dengan menyediakan beberapa proteksi bawaaan seperti Session framework yaitu untuk data penting di simpannya di server sedangkan cookie hanya menyimpan session ID. Selain itu terdapat Secure flag dimana cookie hanya di kirim melalui HTTPS bukan HTTP biasa.

5.Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
-Dalam views.py saya menambahkan beberapa import untuk memudahkan pembuatan formulir pendataan pengguna ke dalam aplikasi web, serta beberapa import untuk kegiatan login dan logout
-Menambahkan import unruk date, reverse, serta HttpResponseRedirect
-Membuat function baru yaitu register di views.py dan menambahkan import register di urls.py serta menambahkan pathnya
-Membuat file register.html di direktori main/templates untuk membuat page baru agar user dapat mendaftarkan diri ke aplikasi web
-Membuat function login_user di views.py isinya di tambahkan juga dengan last_login dan menambahkan import login_useer ke urls.py dan menambahkan path login_user
-Membuat file login.html di direktori main/templates untuk membuat page baru agar sebelum masuk ke aplikasi akan diverifikasi apakah user sudah memiliki akun
-Membuat function logout_user dan menambahkan import logout_user ke urls.py dan menambahkan pathnya kedalam urlpatterns
-Diatas function show_main dan show_product ditambahkan @login_required 
-Menambahkan last_login ke dalam variabel context yang ada di views.py pada function show_main
-Menambahkan delete_cookie di functin logout_iuser di views.py untuk menghapus cookie las_login saat user logout/keluar dari akunnya
-Menambahkan current_user di context pada function show_main untuk menunjukkan user yang sedang login saat ini
-Di main.html saya memanggil current_user untuk menjadi header saat user pertama kali login
-Menambahkan keterangan sesi terakhir login di main.html di bawah seluruh button yg tersedia di home page/main.html
-Untuk menghubungkan Product dengan User maka saya mengubah models yang ada dengan menambahkan user di dalamnya kemudian saya melakukan migrate untuk mengupdate models yang terbaru agar tetap sesuai
-Menambahkan kode product_entry pada function add_product di file views.py
-Menambahkan author yang menambahkan sebuah produk pada file product_details.html di direktori main/templates
-Melakukan add, commit, dan push 


---------------------- R E A D M E T U G A S 5 -----------------------------
1.Jika terdapat beberapa CSS selector untuk suatu elemen HTML, jelaskan urutan prioritas pengambilan CSS selector tersebut!
Urutan prioritas pengambilan CSS selector ketika ada beberapa CSS selector yg mengatur elemen HTML yang sama adalah browser akan memilih urutan berdasarkan urutan deklarasi dan spesifisitas. Urutannya adalah:
-⁠ ⁠!important misalnya
p {
  color:pink !important;
}
ini yang akan di pakai meskipus ada inline style ataupun ID
-⁠ ⁠Inline Style misalnya 
<p style="color: blue;">Teks</p> maka properti color blue akan di pilih meskipun terdapat aturan lain di file CSS
- ⁠ID Selector misalnya
#title {
  color: pink;
}
selector #title akan lebih dominan di bandingkan .class ataupun tag
-⁠ ⁠Class, Atribut dan Pseudo-clas Selector misalnya
.information {
  color: yellow;
}
input[type="text"] {
  border: 2px solid black;
}
a:hover {
  color: red;
}
-⁠ ⁠Elemen selector & Pseudo element misalnya
p {
  color: purple;
}
p::first-line {
  font-weight: bold;
}
-⁠ ⁠Urutan Deklarasi misalnya
p {
  color: blue;
}
p {
  color: red;
}
karena punya spesifisitas yg sama maka aturan yg di pake adalah yg terskhir atau color : red

2.Mengapa responsive design menjadi konsep yang penting dalam pengembangan aplikasi web? Berikan contoh aplikasi yang sudah dan belum menerapkan responsive design, serta jelaskan mengapa!
Responsive Design digunakan agar tampilan website dapat menyesuaikan ukuran layar perangkat pengguna secara otomatis
Hal ini penting karena
-⁠ ⁠User Experience jika kita dia menggumam responsive design maka saat user membuka di 2 perangkat berbeda bisa saja di salah satu perangkat layout berantakan ataupun tombol sulit untuk di tekan
-⁠ ⁠Efisiensi Pengembangan karena dengan menggunakan responsive design maka kita tidak perlu membuat 2 aplikasi web berbeda untuk versi dekstop dan versi mobile, sehingga akan menghemat biaya pengeluaran dan waktu

#Contoh aplikasi yg sudah menerapkan responsive design adalah salah satu e-commerce yaitu shopee dimana jika kita membuka web shopee melalui laptop maka produk yang di tampilkan akan lebih banyak dengan grid besar sedangkan saat kita membuka shopee di hp grid tersebut berubah menjadi 1-2 kolom, tombol lebih besar sehingga lebih nyaman untuk digunakan dengan jari

#Contoh aplikasi yang belum menerapkan Responsive Design misalnya web pemerintahan lama, dimana jika kita buka di laptop halaman web akan terlihat baik dan masih aman tetapi kalau kita buka di hp teks menjadi terlalu kecil dan tombol pun lebih sulit untuk di tekan

3.Jelaskan perbedaan antara margin, border, dan padding, serta cara untuk mengimplementasikan ketiga hal tersebut!
Dalam CSS Box Model elemen elemen HTML di anggap sebagai kotak yang terdiri atas beberapa
lapisan
1.⁠ ⁠Margin adalah ruang border elemen, fungsi utamanya adalah memberi jarak antar elemen serta margin ini tidak terlihat
2.⁠ ⁠Border adalah garis pembatas di sekeliling padding serta content, border dapat di customize misalnya diberi warna atau sebuah style yg berbeda
3.⁠ ⁠Padding adalah ruang antara content dan border fungsi utamanya adalah agar teks ataupun gambar yang berada di content tidak terlalu mepet dengan border
Ke tiga lapisan tersebut dapat di implementasikan seperti ini
.box {
  margin: 30px;               => jarak antar elemen 
  padding: 20px;              => ruang di dalam sebelum border 
  border: 3px dashed blue;    => border biru bergaris putus-putus 
  background-color: lightyellow;
}

4.Jelaskan konsep flex box dan grid layout beserta kegunaannya!
#Flexbox biasanya digunakan untuk mengatur elemen di ukuran satu dimensi seperti baris maupun kolom. Elemen di dalam container juga dapat menyesuaikan ruang kosong secara otomatis. Flexbox paling tepat digunakan ketika layout masih sederhana dimana hanya membutuhkan pengaturan baris maupun kolom, misalnya sperti navbar, tomobol sejajar, dll

#Grid layout biasanya digunakan untuk mengatur elemen di ukuran dua dimensi yaitu baris dan kolom secara sekaligus. Grid layout sangat cocok digunakan ketika layout sudah kompleks, misalnya layout suatu page sudah penuh yaitu ada dashboard, blog, ataupun portal berita

5.Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial)!
-Menambahkan tailwind ke aplikasi, dengan menambahkan tag <meta name="viewport"> pada base.html, kemudian kita perlu menyambungkan template django dan tailwind dengan memnafatakan script CDN dari tailwind
-Membuat fungsi baru yaitu edit_product, menambahkan ke path ulrs, membuat html baru yaitu edit_product.html, seerta menambahkan tombol edit_product di product_list.html
-MMembuat fungsi baru yaitu delete_product, menambahkan ke path ulrs, seerta menambahkan tombol delete_product di product_list.html
-Membuat html baru untuk navigation bar bernama navbar.html di folder templates pada root directory, menautkan navbar ke base.html agar tidak perlu include 1 1 ke html ainnya
-Menambahkan middleware WhiteNoise agar django bisa mengelola file statis secara otomatis tanpa perlu konfigurasi kompleks
-Membuat folder baru yaitu static/css dan menambahkan file global.css ke dalam folder css, menambahkan file global.css ke dalam base.html
-Membuat beberapa kostumisasi di styling global.css 
-Menambahkan folder image di static dan memasukkan foto error.png untuk ditampilkan ketika user belum memiliki produk 
-Mengkostumisasi navbar, halaman login, halaman register, homepage
-Menambahkan button untuk melihat "my prdoucts" di product_list, jika user belum punya produk akan di tampilkan gambar error.png yg tadi
-Mengkostumisasi product_detils, add product, edit product
-Melakukan add, commit, push


---------------------- R E A D M E T U G A S 6 -----------------------------
1.Apa perbedaan antara synchronous request dan asynchronous request?
-Synchronous request => proses request berjalan sesuai urutan request, dimana program akan menunggu hingga server mengirimkan respons sebelum mengeksekusi perintah selanjutnya. Alur eksekusi biasa disebut juga blocking. Contohnya yakni saat kita melakukan panggilan telfon ke seseorang, ketika menunggu orang tersebut memberikan respons/mengangkat telfonnya kita tidak dapat melakukan hal lain.
-Asynchronous request => proses request dapat terus berjalan walau masih menunggu server memberikan respons. alur eksekusi biasa di sebut juga dengan non-blocking. Contohnya adalah kita dapat mengirimkan pesan kepada orang lain sambil melakukan kegiatan lain tetapi masih bisa mendapatkan respons dari orang tersebut.

2.Bagaimana AJAX bekerja di Django (alur request–response)?
AJAX merupakan teknologi yang menggabungkan JavaScript, HTML, DOM, dan web browser agar komunikasi dengan server tetap berjalan tanpa perlu me-reload halaman. Alur kerja AJAX di Django adalah
-Sebuah event terjadi di halaman web misalnya pengguna menekan sebuah button
-JavaScript akan membuat XMLHttpReqeuest untuk mengirimkan request ke server Django dengan URL tertentu
-Request tersebut akan di terima oleh views dan kemudian views akan memproses semua data atau request yang diberikan
-Setelah selesai memproses request maka server Django akan mengirimkan respon kembali ke web browser dalam format JSON ataupun XML
-Respon tersebut di terima oleh JavaScript dan akan memperbaharui halaman web seperti request yang diminta

3.Apa keuntungan menggunakan AJAX dibandingkan render biasa di Django?
-AJAX akan hanya akan memperbaharui bagian tertentu tidak memuat ulang seluruh halaman sehingga terasa lebih responsif
-Lebih efisien karena data yang dikirimkan antara browser dan server hanya sebagain bukan keseluruhan HTML
-Meningkatkan user experience karena user dapat berinteraksi dengan halaman secara dinamis
-AJAX dapat memvalidasi input form secara otomatis ketika user mengetik tanpa user harus mengirimkan sebuah formulir
-API berbasis data yang disediakan oleh Django dapat digunakan di berbagai platform seperti web application maupun mobile phone

4.Bagaimana cara memastikan keamanan saat menggunakan AJAX untuk fitur Login dan Register di Django?
-Menggunakan authentication bawaan dari Django dimana untuk sistem login dan register akan dilakukan hashing password, session management, dll
-Membatasi dan memvalidasi response AJAX dimana hanya mengirimkan data yg diperlukan seperti saat berhasil atau gagal bukan mengirimkan data sensitif seperti password ataupun token session.
-Gunakan CSRF Token dimana Django memiliki sistem proteksi CSRF bawaan untuk memastikan setiap request hanya di terima dari sumber yang sah
-Tetap melakukan validasi utama walaupun terdapat JavaScript untuk membantu hal ini agar terhindar dari input berbahaya speerti XSS

5.Bagaimana AJAX mempengaruhi pengalaman pengguna (User Experience) pada website?
AJAX mmebuat interaksi web menjadi lebih responsif dan dinamis. User tidak perlu menunggu proses request selesai di eksekui sehingga pengguna akan merasa lebih nyaman. User juga tidak perlu menunggu reload seluruh halaman setiap kali terjadi sesutau, sehingga proses memuat data atau mengupdate konten akan terasa lebih lancar dan efisien.
