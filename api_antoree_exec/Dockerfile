FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

RUN apk add --no-cache \
    bash \
    git \
    curl \
    zip \
    unzip \
    libzip-dev \
    oniguruma-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    icu-dev \
    libxml2-dev \
    mysql-client \
    && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath exif intl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --optimize-autoloader --no-dev

RUN php artisan config:cache && php artisan route:cache && php artisan view:cache

RUN chown -R www-data:www-data /var/www/html

# Chạy cùng với nginx thì dùng lệnh này
# EXPOSE 8000
# CMD ["php-fpm"]

# 
CMD php artisan serve --host=0.0.0.0 --port=8000
