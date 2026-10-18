# Resep Membuat Logika Kalkulator dengan JavaScript

Panduan ini dibuat supaya bisa dipakai lagi saat membuat kalkulator dari awal. Jangan mulai dengan menyalin semua kode. Mulai dari pertanyaan: **"Kalau tombol ini ditekan, apa yang harus berubah?"** Setelah jawabannya jelas, baru tulis kodenya dan uji.

## Hasil yang Akan Dibuat

Kalkulator yang bisa menerima angka, desimal, dan operator `+`, `-`, `*`, `/`, `%`; menghitung dengan urutan matematika yang benar; menghapus input; serta menampilkan `Error` untuk hasil yang tidak valid seperti pembagian dengan nol.

Kalkulator ini bekerja dengan klik tombol. Dukungan keyboard bisa ditambahkan setelah alur dasarnya berjalan.

## Kenali Bahan: Elemen HTML

Sebelum menulis JavaScript, lihat dulu apa saja yang sudah ada di `index.html`.

| Elemen di halaman  | Cara JavaScript mencarinya | Fungsinya                          |
| ------------------ | -------------------------- | ---------------------------------- |
| Layar              | `.display`                 | Menampilkan ekspresi dan hasil     |
| Tombol angka       | `.number`                  | Memasukkan angka 0 sampai 9        |
| Tombol operator    | `.operator`                | Memasukkan `+`, `-`, `*`, `/`, `%` |
| Tombol titik       | `.decimal`                 | Memasukkan titik desimal           |
| Tombol sama dengan | `.equal`                   | Memulai perhitungan                |
| Tombol `AC`        | `#clear`                   | Menghapus semua dan mulai lagi     |
| Tombol `DEL`       | `#del`                     | Menghapus satu karakter terakhir   |

Selector harus cocok dengan `class` atau `id` pada HTML. Script di proyek ini memakai `defer`, jadi browser menunggu HTML selesai dibaca sebelum menjalankan JavaScript. Dengan begitu, tombol sudah ada saat JavaScript mencarinya.

## Urutan Kerja

```text
1. Tentukan aturan yang diinginkan
2. Ambil tombol dan layar dari HTML
3. Tentukan data yang perlu diingat
4. Buat cara untuk memperbarui layar
5. Buat tombol angka
6. Buat tombol operator
7. Buat tombol desimal
8. Buat tombol AC dan DEL
9. Buat operasi matematika
10. Pecah dan periksa ekspresi
11. Hitung sesuai urutan matematika
12. Hubungkan perhitungan ke tombol =
13. Uji semuanya
```

Kerjakan satu tahap, coba ceknya, baru lanjut. Kalau langsung menulis semuanya, saat hasilnya salah akan lebih sulit mencari penyebabnya.

## Tahap 1: Tentukan Aturan Sebelum Coding

Sebelum menulis kode, tentukan bagaimana kalkulator harus bereaksi terhadap tombol.

Aturan proyek ini:

1. Angka yang ditekan muncul di layar.
2. Operator menghubungkan angka-angka yang dihitung.
3. Tombol `=` menghitung ekspresi yang sudah lengkap.
4. Angka setelah hasil memulai hitungan baru.
5. Operator setelah hasil melanjutkan hitungan dari hasil itu.
6. Satu angka tidak boleh memiliki dua titik desimal.
7. Ekspresi yang berakhir dengan operator belum siap dihitung.
8. `AC` menghapus semuanya; `DEL` menghapus satu karakter.
9. Hasil yang tidak bisa dipakai, misalnya pembagian dengan nol, ditampilkan sebagai `Error`.

**Cara berpikir:** ubah aturan menjadi cerita yang bisa dicoba. Contoh: “Layar menunjukkan `5`, saya menekan `9`, lalu layar harus menunjukkan apa?” Jawabannya `9`, bukan `59`. Cerita seperti ini nanti menjadi tes.

**Coba:** tulis dengan kata-katamu sendiri apa yang seharusnya terjadi jika pengguna menekan `=` setelah mengetik `5+`. Belum perlu menulis kode.

## Tahap 2: Ambil Elemen HTML

JavaScript perlu menemukan layar dan tombol sebelum bisa menggunakannya. Simpan elemen yang ditemukan di variabel:

```js
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
```

