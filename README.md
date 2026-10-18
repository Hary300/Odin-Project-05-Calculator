## Perbedaan `background` dan `background-color`

### 1. `background-color`

Digunakan khusus untuk mengatur warna latar belakang (_background color_).

```css
.container {
  background-color: #0f0f0f;
}
```

### 2. `background`

Merupakan _shorthand property_ yang dapat digunakan untuk mengatur beberapa properti background sekaligus, seperti warna, gambar, gradient, posisi, dan ukuran gambar.

```css
.container {
  background: #0f0f0f;
}
```

`background` juga dapat digunakan untuk membuat gradient.

```css
.container {
  background: radial-gradient(
    circle at 15% 75%,
    rgba(255, 40, 180, 0.18),
    transparent 24%
  );
}
```

### 3. Perbedaan Utama

- `background-color` hanya menerima nilai warna, bukan gambar atau gradient.
- `background` dapat menerima warna, gambar, gradient, dan kombinasi beberapa pengaturan background.
- Keduanya dapat digunakan untuk mengatur warna latar belakang.
- Karena `background` merupakan _shorthand property_, properti background lain yang tidak ditentukan dapat diatur kembali ke nilai default-nya.

**Kesimpulan:** Gunakan `background-color` jika hanya ingin mengatur warna latar belakang. Gunakan `background` jika ingin menggunakan gradient, gambar, atau mengatur beberapa properti background sekaligus.

## Radial Gradient

`radial-gradient()` digunakan untuk membuat gradasi warna yang menyebar dari titik pusat ke arah luar, membentuk pola melingkar atau elips.

Contoh:

```css
radial-gradient(
  circle at 15% 75%,
  rgba(255, 40, 180, 0.18),
  transparent 24%
)
```

**Penjelasan setiap bagian:**

- `circle` — Menentukan bentuk gradasi berupa lingkaran.
- `at 15% 75%` — Menentukan posisi pusat gradasi. `15%` adalah posisi horizontal dari kiri, sedangkan `75%` adalah posisi vertikal dari atas.
- `rgba(255, 40, 180, 0.18)` — Menentukan warna awal gradasi, yaitu pink dengan opacity `18%`.
- `transparent 24%` — Menentukan bahwa warna menjadi transparan sepenuhnya pada posisi `24%` dari ukuran gradasi.

**Perbedaan `transparent` dan `transparent 24%`:**

- `transparent` — Tidak menentukan posisi akhir transparansi secara eksplisit. Browser menggunakan posisi akhir gradasi berdasarkan aturan distribusi warna CSS. Karena hanya ada dua color stop, posisi `transparent` secara default berada di ujung gradasi.
- `transparent 24%` — Menentukan posisi transparansi secara eksplisit pada `24%` dari ukuran gradasi. Akibatnya, warna pink memudar menjadi transparan dalam area yang lebih kecil.

**Kesimpulan:**

Penambahan `24%` membuat transisi warna menuju transparan berakhir lebih dekat ke pusat gradasi, sehingga efek pink cenderung lebih terkonsentrasi. Tanpa angka tersebut, transisi berlangsung hingga ujung gradasi.

Catatan: Persentase pada color stop menentukan posisi warna dalam gradasi, bukan opacity. Opacity warna pink tetap ditentukan oleh nilai alpha `0.18` pada `rgba()`.

Efek ini sering digunakan untuk membuat aksen cahaya (_glow effect_) pada background website.

## Perbedaan `width: min()`, `min-width`, dan `max-width`

### 1. `width: min(430px, 100%)`

Menggunakan nilai terkecil antara `430px` dan `100%` dari lebar elemen induk (_parent_).

- Jika parent lebih kecil dari `430px`, lebar elemen mengikuti `100%` parent.
- Jika parent lebih besar dari `430px`, lebar elemen maksimal `430px`.

Cocok untuk membuat elemen responsif.

### 2. `min-width: 430px`

Menentukan lebar minimum elemen sebesar `430px`. Elemen tidak akan menjadi lebih kecil dari ukuran tersebut, sehingga dapat menyebabkan _horizontal overflow_ pada layar sempit.

