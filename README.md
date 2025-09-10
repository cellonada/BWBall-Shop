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