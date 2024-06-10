This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# My Notes

### Setup project

```bash
$ npx create-next-app@13.4.19

    ✔ What is your project named? … my-app
    ✔ Would you like to use TypeScript? … Yes
    ✔ Would you like to use ESLint? … Yes
    ✔ Would you like to use Tailwind CSS? … Yes
    ✔ Would you like to use `src/` directory? … Yes
    ✔ Would you like to use App Router? (recommended) … Yes
    ✔ Would you like to customize the default import alias? … No

$ cd folder_name

$ npm i @nextui-org/react framer-motion

$ npm run dev
```

### Update NextJs Version

```bash
$ npm i next@14.2.0 eslint-config-next@14.2.0
```

### Library

1. firebase

   ```bash
   $ npm i firebase
   ```

2. next auth

   ```bash
   $ npm i next-auth
   ```

3. CryptoJs

   ```
   $ npm i crypto-js
   $ npm install @types/crypto-js
   ```

4. Jest

   ```
   $ npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
   $ npm i --save-dev @types/jest
   $ npm install --save-dev ts-node
   ```

5. Prisma

   ```
   // installation
   $ yarn add -D prisma
   $ yarn add @prisma/client

   // init project
   $ yarn prisma init

   // pull existing table into model code
   $ yarn prisma db pull

   // generate table from model
   $ yarn prisma migrate dev
   ```

```
// if (ak_stopword.arr && a_stopword.arr) {
      //   const percentile = 55; // Ubah sesuai kebutuhan
      //   const ak_length = ak_stopword.arr.length;
      //   const a_length = a_stopword.arr.length;

      //   // Hitung nilai persentil untuk kunci jawaban dan jawaban
      //   const ak_percentile = Math.ceil(ak_length * (percentile / 100));
      //   const a_percentile = Math.ceil(a_length * (percentile / 100));

      //   // Tentukan nilai n-gram berdasarkan nilai persentil
      //   nGramValue = Math.max(
      //     Math.floor((ak_percentile + a_percentile) / 2),
      //     1
      //   );
      // }
```
