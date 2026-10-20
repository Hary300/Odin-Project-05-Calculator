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

`||` berarti “atau” dan di sini dipakai sebagai nilai cadangan. JavaScript memakai nilai di sebelah kiri jika nilainya truthy; jika tidak, JavaScript memakai nilai di sebelah kanan. String kosong (`''`) adalah falsy, jadi kalau `saveValue` sedang kosong, layar menampilkan `'0'` sebagai gantinya. Ini mencegah layar terlihat kosong saat belum ada angka yang bisa ditampilkan. Contohnya, setelah hasil lama dibersihkan untuk memulai input baru, `saveValue` bisa sementara menjadi `''` sebelum angka dari tombol ditambahkan.

Pada kalkulator ini, `saveValue` memang berupa string. String `'0'` bukan string kosong, sehingga truthy dan tetap ditampilkan sebagai `0`. Jadi `|| '0'` bukan cara untuk mengubah string `'0'`, melainkan pengaman ketika `saveValue` kosong. Nilai lain yang falsy di JavaScript, seperti `null` atau `undefined`, juga akan memakai nilai cadangan, tetapi state kalkulator ini seharusnya tidak menyimpan nilai-nilai tersebut.

**Cara berpikir:** anggap `saveValue` sebagai catatan utama dan layar sebagai salinannya. Saat catatan berubah menjadi `2+3`, panggil fungsi ini supaya layar juga menunjukkan `2+3`. Jangan membuat aturan pembaruan layar yang berbeda di setiap tombol; kalau layar dan catatan tidak sama, kalkulator bisa menampilkan satu angka tetapi menghitung angka lain.

**Coba:** untuk setiap tombol yang dibuat nanti, tanyakan: “Setelah mengubah `saveValue`, apakah saya sudah memanggil `updateDisplay()`?”

## Tahap 5: Buat Tombol Angka

Semua tombol angka melakukan pekerjaan serupa: membaca angka pada tombol, memasukkannya ke catatan, lalu memperbarui layar. Karena itu, satu pola event listener bisa dipasang untuk semua tombol angka.

Urutan yang perlu dilakukan saat angka ditekan:

1. Jika `isCalculated` `true`, hapus hasil lama karena angka baru memulai hitungan baru. Misalnya, setelah `2+3=` layar menunjukkan hasil `5` dan `isCalculated` bernilai `true`. Jika pengguna lalu menekan `9`, hasil `5` harus dibuang sehingga layar menjadi `9`. Tanpa langkah ini, angka baru akan dirangkai dengan hasil lama dan layar menjadi `59`, padahal pengguna bermaksud memulai hitungan baru dengan angka `9`.
2. Jika `saveValue` hanya berisi `0`, hapus `0` supaya menekan `7` tidak menghasilkan `07`.
3. Tambahkan angka dari tombol yang ditekan ke `saveValue`.
4. Ubah `isCalculated` menjadi `false`, sebab pengguna sudah mulai memasukkan ekspresi baru.
5. Perbarui layar.

**Contoh yang perlu dibayangkan:** kalkulator menunjukkan hasil `5`, lalu pengguna menekan `9`. Mula-mula hasil `5` dibuang, lalu `9` disimpan. Layar berakhir di `9`. Sebaliknya, saat layar sedang menunjukkan `2+`, angka `3` harus ditambahkan sehingga menjadi `2+3`.

**Coba:** mulai dari `0`, tekan `7`, lalu `8`. Layar harus menunjukkan `78`. Lalu hitung `2+3`, tekan `9`; layar harus menunjukkan `9`.

## Tahap 6: Buat Tombol Operator

Tombol operator membaca simbol yang ditekan, memeriksa keadaan kalkulator, lalu menambahkan atau mengganti simbol di `saveValue`. Alurnya:

1. **Ambil simbol operator dari tombol:**

   ```js
   const nextOperator = operator.innerText;
   ```

   `operator.innerText` berisi teks tombol yang diklik, misalnya `+` atau `*`. Simbol itu disimpan di `nextOperator` agar bisa dipakai pada pemeriksaan dan saat memperbarui `saveValue`. Contoh: jika pengguna mengklik tombol `*`, maka `nextOperator` berisi `'*'`.

2. **Abaikan operator setelah kalkulator menampilkan `Error`:**

   ```js
   if (isCalculated && saveValue === 'Error') return;
   ```

   `return` langsung menghentikan handler ini. Jadi setelah ekspresi yang tidak bisa dihitung menghasilkan `Error`, menekan `+` atau `*` tidak menambahkan simbol ke tulisan `Error`. Pengguna bisa memakai `AC` untuk memulai lagi.

