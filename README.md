# Descripcion


## Correr en dev


1. Clonar el repositorio
2. Instalar depandendicias ```npm install```
3. Levantar la base de datos ```docker comopse up -d```
4. Correr las migraciones de prisma ```npx prisma migrate dev```
5. Ejecutar el see ```npx prisma db seed```
5. Correr el Proyecto ```npm run dev``` 







PS D:\cursos\Nextjs\TesloShop\teslo-shop> npx prisma init --db                            
This will create a project for you on console.prisma.io and requires you to be authenticated.
✔ Would you like to authenticate? Yes
✔ Select an authentication method Google
Authenticating to Prisma Platform via browser.

Visit the following URL in your browser to authenticate:
https://console.prisma.io/auth/cli?state=eyJjbGllbnQiOiJwcmlzbWEtY2xpLWluaXQvMC40LjAgKFNpZ25hdHVyZTogOTE1MTJhNDctMDViMi00OTQ2LWI2ZWEtMmE5NDhjOTNiMzhhKSIsImNvbm5lY3Rpb24iOiJnb29nbGUiLCJyZWRpcmVjdFRvIjoiaHR0cDovLzEyNy4wLjAuMTo1NzAyMS8ifQ%3D%3D
Successfully authenticated as luisslaycore@gmail.com.
Let's set up your Prisma Postgres database!
✔ Select your region: us-east-1 - US East (N. Virginia)
✔ Enter a project name: teslo-shop
✔ Success! Your Prisma Postgres database is ready ✅

We created an initial schema.prisma file and a .env file with your DATABASE_URL environment variable already set.

--- Next steps ---

Go to https://pris.ly/ppg-init for detailed instructions.

1. Define your database schema
Open the schema.prisma file and define your first models. Check the docs if you need inspiration: https://pris.ly/ppg-init.

2. Apply migrations
Run the following command to create and apply a migration:
npx prisma migrate dev --name init

3. Manage your data
View and edit your data locally by running this command:
npx prisma studio

...or online in Console:
https://console.prisma.io/cmca48b9v00ig1n0wblcy8sdh/cmca48p6500ii1n0won4d27dv/cmca48p6500ij1n0whhwjhwzr/studio

4. Send queries from your app
To access your database from a JavaScript/TypeScript app, you need to use Prisma ORM. Go here for step-by-step instructions: https://pris.ly/ppg-init