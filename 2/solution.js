import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const saveArticles = async (articlesArray) => {
  if (!Array.isArray(articlesArray) || articlesArray.length === 0) {
    return [];
  }

  const databaseConnection = postgres(config);

  const articleIds = [];

  for (const article of articlesArray) {
    const insertionResult = await databaseConnection`
            INSERT INTO articles (title, description)
            VALUES (${article.title}, ${article.description}) RETURNING id;
        `;

    articleIds.push(insertionResult[0].id);
  }

  return articleIds;
}
export default saveArticles;
// END