`querySelector()` mencari satu elemen, misalnya layarnya. `querySelectorAll()` mencari semua elemen yang cocok, misalnya seluruh tombol angka. `getElementById()` mencari elemen dengan `id` tertentu, misalnya tombol `AC`.

**Cara berpikir:** bayangkan JavaScript seperti orang yang harus mencari kontrol di halaman. Ia perlu tahu “tombol angka yang mana?” dan “bagian layar yang mana?”. Class dan id adalah label yang membantu menemukannya. Karena semua tombol angka punya label `.number`, kita tidak perlu mencari tombol 0, 1, 2, dan seterusnya satu per satu.

**Coba:** cocokkan satu per satu selector JavaScript dengan class/id yang tertulis pada HTML. Jika salah satu namanya berbeda, perbaiki sebelum membuat kalkulator berperilaku.

## Tahap 3: Tentukan Data yang Perlu Diingat

Kalkulator perlu menyimpan tulisan yang sedang diketik dan mengetahui apakah perhitungan baru saja selesai.

```js
let saveValue = '0';
let isCalculated = false;
```

- `saveValue` adalah catatan kalkulator. Sebelum dihitung, catatan itu bisa berisi ekspresi seperti `"12+3"`; setelah dihitung, catatan itu menyimpan hasil seperti `"15"`.
- `isCalculated` adalah tanda “perhitungan barusan selesai”. `true` berarti layar sedang menunjukkan hasil akhir. `false` berarti pengguna masih memasukkan ekspresi.

Mengapa `saveValue` berupa tulisan/string? Karena kalkulator perlu merangkai angka dan simbol bersama-sama. Nilai angka biasa tidak bisa menyimpan ekspresi seperti `"12+3"`.

Lihat urutan nyata ini:

| Tombol yang ditekan     | Layar | `saveValue` | `isCalculated` | Penjelasan                            |
| ----------------------- | ----- | ----------- | -------------- | ------------------------------------- |
| Belum menekan apa pun   | `0`   | `"0"`       | `false`        | Kalkulator siap dipakai               |
| `2`, lalu `+`, lalu `3` | `2+3` | `"2+3"`     | `false`        | Pengguna masih menyusun hitungan      |
| `=`                     | `5`   | `"5"`       | `true`         | Hitungan selesai, `5` adalah hasil    |
| Setelah itu tekan `9`   | `9`   | `"9"`       | `false`        | Hasil `5` dibuang; input baru dimulai |

Kenapa perlu `isCalculated`? Setelah hasil `5` muncul, tombol angka `9` harus mengganti hasil menjadi `9`. Kalau hasil tidak ditandai, kalkulator bisa salah menempelkan angka dan menunjukkan `59`.

Tombol operator setelah hasil punya perilaku lain: dari hasil `5`, menekan `+` harus mempertahankan `5` dan membuat ekspresi `5+`. Jadi penanda ini membantu handler angka tahu kapan harus membuang hasil lama.

**Coba:** untuk setiap baris tabel, tebak isi kedua variabel sebelum menekan tombol berikutnya. Kalau jawabannya jelas, kamu sudah punya gambaran tentang data yang perlu diingat.

## Tahap 4: Buat Satu Cara untuk Memperbarui Layar

Buat satu fungsi yang menyalin catatan kalkulator ke layar:

```js
function updateDisplay() {
  display.textContent = saveValue || '0';
}
```

**Cara berpikir:** anggap `saveValue` sebagai catatan utama dan layar sebagai salinannya. Saat catatan berubah menjadi `2+3`, panggil fungsi ini supaya layar juga menunjukkan `2+3`. Jangan membuat aturan pembaruan layar yang berbeda di setiap tombol; kalau layar dan catatan tidak sama, kalkulator bisa menampilkan satu angka tetapi menghitung angka lain.

**Coba:** untuk setiap tombol yang dibuat nanti, tanyakan: “Setelah mengubah `saveValue`, apakah saya sudah memanggil `updateDisplay()`?”

## Tahap 5: Buat Tombol Angka

Semua tombol angka melakukan pekerjaan serupa: membaca angka pada tombol, memasukkannya ke catatan, lalu memperbarui layar. Karena itu, satu pola event listener bisa dipasang untuk semua tombol angka.

Urutan yang perlu dilakukan saat angka ditekan:

