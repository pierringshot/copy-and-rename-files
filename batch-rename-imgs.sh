#!/bin/bash

# Giriş yoxlanışı - iki argument tələb olunur
if [ "$#" -ne 2 ]; then
    echo "İstifadə: $0 input.csv output_directory"
    exit 1
fi

# Giriş faylı və çıxış qovluğu
input_file="$1"
output_dir="$2"

# Çıxış qovluğunun mövcud olub olmadığını yoxlayır
if [ ! -d "$output_dir" ]; then
    echo "Çıxış qovluğu $output_dir mövcud deyil. Yaradılır."
    mkdir -p "$output_dir"
fi

# Nəticələrin yazılacağı CSV faylı
result_csv="result.csv"

# Əvvəlki nəticələri təmizləyir
> "$result_csv"

# CSV faylına başlıqları əlavə edir
echo "Input Image Path,New Filename,Result,File Size (MB)" >> "$result_csv"

# Uğurlu və uğursuz əməliyyatların sayını izləmək üçün dəyişənlər
success_count=0
error_count=0
total_count=0

# CSV-dəki ümumi sətir sayını hesablayır
total_lines=$(wc -l < "$input_file")
total_lines=$((total_lines - 1))  # Başlığı çıxmaq

# Progress bar üçün
progress_bar() {
    progress=$(($1 * 100 / $2))
    filled=$(($progress / 2))
    empty=$((50 - $filled))
    bar=$(printf "%0.s#" $(seq 1 $filled))
    spaces=$(printf "%0.s-" $(seq 1 $empty))
    printf "\r[%s%s] %d%%" "$bar" "$spaces" "$progress"
}

# Real vaxt nəticələrini rənglərlə çap etmək üçün funksiyalar
print_success() {
    echo -e "\033[32m$1\033[0m"
}

print_error() {
    echo -e "\033[31m$1\033[0m"
}

# CSV faylını işləyir
while IFS=, read -r source target; do
    total_count=$((total_count + 1))

    # CSV sahələrindəki əhatə edən sitat işarələrini silir
    source=$(echo "$source" | sed 's/^"//;s/"$//')
    target=$(echo "$target" | sed 's/^"//;s/"$//')

    # Boş sətirləri keçmək
    if [ -z "$source" ] || [ -z "$target" ]; then
        continue
    fi

    # Çıxış yolu müəyyənləşdirir
    output_path="$output_dir/$target"

    # Şəklin lokal fayl olub olmadığını yoxlayır və kopyalayır
    if [ -f "$source" ]; then
        cp "$source" "$output_path"
    else
        print_error "Xəta: Fayl kopyalana bilmədi: $target"
        echo "$source,$target,Error,0" >> "$result_csv"
        error_count=$((error_count + 1))
        progress_bar $total_count $total_lines
        continue
    fi

    # Əməliyyatın nəticəsini yoxlayır və fayl ölçüsünü hesablayır
    if [ $? -eq 0 ]; then
        file_size=$(du -m "$output_path" | cut -f1)
        if [ "$file_size" -gt 0 ]; then
            echo "$source,$target,Success,$file_size" >> "$result_csv"
            print_success "Uğurlu: $target ($file_size MB)"
            success_count=$((success_count + 1))
        else
            print_error "Xəta: Fayl ölçüsü 0 MB: $target"
            echo "$source,$target,Error,0" >> "$result_csv"
            error_count=$((error_count + 1))
        fi
    else
        print_error "Xəta: Fayl kopyalana bilmədi: $target"
        echo "$source,$target,Error,0" >> "$result_csv"
        error_count=$((error_count + 1))
    fi

    # Progress bar yenilənir
    progress_bar $total_count $total_lines

done < "$input_file"

# Nəticələri ekrana çap edir
echo -e "\nEmal tamamlandı. Cəmi: $total_count, Uğurlu: $success_count, Uğursuz: $error_count"