# Promocode Generator API

REST API для генерации и активации промокодов, построенный на [NestJS](https://nestjs.com/) с использованием [Prisma ORM](https://www.prisma.io/) и PostgreSQL.

---

## Содержание

- [Описание](#описание)
- [Стек технологий](#стек-технологий)
- [Структура проекта](#структура-проекта)
- [Модели данных](#модели-данных)
- [API](#api)
- [Переменные окружения](#переменные-окружения)
- [Запуск проекта](#запуск-проекта)
- [Тесты](#тесты)

---

## Описание

Сервис предоставляет API для управления промокодами и пользователями:

- Создание промокодов с указанием скидки и срока действия.
- Активация промокода конкретным пользователем (один промокод — одна активация).
- Управление пользователями (CRUD).
- Автоматическая валидация входных данных через `class-validator`.
- Swagger-документация доступна по адресу `/api`.

---

## Стек технологий

| Компонент       | Технология                          |
|-----------------|-------------------------------------|
| Framework       | NestJS 11                           |
| ORM             | Prisma 7                            |
| База данных     | PostgreSQL 17                       |
| Валидация       | class-validator / class-transformer |
| Документация    | Swagger / OpenAPI                   |
| Контейнеризация | Docker / Docker Compose             |
| Язык            | TypeScript 5                        |

---

## Структура проекта

```
src/
├── activation/       # Модуль активаций промокодов
├── exceptions/       # Кастомные исключения
├── prisma/           # Модуль подключения к БД
├── promocode/        # Модуль промокодов (контроллер, сервис, DTO)
│   └── dto/
│       └── promocode/
│           ├── create.ts    # DTO создания промокода
│           └── activate.ts  # DTO активации промокода
├── user/             # Модуль пользователей (контроллер, сервис, DTO)
├── app.module.ts     # Корневой модуль
├── main.ts           # Точка входа
└── http-exception.filter.ts  # Глобальный фильтр ошибок
prisma/
└── schema.prisma     # Схема базы данных
```

---

## Модели данных

### User

| Поле        | Тип      | Описание              |
|-------------|----------|-----------------------|
| `id`        | UUID     | Первичный ключ        |
| `email`     | String   | Уникальный email      |
| `name`      | String?  | Имя (опционально)     |
| `createdAt` | DateTime | Дата создания         |
| `updatedAt` | DateTime | Дата обновления       |

### Promocode

| Поле        | Тип      | Описание              |
|-------------|----------|-----------------------|
| `id`        | UUID     | Первичный ключ        |
| `code`      | String   | Уникальный код        |
| `discount`  | Float    | Размер скидки         |
| `expiresAt` | DateTime | Срок действия         |
| `createdAt` | DateTime | Дата создания         |
| `updatedAt` | DateTime | Дата обновления       |

### Activation

| Поле          | Тип      | Описание                    |
|---------------|----------|-----------------------------|
| `id`          | UUID     | Первичный ключ              |
| `promocodeId` | UUID     | Ссылка на промокод (1-к-1)  |
| `userId`      | UUID     | Ссылка на пользователя      |
| `createdAt`   | DateTime | Дата активации              |

---

## API

Базовый путь: `/api/v1`  
Swagger UI: `http://localhost:3000/api`

### Промокоды

| Метод | Путь                                 | Описание                 |
|-------|--------------------------------------|--------------------------|
| GET   | `/api/v1/promocodes`                 | Получить все промокоды   |
| POST  | `/api/v1/promocodes`                 | Создать промокод         |
| POST  | `/api/v1/promocodes/:id/activations` | Активировать промокод    |

**Создать промокод** `POST /api/v1/promocodes`
```json
{
  "code": "SUMMER25",
  "discount": 25,
  "expiredAt": "2026-12-31T23:59:59Z"
}
```

**Активировать промокод** `POST /api/v1/promocodes/:id/activations`
```json
{
  "userId": "uuid-пользователя"
}
```

### Пользователи

| Метод  | Путь                  | Описание                      |
|--------|-----------------------|-------------------------------|
| GET    | `/api/v1/users`       | Получить всех пользователей   |
| GET    | `/api/v1/users/:id`   | Получить пользователя по ID   |
| POST   | `/api/v1/users`       | Создать пользователя          |
| PATCH  | `/api/v1/users/:id`   | Обновить пользователя         |
| DELETE | `/api/v1/users/:id`   | Удалить пользователя          |

**Создать пользователя** `POST /api/v1/users`
```json
{
  "email": "user@example.com",
  "name": "Иван"
}
```

---

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# Строка подключения к БД
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5434/DB_NAME"

# Параметры PostgreSQL (используются в docker-compose)
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db

# Порты (опционально, есть значения по умолчанию)
DB_PORT=5434
PORT=3000
```

---

## Запуск проекта

### Требования

- [Node.js](https://nodejs.org/) >= 20
- [Docker](https://www.docker.com/) и Docker Compose

### 1. Установить зависимости

```bash
npm install
```

### 2. Создать файл `.env`

Создайте `.env` в корне проекта и заполните переменные (см. раздел [Переменные окружения](#переменные-окружения)).

### 3. Запустить базу данных через Docker

```bash
docker compose up -d
```

### 4. Применить миграции базы данных

```bash
npm run migrate
```

### 5. Сгенерировать Prisma Client

```bash
npm run generate
```

### 6. Запустить приложение

```bash
# Режим разработки (с hot-reload)
npm run start:dev

# Обычный запуск
npm run start

# Production-режим
npm run build
npm run start:prod
```

Приложение будет доступно по адресу: **http://localhost:3000**  
Swagger UI: **http://localhost:3000/api**

---

## Тесты

```bash
# Unit-тесты
npm run test

# E2E-тесты
npm run test:e2e

# Покрытие кода
npm run test:cov
```
