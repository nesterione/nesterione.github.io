<!--
{ "title":"Пакет Pandas (Для Python)",
  "category":"ML",
  "date":"03.04.2015",
  "change":"23.08.2015",
  "slug":"00005",
  "comments":"55aa825aa4e0b5d90568fc83" }
-->

## Пакет Pandas (Для Python)

![Cover](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0005/image00.PNG)

### Вступление

Я относительно недавно занимаюсь машинным обучением и анализом данных, и при решении одной задачи на [www.kaggle.com](www.kaggle.com) встретил pandas: библиотеку Python для предназначенную для анализа данных. В данной статье хочу выписать самые основы данного инструмента.

Эта публикация не претендует на tutorial, больше как введение для начала работы. Pandas имеет хорошую документацию и постоянно развивается, поэтому проблем с информацией нет. Сразу же размещу ссылку исходный код примеров в данной статьи: [Исходный код примеров](https://github.com/nesterione/experiments-of-programming/tree/master/Python/pandas)

В Pandas есть основные типы данных: **Series** и **DataFrame**

Series - индексированный одномерный массив значений. Похож на **dict**. **DataFrame** - индексированный многомерный массив. Каждый столбец **DataFrame -> Series**.

Pandas умеет загружать данные с различных источников. Я буду использовать **csv** файл (это обычный текстовый файл, где данные разделены каким-нибудь символом, как правило запятой). Большинство задач на [www.kaggle.com](www.kaggle.com) исходный данные поставляются именно в таком формате.

Для чтения из файла:

```python
import pandas

f1 = pandas.read_csv("f1.csv")
f2 = pandas.read_csv("f2.csv",";")
```

При чтении данных вы получите **DataFrame**

### Что можно делать с данными?

Я покажу основные операции, которые вы привыкли делать на SQL, которых достаточно для начала работы.

Можно вставлять столбцы командой **insert**. Если размерность вставляемого столбца не совпадает, получите ошибку. Первый параметр указывает после какого столбца следует добавить столбец.

```python
f2.insert(1, 'hedername', dataset)
```

Теперь проверим выборки данных. Нам нужно выбрать записи для которых некоторое поле рано указанному значению. Это подобно **SELECT .., WHERE (condition)** если вы знакомы с SQL. В pandas это делается так:

```python
dset = f2[f2.somecolumn== u'Sometext']
```

#### Добавление строк в набор

Добавлять можно **Dict** (словари) и **Series** и **DataFrame** вот пример

```python
news = pandas.DataFrame([["Name", "444","Gomel"], ["N2","43","Brest"]], columns=["country","shop","name"])
print(news)
f3 = f2.append(news)
print(f3)
```

обратите внимание что команда append не изменяет текущий **DataFrame**, а возращает новый, в который будут добавлены строки из другого фрейма.

#### Агрегация (Объединение) данных

Эта конструкция очень похожа на JOIN в SQL (и принимает такиеже параметры: left, right, inner)

```python
res = f2.merge(f1, 'left', on='shop')
```

![Data](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0005/image01.PNG)

Сводная таблица (GROUP BY в SQL) первый параметр, по которым будет выполняться расчет второй, список столбцов итоговой таблицы третий, как считать последний, каким значением заполнять пустые значения

```python
res = res.pivot_table(['qty'],['country'], aggfunc='sum', fill_value = 0)
```

### Ресурсы

Полный код примера на GitHub (там же находятся и исходные файлы примеров)

[Исходный код примеров](https://github.com/nesterione/experiments-of-programming/tree/master/Python/pandas)

использованные источники:

[http://habrahabr.ru/post/196980/](http://habrahabr.ru/post/196980/)

### Заключение

Это был небольшой обзор теперь можно приступать непосредственно к решению задач. Я не стал сюда же добавлять еще и решение задачи, что бы не делать этот обзор очень большим, поэтому как только обзор задачи будет готов, я добавлю сюда ссылку. Также при решении задачи, скорее всего понадобятся дополнительные функции pandas, которые я буду рассматривать прямо там. Для определенности скажу что я буду решать задачу с [www.kaggle.com](www.kaggle.com)  [titanic-gettingStarted](https://www.kaggle.com/c/titanic-gettingStarted) (это задача для новичков, там есть пояснения как решать и хорошо структурированы данные). Суть задачи проста, нужно определить по данным о пассажирах титаника, кто из них погиб. Эту задачу предлагается решать в Excel, Python или R. Я буду использовать, как вы поняли, python и pandas.