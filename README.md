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