3. **Jika yang terlihat adalah hasil hitungan, izinkan hasil itu menjadi awal ekspresi berikutnya:**

   ```js
   if (isCalculated) isCalculated = false;
   ```

   Hasilnya tidak dihapus. Misalnya, setelah `2+3=` layar berisi `5` dan `isCalculated` bernilai `true`. Menekan `*` mengubah tanda status menjadi `false`, lalu `*` ditambahkan sehingga ekspresinya menjadi `5*`. Dengan begitu, hasil `5` bisa dipakai untuk hitungan lanjutan.

4. **Saat layar masih `0`, izinkan minus untuk memulai angka negatif:**

   ```js
   if (saveValue === '0') {
     if (nextOperator !== '-') return;
     saveValue = '-';
     updateDisplay();
     return;
   }
   ```

   Jika layar baru menunjukkan `0`, menekan `+`, `*`, `/`, atau `%` diabaikan. Minus punya fungsi khusus di posisi awal: menekan `-` mengganti `0` dengan tanda minus saja. Setelah itu, menekan `5` menghasilkan `-5`, yaitu angka negatif, bukan ekspresi pengurangan `0-5`.

5. **Biarkan tanda minus awal menunggu angka:**

   ```js
   if (saveValue === '-') return;
   ```

   Saat `saveValue` hanya `-`, angka masih belum dimasukkan. Abaikan operator lain dulu supaya tanda negatif tidak terganti menjadi ekspresi yang tidak valid seperti `+`.

6. **Periksa apakah karakter terakhir `saveValue` sudah berupa operator:**

   ```js
   if (/[+\-*/%]$/.test(saveValue)) {
   ```

   Ekspresi reguler `/[+\-*/%]$/` mencari salah satu simbol operator (`+`, `-`, `*`, `/`, `%`) tepat di akhir tulisan. `test(saveValue)` menjalankan pemeriksaan itu dan menghasilkan `true` jika cocok, atau `false` jika tidak. Tanda `$` berarti “akhir tulisan”: `5+` cocok karena berakhir dengan `+`, sedangkan `5+2` tidak cocok karena berakhir dengan `2`.

7. **Ganti operator terakhir jika belum ada angka di kanannya:**

   ```js
   saveValue = saveValue.slice(0, -1) + nextOperator;
   ```

   `slice(0, -1)` mengambil seluruh tulisan kecuali karakter terakhir. Contoh: pada `saveValue` bernilai `5+`, hasil `slice(0, -1)` adalah `5`. Lalu `nextOperator` ditempelkan, sehingga jika tombol `*` ditekan, hasil akhirnya `5*`, bukan `5+*`. Ini mencegah dua operator berurutan.

8. **Jika karakter terakhir bukan operator, tambahkan operator baru:**

   ```js
   saveValue += nextOperator;
   ```

   `+=` menempelkan simbol ke akhir tulisan yang sudah ada. Contohnya, dari `saveValue` bernilai `5`, menekan `+` membuatnya menjadi `5+`.

9. **Tandai bahwa pengguna sedang menyusun ekspresi, lalu perbarui layar:**

   ```js
   isCalculated = false;
   updateDisplay();
   ```

   Setelah operator ditekan, ekspresi belum menjadi hasil akhir—angka berikutnya masih bisa dimasukkan. Karena itu `isCalculated` harus `false`. Contoh: setelah hasil `5` ditekan `+`, statusnya tidak lagi menandakan hasil akhir; ekspresi `5+` sedang menunggu angka berikutnya. `updateDisplay()` kemudian menampilkan isi `saveValue` yang terbaru.

**Coba:** tekan `5`, `+`, `*`, `2`, `=`. Layar harus berurutan menjadi `5`, `5+`, `5*`, `5*2`, `10`. Untuk angka negatif, tekan `-`, `5`, `=`; layar menjadi `-5`.

## Tahap 7: Buat Tombol Desimal

Titik desimal hanya boleh muncul sekali dalam satu angka. Handler desimal menangani angka yang sedang ditulis, bukan seluruh ekspresi.

1. **Jika hitungan sebelumnya sudah selesai, mulai angka baru dari nol:**

   ```js
   if (isCalculated) {
     saveValue = '0';
     isCalculated = false;
   }
   ```

   Misalnya, setelah `2+3=` layar menunjukkan `5`. Jika pengguna menekan titik untuk memulai angka desimal baru, hasil `5` diganti dengan `0`, lalu status hasil dihapus. Langkah selanjutnya akan membuat layar menunjukkan `0.`. Tanpa mengosongkan hasil, titik bisa saja ditempelkan ke hasil lama, padahal pengguna bermaksud mulai angka baru.

