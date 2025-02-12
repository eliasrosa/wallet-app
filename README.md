docker compose up -d
docker compose exec app npm run import


npx prisma migrate dev 
npx prisma migrate dev --name init