1. Jika `isCalculated` `true`, hapus hasil lama karena angka baru memulai hitungan baru.
2. Jika `saveValue` hanya berisi `0`, hapus `0` supaya menekan `7` tidak menghasilkan `07`.
3. Tambahkan angka dari tombol yang ditekan ke `saveValue`.
4. Ubah `isCalculated` menjadi `false`, sebab pengguna sudah mulai memasukkan ekspresi baru.
5. Perbarui layar.

**Contoh yang perlu dibayangkan:** kalkulator menunjukkan hasil `5`, lalu pengguna menekan `9`. Mula-mula hasil `5` dibuang, lalu `9` disimpan. Layar berakhir di `9`. Sebaliknya, saat layar sedang menunjukkan `2+`, angka `3` harus ditambahkan sehingga menjadi `2+3`.

**Coba:** mulai dari `0`, tekan `7`, lalu `8`. Layar harus menunjukkan `78`. Lalu hitung `2+3`, tekan `9`; layar harus menunjukkan `9`.

## Tahap 6: Buat Tombol Operator

Tombol operator membaca simbol pada tombol yang ditekan, lalu menambahkannya ke ekspresi.

Sebelum menambahkan simbol, periksa:

1. Jika layar menunjukkan `Error`, abaikan operator.
2. Jika ekspresi masih `0`, operator selain minus tidak perlu ditambahkan.
3. Jika karakter terakhir sudah operator, ganti operator terakhir itu.
4. Jika karakter terakhir angka, tambahkan operator baru.
5. Setelah itu, perbarui layar.

**Cara berpikir:** operator adalah tanda yang menunggu angka di sebelah kanannya. Setelah mengetik `5+`, pengguna boleh mengganti `+` dengan `*`, tetapi tidak masuk akal jika layar berisi `5+*`. Karena itu, operator baru mengganti operator lama bila belum ada angka setelahnya.

Dalam kode, pola seperti `/[+\-*/%]$/` memeriksa apakah karakter paling akhir adalah operator. Tanda `$` berarti “akhir tulisan”. Jadi `5+` cocok; `5+2` tidak cocok.

**Coba:** tekan `5`, `+`, `*`, `2`, `=`. Layar harus berurutan menjadi `5`, `5+`, `5*`, `5*2`, `10`.

## Tahap 7: Buat Tombol Desimal

Titik desimal hanya boleh digunakan sekali untuk satu angka. Untuk mengetahui angka yang sedang ditulis, ambil teks setelah operator terakhir.

Contoh: jika `saveValue` berisi `12.5+3`, angka terakhir yang sedang ditulis adalah `3`. Titik sudah ada pada `12.5`, tetapi itu tidak melarang titik pada angka `3`.

Urutan handler desimal:

1. Jika perhitungan baru selesai, mulai angka desimal baru dari `0`.
2. Cari angka terakhir setelah operator.
3. Jika angka terakhir sudah mengandung titik, jangan tambahkan titik lagi.
4. Jika layar berakhir dengan operator, tambahkan `0` dulu.
5. Tambahkan titik dan perbarui layar.

**Cara berpikir:** periksa satu angka yang sedang ditulis, bukan seluruh ekspresi. Pada `12.5+3`, titik baru masih boleh. Pada `12.5+3.2`, titik baru harus ditolak karena `3.2` sudah punya titik.

**Coba:** tekan `1`, `.`, `2`, `.`, `3`; hasil di layar harus `1.23`. Setelah mengetik `1+`, tekan `.`; layar harus menjadi `1+0.`.

## Tahap 8: Buat Tombol `AC` dan `DEL`

`AC` berarti mulai dari awal. Kembalikan catatan ke `0`, tandai bahwa tidak ada hasil baru, lalu perbarui layar.

`DEL` berarti hapus satu karakter paling kanan. Jika setelah dihapus catatan menjadi kosong, tampilkan `0`. Jika layar sedang menunjukkan `Error`, pulihkan kalkulator ke `0` juga.

**Cara berpikir:** bayangkan perbedaan luas penghapusannya. `AC` menghapus seluruh catatan; `DEL` hanya menghapus ujung catatan. Contoh: dari `123`, `DEL` menghasilkan `12`. Dari `1`, `DEL` tidak boleh meninggalkan layar kosong; layar kembali ke `0`.

