exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
    CREATE TABLE "bazaar"."users" (
      "id" SERIAL PRIMARY KEY,
      "fullname" TEXT NOT NULL,
      "email" TEXT UNIQUE NOT NULL,
      "password" TEXT NOT NULL,
      "date_created" TIMESTAMP NOT NULL DEFAULT now(),
      "status" TEXT,
      "country" TEXT,
      "age" INTEGER,
      "gender" TEXT,
      "avatar" TEXT DEFAULT 'https://cdn.onlinewebfonts.com/svg/img_299586.png'
    );
  `);

  //2. Items Table
  pgm.sql(`
    CREATE TABLE "bazaar"."items" (
      "id" SERIAL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "status" TEXT NOT NULL,
      "price" NUMERIC(10,2),
      "inventory" INTEGER NOT NULL,
      "description" TEXT,
      "thumbnail" TEXT NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
      "condition" TEXT NOT NULL,
      "owner_id" INTEGER REFERENCES bazaar.users(id) NOT NULL,
      "date_created" TIMESTAMP NOT NULL DEFAULT now(),
      "sold" INTEGER NOT NULL
    );
  `);
  //3. Transaction Table
  pgm.sql(`
    CREATE TABLE "bazaar"."transactions" (
      "id" SERIAL PRIMARY KEY,
      "transaction_date" TIMESTAMP NOT NULL DEFAULT now()
    );
  `);
  //4. Purchased Items Table
  pgm.sql(`
    CREATE TABLE "bazaar"."purchased_items" (
      "item_id" INTEGER REFERENCES bazaar.items(id) NOT NULL,
      "seller_id" INTEGER REFERENCES bazaar.users(id) NOT NULL,
      "shipping_status" TEXT NOT NULL,
      "owner_id" INTEGER REFERENCES bazaar.users(id) NOT NULL,
      "quantity" INTEGER NOT NULL,
      "transaction_id" INTEGER REFERENCES bazaar.transactions(id)
    );
  `);
  //5. User Ratings Table
  pgm.sql(`
    CREATE TABLE "bazaar"."user_ratings" (
      "id" SERIAL PRIMARY KEY,
      "rater_id" INTEGER REFERENCES bazaar.users(id) NOT NULL,
      "ratee_id" INTEGER REFERENCES bazaar.users(id) NOT NULL,
      "rating" NUMERIC(3,2) NOT NULL,
      "review" TEXT
    );
  `);
  //6. Item Ratings Table
  pgm.sql(`
    CREATE TABLE "bazaar"."item_ratings" (
      "id" SERIAL PRIMARY KEY,
      "rater_id" INTEGER REFERENCES bazaar.users(id) NOT NULL,
      "item_id" INTEGER REFERENCES bazaar.items(id) NOT NULL,
      "rating" NUMERIC(3,2) NOT NULL,
      "review" TEXT
    );
  `);
  /* TODO: add more migrations */
};
