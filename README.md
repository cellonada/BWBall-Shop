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