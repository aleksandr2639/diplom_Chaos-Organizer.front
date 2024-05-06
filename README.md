# Дипломное задание к курсу «Продвинутый JavaScript в браузере». Chaos Organizer

[![Build status](https://ci.appveyor.com/api/projects/status/xbbocknpwi2j5ob0/branch/main?svg=true)](https://ci.appveyor.com/project/aleksandr2639/diplom-chaos-organizer-front/branch/main)

[Deploy](https://aleksandr2639.github.io/diplom_Chaos-Organizer.front/)

## Обязательные для реализации функции:
- сохранение в истории ссылок и текстовых сообщений;
- ссылки (http:// или https://) должны быть кликабельны и отображаться, как ссылки;
![Ссылки](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/ссылки.png)
- сохранение в истории изображений, видео и аудио (как файлов) — через Drag & Drop и через иконку загрузки;
![Перетаскивание](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/перетаскивание.png)
-Иконка 'Cкрепка' служит для вызова меню и выбора типа загружаемого файла.
![Скрепка](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/скрепка.png)
- скачивание файлов на компьютер пользователя;
![Скачивание](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/скачать.png)
- ленивая подгрузка: сначала подгружаются последние 10 сообщений, при прокрутке вверх подгружаются следующие 10 и т. д.

## Дополнительные для реализации функции:

- синхронизация: если приложение открыто в нескольких окнах или вкладках, то контент должен быть синхронизирован;
- Для начала поиска нужно кликнуть на лупу. Откроется вкладка со строкой ввода текста.
  ![Поиск](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/поиск.png)
- запись видео и аудио, используя API браузера; 
   1.Запись аудио-сообщений начинается с клика на 'микрофон'
![Видео и аудио](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/аудио.png)
   2.Запись видео-сообщений начинается с клика на 'камеру'
![Видео и аудио](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/видео.png)
- отправка геолокации. Отправка определяется пунктом меню 'Геолокация'. Если галочка установлена данные будут отправляться.
![Геолокация](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/гео.png)

![Геолокация](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/гео_ошибка.png)
- воспроизведение видео/аудио, используя API браузера;
![Видео и аудио](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/аудио%20сообщение.png)

![Видео и аудио](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/видео%20сообщение.png)
- отправка команд боту: @chaos: погода, бот должен отвечать рандомным прогнозом погоды, интегрироваться с реальными сервисами не требуется, команд должно быть не менее 5;
![бот](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/бот.png)

![бот](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/бот2.png)
- добавление сообщения в избранное, должен быть интерфейс для просмотра избранного;
  1.Для добавления в  избранное нужно во всплывающем меню выбрать 'В избранное'. При этом перед датой сообщения появится звездочка.
![избранные](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/избранное%201.png)

![избранные](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/избранное%202.png)
- поддержка смайликов (emoji);
![emoji](https://github.com/aleksandr2639/diplom_Chaos-Organizer.front/blob/main/src/img/эмоджи.png)

