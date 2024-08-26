# CSV-dən Şəkil Fayllarının Kopyalanması Skripti

Bu skript, `input.csv` adlı CSV faylından şəkil fayllarının yollarını oxuyur və onları təyin olunmuş `output_directory` adlı qovluğa yeni adlarla kopyalayır. Skript həmçinin faylın uğurla kopyalanıb-kopyalanmadığını yoxlayır və nəticələri `result.csv` adlı bir faylda qeyd edir. Nəticələr skript işləndikcə real vaxtda yaşıl (uğurlu) və qırmızı (uğursuz) rəngdə göstərilir.

## Xüsusiyyətlər

- **CSV Faylının Oxunması:** Giriş faylı CSV formatında olmalıdır və hər bir sətir iki sütundan ibarət olmalıdır: birinci sütunda şəkilin orijinal yolu, ikinci sütunda isə yeni fayl adı olmalıdır.
- **Proqress Bar:** Skript işlədikcə proqress bar yenilənir və tamamlanma faizi göstərilir.
- **Rəngli Nəticələr:** Uğurlu əməliyyatlar yaşıl, uğursuzlar isə qırmızı rəngdə real vaxtda göstərilir.
- **Nəticələrin Qeyd Edilməsi:** Nəticələr `result.csv` adlı bir faylda saxlanılır. Bu fayl aşağıdakı sütunları ehtiva edir:
  - **Input Image Path:** Şəklin orijinal yolu
  - **New Filename:** Yeni təyin olunmuş fayl adı
  - **Result:** Əməliyyatın nəticəsi (Success və ya Error)
  - **File Size (MB):** Faylın ölçüsü megabaytla

## İstifadə Qaydaları

### 1. Skripti İşlətmək

Skripti işə salmaq üçün terminaldan aşağıdakı əmri istifadə edin:

```bash
bash script.sh input.csv output_directory
```

- `input.csv`: Şəklin orijinal yolunu və yeni təyin olunmuş fayl adını ehtiva edən CSV faylı.
- `output_directory`: Faylların kopyalanacağı qovluq.

### 2. Giriş Faylı (input.csv)

`input.csv` faylı iki sütunlu olmalıdır və hər sətirdə bir şəkil faylı haqqında məlumat olmalıdır. Misal:

```csv
"/path/to/original/image1.jpg","new-filename1.jpg"
"/path/to/original/image2.jpg","new-filename2.jpg"
```

### 3. Çıxış Nəticələri (result.csv)

Skript tamamlandıqda, nəticələr `result.csv` faylında qeyd olunur. Hər bir sətir aşağıdakı formatda olacaq:

```csv
Input Image Path,New Filename,Result,File Size (MB)
"/path/to/original/image1.jpg","new-filename1.jpg","Success","1.2"
"/path/to/original/image2.jpg","new-filename2.jpg","Error","0"
```

- **Result:** Əməliyyatın nəticəsi `Success` və ya `Error` olacaq.
- **File Size:** Kopyalanmış faylın ölçüsü megabaytla. Əgər fayl 0 MB-dan az olarsa, əməliyyat `Error` olaraq qeyd ediləcək.

### 4. Proqress Bar

Proqress bar skriptin işinin nə qədər irəlilədiyini göstərir. Bu bar hər bir sətir oxunduqca yenilənir və terminalda görünür.

### 5. Əlavə Məlumatlar

Skript işini bitirdikdən sonra ümumi işlənmiş sətirlərin sayı, uğurlu və uğursuz əməliyyatların sayı ekranda göstəriləcək.

## Quraşdırma Tələbləri

- **bash**: Bu skript bash-da yazılmışdır və bash shell ilə işlədilir.
- **curl**: Əgər şəkil URL vasitəsilə yüklənəcəksə, curl lazım olacaq.

## Məsələn

Misal üçün, aşağıdakı əmri işlətdikdə:

```bash
bash script.sh images.csv output_images/
```

- `images.csv` faylından şəkillərin yollarını oxuyacaq və onları `output_images/` qovluğuna kopyalayacaq.

## Müəllif

Bu skript PierringShot Electronics™ tərəfindən yazılmışdır.

(usage ./v2.sh /data/data/com.termux/files/home/copy-and-rename-files/v2/input.csv /data/data/com.termux/files/home/copy-and-rename-files/v2/outV2)
# copy-and-rename-files
# copy-and-rename-files