### 3. `max-width: 430px`

Menentukan lebar maksimum elemen sebesar `430px`. Elemen masih bisa lebih kecil dari `430px` jika lebar yang ditentukan atau ruang yang tersedia lebih kecil.

**Kesimpulan:** Gunakan `width: min(430px, 100%)` jika ingin elemen memiliki lebar maksimal `430px` tetapi tetap responsif pada layar yang lebih kecil.

## `box-shadow`

`box-shadow` digunakan untuk memberikan bayangan pada elemen. Properti ini dapat memiliki beberapa bayangan sekaligus, dipisahkan dengan koma.

```css
box-shadow:
  0 35px 80px rgba(0, 0, 0, 0.65),
  inset 0 1px 1px rgba(255, 255, 255, 0.22);
```

### 1. Bayangan luar (_Outer Shadow_)

`0 35px 80px rgba(0, 0, 0, 0.65)`

- `0` — Pergeseran horizontal (_horizontal offset_).
- `35px` — Pergeseran vertikal (_vertical offset_).
- `80px` — Tingkat penyebaran blur (_blur radius_).
- `rgba(0, 0, 0, 0.65)` — Warna hitam dengan opacity 65%.

### 2. Bayangan dalam (_Inset Shadow_)

`inset 0 1px 1px rgba(255, 255, 255, 0.22)`

- `inset` — Membuat bayangan berada di bagian dalam elemen.
- `0` — Pergeseran horizontal.
- `1px` — Pergeseran vertikal.
- `1px` — Blur radius.
- `rgba(255, 255, 255, 0.22)` — Warna putih dengan opacity 22%.

### Kesimpulan

- **Outer shadow** memberikan efek bayangan di luar elemen.
- **Inset shadow** memberikan efek bayangan di dalam elemen.
- Keduanya dapat dikombinasikan untuk menghasilkan tampilan yang lebih berdimensi.

## `word-break: break-all`

Digunakan untuk memungkinkan teks berpindah ke baris berikutnya dengan memotong kata di posisi mana pun jika diperlukan.

```css
.container {
  word-break: break-all;
}
```

**Cara kerja:**

Jika teks tidak muat dalam satu baris, browser dapat memotong kata di tengah dan melanjutkan sisanya ke baris berikutnya.

Contoh:

```text
JavaScriptProgramming
```

Dapat ditampilkan menjadi:

```text
JavaScript
Programmin
g
```

Pemenggalan tersebut bergantung pada lebar container dan ukuran teks.

**Catatan:** Cocok untuk menangani teks panjang tanpa spasi. Untuk teks biasa, `overflow-wrap: break-word` sering lebih sesuai karena kata hanya dipecah ketika diperlukan agar tidak melampaui batas container.

## Memeriksa Titik Desimal pada Kalkulator

```js
let abc = display.innerText.split(/[+%*/-]/).pop();

if (abc.includes('.')) {
  return;
}
```

**Cara kerja:**

- `display.innerText` — Mengambil teks yang ditampilkan pada kalkulator.
- `.split(/[+%*/-]/)` — Memisahkan teks berdasarkan operator matematika `+`, `%`, `*`, `/`, dan `-`.
- `.pop()` — Mengambil elemen terakhir dari array hasil `split()`, yaitu angka terakhir yang sedang dimasukkan.
- `.includes('.')` — Memeriksa apakah angka terakhir sudah mengandung titik desimal.
- `return` — Menghentikan fungsi jika titik desimal sudah ada.

**Contoh:**

- Display `12.5` → angka terakhir adalah `"12.5"` → titik sudah ada → fungsi berhenti.
- Display `12.5+3` → angka terakhir adalah `"3"` → titik belum ada → fungsi berlanjut.
- Display `12+3.5` → angka terakhir adalah `"3.5"` → titik sudah ada → fungsi berhenti.

**Kesimpulan:** Kode ini mencegah pengguna memasukkan lebih dari satu titik desimal pada angka yang sedang dimasukkan, tanpa menghalangi penggunaan titik desimal pada angka berikutnya setelah operator.