**Coba:** ketik `123`, tekan `DEL` tiga kali, lalu sekali lagi. Layar harus menjadi `12`, `1`, `0`, lalu tetap `0`.

## Tahap 9: Buat Operasi Matematika Dasar

Buat fungsi kecil untuk menghitung dua angka. Contoh penjumlahan:

```js
function add(a, b) {
  return a + b;
}
```

Buat fungsi dengan pola yang sama untuk pengurangan, perkalian, pembagian, dan modulo. Lalu buat `operate(number1, operator, number2)` untuk memilih fungsi berdasarkan simbol operator.

**Cara berpikir:** pisahkan dua pertanyaan. Fungsi `add` menjawab “berapa hasil 2 angka ditambah?”. Fungsi `operate` menjawab “simbol yang dipilih itu mengarahkan ke fungsi yang mana?”. Belum perlu memikirkan tombol atau tampilan di tahap ini.

**Coba:** uji fungsi setiap operasi dengan contoh kecil: `4+3`, `9-4`, `6*7`, `8/2`, dan `8%3`.

## Tahap 10: Pecah dan Periksa Ekspresi

Sebelum menghitung, ubah tulisan ekspresi menjadi potongan yang lebih mudah dibaca. Potongan ini disebut **token**.

```text
"2+3*4"   → ["2", "+", "3", "*", "4"]
"1.5+0.5" → ["1.5", "+", "0.5"]
```

Program memakai pola pencarian untuk mengambil angka dan simbol operator dari tulisan. Setelah itu, gabungkan token kembali dan bandingkan dengan tulisan semula. Jika hasilnya berbeda, berarti ada karakter yang tidak berhasil dibaca.

**Cara berpikir:** sebelum menyuruh kalkulator menghitung, pastikan dulu ia bisa membaca isi layar. Ini seperti membaca kalimat: pisahkan bagian-bagiannya, lalu pastikan tidak ada karakter yang tertinggal. Urutan yang biasa diharapkan adalah angka, operator, angka, operator, angka.

**Coba:** tulis sendiri token dari `12.5+3`. Lalu coba ekspresi yang salah, seperti `2+a`; program tidak boleh menganggapnya sebagai hitungan yang valid.

## Tahap 11: Hitung dengan Urutan yang Benar

Dalam matematika, perkalian, pembagian, dan modulo dilakukan sebelum penjumlahan atau pengurangan. Karena itu, kalkulator tidak boleh selalu menghitung tombol dari kiri ke kanan.

Contoh `2+3*4`:

```text
Kalau salah urutan: (2+3)*4 = 20
Urutan matematika:  2+(3*4) = 14
```

Program mengerjakan perkalian/pembagian/modulo terlebih dahulu. Setelah itu, program menyelesaikan penjumlahan/pengurangan dari kiri ke kanan.

**Cara berpikir:** jangan mulai dengan menulis loop. Kerjakan contoh di atas dengan tangan dulu. Hasil yang benar harus `14`, jadi algoritma harus punya cara menunda `+` sambil langsung menyelesaikan `3*4`.

**Coba:** prediksi hasil `8/4*2`. Karena `/` dan `*` memiliki tingkat prioritas yang sama, hitung dari kiri ke kanan: `8/4=2`, lalu `2*2=4`.

## Tahap 12: Hubungkan Perhitungan ke Tombol `=`

Tombol `=` menjalankan beberapa pekerjaan secara berurutan:

1. Memeriksa apakah ekspresi siap dihitung. `5+` belum siap karena belum ada angka setelah `+`.
2. Mengirim tulisan ekspresi ke fungsi penghitung.
3. Memeriksa apakah hasilnya bisa ditampilkan sebagai angka biasa.
4. Menyimpan `Error` jika hasilnya tidak valid, atau menyimpan hasil hitung jika valid.
5. Menandai bahwa tombol `=` sudah menyelesaikan percobaan hitung, lalu memperbarui layar. Penanda ini aktif baik saat muncul jawaban maupun saat layar menampilkan `Error`, supaya input berikutnya tahu perhitungan sebelumnya sudah berakhir.

`Number.isFinite()` adalah pemeriksaan untuk memastikan hasilnya angka normal. Pembagian `8/0`, misalnya, menghasilkan `Infinity`, bukan angka yang layak ditampilkan sebagai jawaban, jadi kalkulator menampilkan `Error`.