2. **Ambil angka yang sedang ditulis, yaitu bagian setelah operator terakhir:**

   ```js
   const currentNumber = saveValue.split(/[+%*/-]/).pop();
   ```

   `split(/[+%*/-]/)` memecah ekspresi pada simbol operator, sedangkan `pop()` mengambil bagian paling akhir. Contoh: `12.5+3` dipecah menjadi `12.5` dan `3`, sehingga `currentNumber` berisi `3`. Titik pada `12.5` tidak mencegah pengguna menulis titik pada angka `3`.

3. **Tolak titik kedua pada angka yang sama:**

   ```js
   if (currentNumber.includes('.')) return;
   ```

   `includes('.')` memeriksa apakah angka yang sedang ditulis sudah memiliki titik. Jika sudah, `return` menghentikan handler tanpa mengubah layar. Contoh: pada `12.5+3.`, menekan titik lagi tidak melakukan apa-apa. Namun pada `12.5+3`, titik masih boleh ditambahkan karena angka terakhir `3` belum memiliki titik.

4. **Jika ekspresi berakhir dengan operator, tambahkan `0` sebagai angka sebelum titik:**

   ```js
   if (/[+\-*/%]$/.test(saveValue)) saveValue += '0';
   ```

   Pemeriksaan ini mendeteksi operator di ujung ekspresi. Misalnya, dari `2+`, menekan titik akan lebih dulu mengubahnya menjadi `2+0`; ini membuat titik desimal punya angka di sebelah kirinya.

5. **Tambahkan titik dari tombol dan perbarui layar:**

   ```js
   saveValue += decimal.innerText;
   updateDisplay();
   ```

   `decimal.innerText` adalah teks tombol desimal, biasanya `.`. Contohnya, `2+0` menjadi `2+0.`. Jika ekspresi sebelumnya `12.5+3`, hasilnya menjadi `12.5+3.`. Layar diperbarui agar menunjukkan ekspresi terbaru.

**Cara berpikir:** titik hanya diperiksa pada angka terakhir. Pada `12.5+3`, titik baru masih boleh karena angka terakhir adalah `3`. Pada `12.5+3.2`, titik baru ditolak karena angka terakhir `3.2` sudah mengandung titik.

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

Untuk ekspresi yang dimulai dengan minus, seperti `-5`, evaluator memperlakukannya sebagai `0-5`. Ini memungkinkan angka negatif tunggal dihitung dengan alur operasi yang sama.

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

1. Jika hitungan sudah selesai (`isCalculated` bernilai `true`), hentikan handler tanpa mengubah apa pun. Misalnya, setelah `1-6=` layar menunjukkan `-5`. Menekan `=` lagi tidak perlu menghitung ulang hasil `-5` sebagai ekspresi baru.
2. Memeriksa apakah ekspresi siap dihitung. `5+` belum siap karena belum ada angka setelah `+`.
3. Mengirim tulisan ekspresi ke fungsi penghitung.
4. Memeriksa apakah hasilnya bisa ditampilkan sebagai angka biasa.
5. Menyimpan `Error` jika hasilnya tidak valid, atau menyimpan hasil hitung jika valid.
6. Menandai bahwa tombol `=` sudah menyelesaikan percobaan hitung, lalu memperbarui layar. Penanda ini aktif baik saat muncul jawaban maupun saat layar menampilkan `Error`, supaya input berikutnya tahu perhitungan sebelumnya sudah berakhir.

`Number.isFinite()` adalah pemeriksaan untuk memastikan hasilnya angka normal. Pembagian `8/0`, misalnya, menghasilkan `Infinity`, bukan angka yang layak ditampilkan sebagai jawaban, jadi kalkulator menampilkan `Error`.

**Cara berpikir:** tombol `=` seperti petugas yang mengatur alur, bukan orang yang mengerjakan semua perhitungan sendiri. Ia memeriksa kesiapan, meminta evaluator menghitung, memeriksa jawaban, lalu menampilkannya.

**Coba:** hitung `0.1+0.2` dan pastikan tampil `0.3`; coba `8/0` dan pastikan tampil `Error`; coba `5+` lalu `=` dan pastikan belum dihitung; hitung `1-6=` lalu tekan `=` lagi dan pastikan layar tetap `-5`.

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
| Angka negatif          | `-5=`             | `-5`                  |
| Pembagian dengan nol   | `8/0=`            | `Error`               |
| Ekspresi belum lengkap | `5+=`             | Tetap `5+`            |
| `=` ditekan lagi       | `1-6==`           | Tetap `-5`            |
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
