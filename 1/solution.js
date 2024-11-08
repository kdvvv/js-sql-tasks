import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
async function createTable(db) {
  await db`
        CREATE TABLE IF NOT EXISTS articles (
            title VARCHAR(255),
            description VARCHAR(255)
        );
    `;
}

async function insertArticle(db, title, description) {
  await db`
        INSERT INTO articles (title, description)
        VALUES (${title}, ${description});
    `;
}

export default async function solution() {
  const database = postgres(config);

  await createTable(database);
  await insertArticle(database, 'Тест', 'Тест');
}
// END