**Cara berpikir:** tombol `=` seperti petugas yang mengatur alur, bukan orang yang mengerjakan semua perhitungan sendiri. Ia memeriksa kesiapan, meminta evaluator menghitung, memeriksa jawaban, lalu menampilkannya.

**Coba:** hitung `0.1+0.2` dan pastikan tampil `0.3`; coba `8/0` dan pastikan tampil `Error`; coba `5+` lalu `=` dan pastikan belum dihitung.

## Tahap 13: Uji Seluruh Alur

Jalankan tes otomatis dengan perintah `npm test`, lalu coba juga kalkulator di browser.

| Yang diuji             | Input             | Hasil yang diharapkan |
| ---------------------- | ----------------- | --------------------- |
| Penjumlahan            | `4+3=`            | `7`                   |
| Pengurangan            | `9-4=`            | `5`                   |
| Perkalian              | `6*7=`            | `42`                  |
| Pembagian              | `8/2=`            | `4`                   |
| Modulo                 | `8%3=`            | `2`                   |
| Prioritas operasi      | `2+3*4=`          | `14`                  |
| Operator setara        | `8/4*2=`          | `4`                   |
| Desimal                | `0.1+0.2=`        | `0.3`                 |
| Pembagian dengan nol   | `8/0=`            | `Error`               |
| Ekspresi belum lengkap | `5+=`             | Tetap `5+`            |
| Hapus satu karakter    | `123`, lalu `DEL` | `12`                  |
| Hapus semua            | Tekan `AC`        | `0`                   |
| Angka setelah hasil    | `2+3=`, lalu `9`  | `9`                   |

**Cara berpikir:** tes bukan hanya memastikan hasil matematika, tetapi memastikan seluruh perjalanan input benar. Jika tes gagal, catat tombol yang ditekan, isi `saveValue` sebelumnya, perubahan yang seharusnya terjadi, isi sesudahnya, dan teks layar. Dengan begitu, kamu bisa mencari tahap yang salah tanpa mengubah beberapa bagian sekaligus.

## Latihan Tanpa Menyalin Kode

Sebelum membuka kode, pilih satu skenario dan isi pertanyaan ini:

| Pertanyaan                           | Contoh jawaban untuk `DEL`  |
| ------------------------------------ | --------------------------- |
| Tombol apa yang ditekan?             | `DEL`                       |
| Apa isi catatan sebelum ditekan?     | `saveValue` berisi `"12"`   |
| Apa yang harus dilakukan?            | Hapus karakter paling kanan |
| Apa isi catatan setelahnya?          | `saveValue` berisi `"1"`    |
| Apa yang harus terlihat di layar?    | `1`                         |
| Kondisi khusus apa yang perlu diuji? | Jika kosong, tampilkan `0`  |

Setelah bisa menjawabnya, tulis langkahnya dalam bahasa biasa. Contoh: “ambil tulisan, hapus karakter terakhir, kalau kosong ganti dengan nol, tampilkan tulisan baru.” Itulah pseudocode. Berikutnya ubah satu kalimat demi satu kalimat menjadi JavaScript.

Ulangi latihan untuk tiga situasi: menekan angka setelah hasil, menekan titik setelah operator, dan menekan `=` pada ekspresi belum lengkap.

## Checklist untuk Kalkulator Berikutnya

1. Tulis aturan dengan contoh tombol dan tampilan yang diharapkan.
2. Cocokkan elemen HTML dengan selector.
3. Putuskan informasi apa yang perlu disimpan.
4. Buat satu fungsi untuk memperbarui layar.
5. Buat dan uji tombol angka.
6. Buat dan uji tombol operator.
7. Buat dan uji desimal, `AC`, dan `DEL`.
8. Buat fungsi operasi matematika.
9. Pecah dan validasi ekspresi.
10. Hitung dengan prioritas operasi yang benar.
11. Hubungkan proses hitung ke tombol `=`.
12. Uji kasus normal dan kasus batas.

Pegangan utamanya: pahami dulu **apa yang dilakukan pengguna**, **data apa yang berubah**, dan **apa yang harus terlihat**. Jika tiga hal itu jelas, kode tidak lagi terasa seperti sesuatu yang harus disalin.
