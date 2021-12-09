-- Получить список всех категорий (идентификатор, наименование категории);
SELECT id, title FROM categories;

-- Получить список категорий для которых создана минимум одна публикация (идентификатор, наименование категории);
SELECT category_id, categories.title FROM articles_categories
  INNER JOIN categories
    ON category_id = categories.id
GROUP BY category_id, categories.title ORDER BY category_id;

-- Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций
-- в категории);
SELECT id, title, count(articles_categories.article_id) FROM categories
  LEFT JOIN articles_categories
    ON id = articles_categories.category_id
GROUP BY id ORDER BY id;

-- Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации,
-- имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации;
SELECT
  articles.id,
  articles.title AS "Заголовк",
  articles.announcement AS "Анонс",
  articles.created_at AS "Дата публикации",
  users.first_name AS "Имя",
  users.last_name AS "Фамилия",
  users.email AS "Email",
  count(comments.id) AS "Кол-во комментариев",
  categories.title AS "Категории"
FROM articles
  INNER JOIN users ON articles.user_id = users.id
  INNER JOIN comments ON articles.id = comments.article_id
  INNER JOIN articles_categories ON articles.id = articles_categories.article_id
  INNER JOIN categories ON articles_categories.category_id = categories.id
GROUP BY articles.id, articles.title, articles.announcement, articles.created_at, users.first_name, users.last_name, users.email, categories.title, categories.id
ORDER BY articles.created_at DESC;

-- Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный
-- текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество
-- комментариев, наименование категорий);
SELECT
  articles.id,
  articles.title AS "Заголовк",
  articles.announcement AS "Анонс",
  articles.full_text AS "Полный текст",
  articles.created_at AS "Дата публикации",
  articles.picture AS "Изображение",
  users.first_name AS "Имя",
  users.last_name AS "Фамилия",
  users.email AS "Email",
  count(comments.id) AS "Кол-во комментариев",
  categories.title AS "Категории"
FROM articles
  INNER JOIN users ON articles.user_id = users.id
  INNER JOIN comments ON articles.id = comments.article_id
  INNER JOIN articles_categories ON articles.id = articles_categories.article_id
  INNER JOIN categories ON articles_categories.category_id = categories.id
GROUP BY articles.id, articles.title, articles.announcement, articles.created_at, users.first_name, users.last_name, users.email, categories.title, categories.id
ORDER BY articles.created_at DESC;

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора,
-- текст комментария);
SELECT comments.id, article_id, users.first_name, users.last_name, text FROM comments
  INNER JOIN users ON users.id = comments.user_id
ORDER BY comments.created_at DESC
LIMIT 5;

-- Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя
-- и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT comments.id, article_id, users.first_name, users.last_name, text FROM comments
  INNER JOIN users ON comments.user_id = users.id
WHERE comments.article_id = 1
ORDER BY comments.created_at DESC;

-- Обновить заголовок определённой публикации на «Как я встретил Новый год»;
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;
