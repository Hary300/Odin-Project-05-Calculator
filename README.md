## Step 1 — DOM Selection

**Goal:** Menghubungkan HTML dengan JavaScript.

### Mental Model

JavaScript perlu mengambil referensi elemen HTML sebelum bisa mengakses atau mengubahnya.

### Yang perlu dilakukan

1. Mengambil elemen display.
2. Mengambil container tombol.
3. Menyimpan referensi keduanya ke dalam variabel.

### Expected Result

JavaScript sudah memiliki referensi ke display dan container tombol.

Belum ada kalkulasi atau perubahan tampilan. Tahap ini hanya menyiapkan elemen yang akan digunakan pada tahap berikutnya.

## Step 2 — Handle Number Button Clicks

**Goal:** Menampilkan angka yang diklik pengguna pada display.

### Mental Model

1. JavaScript mendengarkan event `click` pada container tombol.
2. Ketika tombol diklik, JavaScript mengetahui elemen yang menjadi target event.
3. JavaScript mengambil nilai angka dari atribut `data-number`.
4. JavaScript memperbarui teks pada display menggunakan `textContent`.

### Concepts

- `addEventListener()`
- `event.target`
- `dataset.number`
- `textContent`

### Yang perlu dilakukan

1. Pasang `addEventListener()` pada `buttonContainerElement`.
2. Gunakan event click.
3. Terima parameter event di callback.
4. Ambil nilai data-number dari elemen yang diklik.
5. Masukkan nilai tersebut ke displayElement.textContent.

### Expected Result

- Klik tombol `7` → display menampilkan `7`.
- Klik tombol `3` → display menampilkan `3`.

**Note:** Pada tahap ini, setiap klik angka mengganti isi display. Menggabungkan angka seperti `7` lalu `3` menjadi `73` akan kita kerjakan pada tahap berikutnya.

## Step 3 — Build Multi-Digit Numbers

**Goal:** Memungkinkan pengguna memasukkan angka yang terdiri dari beberapa digit.

### Problem

Setiap klik angka saat ini mengganti isi display. Akibatnya, pengguna tidak bisa memasukkan angka seperti `73`.

### Mental Model

1. Baca nilai yang sedang ada di display.
2. Ambil nilai angka dari tombol yang diklik.
3. Gabungkan nilai lama dengan nilai baru.
4. Tampilkan hasil gabungan pada display.

### Concepts

- `textContent`
- `dataset.number`
- String concatenation menggunakan operator `+`

### Yang perlu dilakukan

1. Ubah logika agar angka baru tidak langsung menggantikan angka sebelumnya.
2. Pastikan beberapa digit bisa digabungkan.
3. Uji dengan beberapa kombinasi angka.

### Expected Result

- Klik `7` → `7`
- Klik `3` → `73`
- Klik `5` → `735`

## Step 4 — Handle Operators

**Goal:** Memungkinkan pengguna memilih operator untuk menentukan operasi yang akan dilakukan.

### Problem

Kalkulator sudah bisa menerima angka multi-digit, tetapi belum bisa menyimpan operator yang dipilih pengguna.

### Mental Model

1. Pengguna memasukkan angka pertama.
2. Pengguna mengeklik tombol operator.
3. JavaScript membaca atribut `data-action` dari tombol tersebut.
4. JavaScript menyimpan operator yang dipilih ke dalam variabel `operator`.
5. Informasi operator akan digunakan pada tahap kalkulasi berikutnya.

### Concepts

- `addEventListener()`
- `event.target`
- `dataset.action`
- Variables dan state
- Conditional logic untuk membedakan tombol angka dan operator

### Yang perlu dilakukan

1. Buat variabel untuk menyimpan operator yang dipilih.
2. Identifikasi tombol operator menggunakan atribut `data-action`.
3. Ambil nilai operator menggunakan `dataset.action`.
4. Simpan nilai tersebut ke dalam variabel `operator`.
5. Pastikan klik tombol angka tidak dianggap sebagai pemilihan operator.

### Expected Result

- Klik tombol `+` → `operator` menyimpan nilai `'add'`.
- Klik tombol `-` → `operator` menyimpan nilai `'subtract'`.
- Klik tombol `×` → `operator` menyimpan nilai `'multiply'`.
- Klik tombol `÷` → `operator` menyimpan nilai `'divide'`.

### Important Note

Nilai `data-action` merupakan identifier aksi, bukan simbol operator yang ditampilkan pada tombol.

Pada tahap ini, kalkulator baru menyimpan operator. Belum ada perhitungan yang dilakukan.

## Step 5 — Store the First and Second Numbers

**Goal:** Menyimpan angka pertama dan kedua secara terpisah.

### Problem

Setelah operator dipilih, display masih berisi angka pertama. Input angka kedua bisa tergabung dengan angka pertama.

### Mental Model

1. Pengguna memasukkan angka pertama.
2. Saat operator dipilih, simpan display ke `number1`.
3. Simpan operator ke `operator`.
4. Aktifkan `waitingForSecondNumber`.
5. Saat angka berikutnya diklik, mulai input angka kedua dari angka tersebut.
6. Gabungkan digit berikutnya ke `number2`.
7. Simpan angka kedua secara terpisah dari angka pertama.

### Concepts

- Variables dan state
- Boolean
- Conditional logic
- `textContent`
- `dataset.number`
- Memisahkan data input dari tampilan

### Yang perlu dilakukan

1. Buat variabel `number1`, `number2`, dan `waitingForSecondNumber`.
2. Simpan angka pertama saat operator dipilih.
3. Aktifkan penanda input angka kedua.
4. Reset display ketika angka kedua mulai dimasukkan.
5. Gabungkan digit untuk membentuk angka kedua.
6. Pastikan setiap digit hanya masuk ke variabel yang sesuai.

### Expected Result

Untuk urutan `73 + 25`:

- Setelah memilih `+`: `number1 = '73'`, `operator = 'add'`.
- Setelah memasukkan `25`: `number2 = '25'`, display menunjukkan `25`.

### Important Note

Belum ada kalkulasi pada tahap ini. Fokusnya adalah menyimpan input dengan benar.
