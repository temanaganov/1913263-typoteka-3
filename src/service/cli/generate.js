'use strict';

const chalk = require(`chalk`);
const {getRandomInt, shuffle, getRandomDate, writeJSONFile} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const CATEGORIES = [`Деревья`, `За жизнь`, `Без рамки`, `Разное`, `IT`, `Музыка`, `Кино`, `Программирование`, `Железо`];
const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];
const ANNOUNCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const getTitle = () => {
  return TITLES[getRandomInt(0, TITLES.length - 1)];
};

const getCreatedDate = () => {
  const currentDate = new Date();
  const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());

  return getRandomDate(minDate).toISOString();
};

const getAnnounce = () => {
  return shuffle(ANNOUNCES).slice(0, getRandomInt(1, 5)).join(` `);
};

const getFullText = () => {
  return shuffle(ANNOUNCES)
    .slice(0, getRandomInt(1, ANNOUNCES.length - 1))
    .join(` `);
};

const getCategory = () => {
  return shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1));
};

const generate = async () => {
  const count = parseInt(process.argv[3], 10) || DEFAULT_COUNT;

  if (count > MAX_COUNT) {
    console.error(chalk.red(`Не больше 1000 объявлений`));
    process.exit(1);
  }

  const result = Array(count)
    .fill({})
    .map(() => ({
      title: getTitle(),
      createdDate: getCreatedDate(),
      announce: getAnnounce(),
      fullText: getFullText(),
      category: getCategory(),
    }));

  await writeJSONFile(`mocks.json`, result);
};

module.exports = {
  name: `--generate`,
  run: generate,
};
