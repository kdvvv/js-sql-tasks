import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const solution = async (articles) => {
  if (!Array.isArray(articles) || articles.length === 0) {
    return [];
  }

  const sql = postgres(config);

  const ids = [];

  for (const article of articles) {
    const result = await sql`
            INSERT INTO articles (title, description)
            VALUES (${article.title}, ${article.description}) RETURNING id;
        `;

    ids.push(result[0].id);
  }

  return ids;
}

export default solution;
// END
