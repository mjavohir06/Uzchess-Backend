# UzChess — backend (NestJS)

UzChess shaxmat platformasining 3-versiyasi uchun backend.
Frontend: [Uzchess_next_js](https://github.com/mjavohir06/Uzchess_next_js) · 1-versiya: [UzChess](https://github.com/mjavohir06/UzChess)

**Texnologiyalar:** NestJS, TypeORM, PostgreSQL, CQRS, JWT, Socket.IO, Swagger, Docker

## Modullar
- `authentication` — ro'yxatdan o'tish, kirish, JWT, argon2
- `courses` — shaxmat kurslari
- `library` — kitoblar kutubxonasi
- `news` — yangiliklar
- `matches` — o'yinlar
- `chat` — real vaqtdagi chat (WebSocket)
- `reports` — hisobotlar

## Ishga tushirish

```bash
cp .env.example .env
docker compose up -d     # yoki: npm install && npm run start:dev
```

API hujjatlari ishga tushgandan keyin Swagger'da ochiladi.
