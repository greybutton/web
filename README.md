![Logo](logo.png)
**Приложение для гибкого планирования времени**

[Описание](//readymag.com/greybutton/applaura) | [Демо](//applaura.netlify.com/)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
*При использовании приложения рекомендуется сделать форк*

---

### Разработка

1. Клонировать репозиторий
2. `npm install`
3. Запутить локально mongodb или выполнить п.4 с переменной окружения MONGO_URI sandbox с [mlab.com](mlab.com) (например, `npm run-script develop MONGO_URI=mongodb://<dbuser>:<dbpassword>@ds123456.mlab.com:12345/<dbname>`)
4. Запуск сервера разработки
`npm run-script develop`
5. Открыть [localhost:5000](localhost:5000)

### Подготовка для деплоя
`npm run-script build` (удалит source maps, скомпилирует styl и js файлы)
