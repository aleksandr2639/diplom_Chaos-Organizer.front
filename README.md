# Дипломное задание к курсу «Продвинутый JavaScript в браузере». Chaos Organizer

[![Build status](https://ci.appveyor.com/api/projects/status/xbbocknpwi2j5ob0/branch/main?svg=true)](https://ci.appveyor.com/project/aleksandr2639/diplom-chaos-organizer-front/branch/main)

[Deploy](https://aleksandr2639.github.io/diplom_Chaos-Organizer.front/)

## Обязательные для реализации функции:
- сохранение в истории ссылок и текстовых сообщений;
- ссылки (http:// или https://) должны быть кликабельны и отображаться, как ссылки;
![Ссылки](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/ссылки.png)
- сохранение в истории изображений, видео и аудио (как файлов) — через Drag & Drop и через иконку загрузки;
![Перетаскивание](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/перетаскивание.png)
![Скрепка](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/скрепка.png)
- скачивание файлов на компьютер пользователя;
![Скачивание](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/скачать.png)
- ленивая подгрузка: сначала подгружаются последние 10 сообщений, при прокрутке вверх подгружаются следующие 10 и т. д.

## Дополнительные для реализации функции:

- синхронизация: если приложение открыто в нескольких окнах или вкладках, то контент должен быть синхронизирован;
- поиск по сообщениям (интерфейс + реализация на сервере);
- запись видео и аудио, используя API браузера;
- отправка геолокации;
- воспроизведение видео/аудио, используя API браузера;
- отправка команд боту: @chaos: погода, бот должен отвечать рандомным прогнозом погоды, интегрироваться с реальными сервисами не требуется, команд должно быть не менее 5;
- добавление сообщения в избранное, должен быть интерфейс для просмотра избранного;
- поддержка смайликов (emoji);
