<!--
{ "title":"Material Design и AngularJS",
  "category":"FrontEnd",
  "date":"12.01.2015",
  "change":"23.08.2015",
  "slug":"00004",
  "comments":"55aa81f5a4e0b5d90568fc82" }
-->

## Material Design и AngularJS

Ни для кого не секрет, что Google повсюду в своих продуктах внедряет так называемый material design. Как и любой другой стиль он имеет сторонников и противников. Не буду касаться этих споров. Если вам нравится данный подход, Google подготовил полную спецификацию и описание особенностей: [Material Design](http://www.google.com/design/spec/material-design/introduction.html).

Для любителей angularjs появилась [библиотека](https://material.angularjs.org/#/) с набором директив, реализующих графические компоненты и позволяющих создавать разметку в соответствии с принципами material design. О ней и пойдет рассказ.
Я постараюсь кратко показать некоторые особенности и недостатки, а также покажу небольшое [приложение](http://nesterione.github.io/md-angular-demo/) для демонстрации.

![AngularJS](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image00.PNG)

### Что мы имеем?

1.Готовые компоненты:

Множество готовых angularjs директив для различных компонентов: кнопок, переключателей, вкладок. Все перечислять не буду, все это хорошо освещено в [документации](https://material.angularjs.org/#/demo/material.components.button), покажу лишь основной принцип:

Вам нужна круглая кнопка?

![Button](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image01.PNG)

Используем готовую директиву, т.е. пишем:

```html
<md-button class="md-fab md-primary" md-theme="cyan" aria-label="Profile">
     <md-icon icon="/img/icons/ic_people_24px.svg" style="width: 24px; height: 24px;"></md-icon>
</md-button>
```

Если нужно добавить всплывающую подсказку, тоже все предусмотрено:

```html
<md-button class="md-fab md-primary" md-theme="cyan" aria-label="Profile">
      <md-icon icon="/img/icons/ic_people_24px.svg" style="width: 24px; height: 24px;"></md-icon>
      <md-tooltip>
        Photos
      </md-tooltip>
</md-button>
```

Нужны переключатели?

![Button](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image02.PNG)

```html
<div class="inset" ng-controller="SwitchDemoCtrl">
  <md-switch ng-model="data.cb1" aria-label="Switch 1">
    Switch 1: {{ data.cb1 }}
  </md-switch>
  <md-switch ng-model="data.cb2" aria-label="Switch 2" ng-true-value="'yup'" ng-false-value="'nope'" class="md-warn">
    Switch 2 (md-warn): {{ data.cb2 }}
  </md-switch>
  <md-switch ng-disabled="true" aria-label="Disabled switch">
    Switch (Disabled)
  </md-switch>
  <md-switch ng-disabled="true" aria-label="Disabled active switch" ng-model="data.cb4">
    Switch (Disabled, Active)
  </md-switch>
  <md-switch class="md-primary" md-no-ink aria-label="Switch No Ink">
    Switch (md-primary): No Ink
  </md-switch>
</div>
```

Все это удобным образом связывается с данными:

```js
.controller('SwitchDemoCtrl', function($scope) {
  $scope.data = {
    cb1: true,
    cb4: true
  };
});
```

Удобно? Конечно!.. Но только когда вам достаточно стандартных опций, которых не так уж и много. Заходите сделать какую-то особенность — и сразу все плюсы теряются.

2.Разметка

Для того, чтобы создавать адаптивную разметку, предусмотрено почти все необходимое. Вы можете создавать колонки, строки, вкладывать эти элементы друг в друга. Можно указывать как отображаться элемента при разных размерах экранов, все это реализовано вполне удобно. Рекомендую ознакомиться с [примерами](https://material.angularjs.org/#/layout/grid).

3.Темы

Еще одна особенность — возможность описывать темы. Темы можно менять динамически с помощью директив или в контроллере. Изначально темы уже описаны для всех основных цветов используемых в Material Design. [Подробнее](https://material.angularjs.org/#/Theming/01_introduction).

### Пример приложения

Лучший способ понять преимущества и недостатки чего-либо — использовать это. Я сделал небольшой демонстрационный проект. Это небольшое приложение, здесь я не использовал удаленный REST сервис [соответственно, вносимые изменения нигде не отобразятся], чтобы сосредоточиться непосредственно на angularjs и возможностях material-angular.

Я сделаю простой редактор, в котором можно, нажав на плавающую кнопку, добавить задание, выбрав которые можно отметить, после чего они будут перенесены в архив.

![Demo](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image03.PNG)

[live demo](http://nesterione.github.io/md-angular-demo/)
[проект на github](https://github.com/nesterione/material-angular-demo-project/tree/habr)

Для начала создадим angular проект на базе angular-seed. Здесь я не буду рассказывать про ngRroute и ngView, кто работал с angularjs — это знают (если не знакомы с angularjs, прошу [сюда](https://angularjs.org/)).

Нам понадобится верхний toolbox:

![Toolbox](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image04.PNG)

Для этих целей предусмотрен соответствующий элемент:

```html
<md-toolbar md-theme="indigo" class="app-toolbar md-indigo-theme md-whiteframe-z2 fix-top" >
   <div class="md-toolbar-tools" tabindex="0">
     <md-button class="menu-icon nornal-btn" ng-click="toggleRight()" aria-label="Toggle Menu">
       <md-tooltip >
         Меню
       </md-tooltip>
       <md-icon icon="img/icons/ic_menu_24px.svg"></md-icon>
     </md-button>
     Список задач
   </div>
</md-toolbar>
```

Также нужно сделать слева выдвижное меню, для этого тоже все предусмотрено:

```html
<md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left">
    <div ng-controller="LeftCtrl" ng-click="close()">
      <md-toolbar md-theme="indigo">
        <h1 class="md-toolbar-tools">Меню</h1>
      </md-toolbar>
      <md-content >
        <a class="menu-item menu-sub-item md-menu-item" ng-click="menu.toggleSelectPage(page)"
        ng-repeat="page in menu.pages" ng-href="#{{page.url}}"
        md-highlight="menu.isPageSelected(page)" md-ink-ripple="#bbb">  
          <span > {{page.discription}} </span>
        </a>
      </md-content>
    </div>
  </md-sidenav>
```

Для управления открытием можем использовать следующий код:

```js
.controller('MainCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.toggleRight = function() {
    $mdSidenav('left').toggle();
  };
...
});
```

Таким образом, мы получили основной каркас. Теперь наполнение — это часть, которая будет изменятся при переходе между страницами. Наш view, в котором я буду отображать список задач:

![Toolbox](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image05.PNG)

Можно либо сразу отметить задачу как выполненную, либо при наведении на кружок появляется checkbox и мы можем отметить несколько записей одновременно, после выделения хотя бы одной записи верхний toolbox меняет свой вид. Поскольку основной toolbox находится не во view, то было принято решение просто выводить другой toolbox поверх заданного в каркасе.

![Toolbox](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image06.PNG)

Добавление новых элементов. Было принято решение вызывать диалоговое окно, в котором можно задать параметры.
Тут я поясню некоторую особенность, которая позволяет очень гибко управлять окнами. Данным фреймворком можно создавать как простые окна, так и сложные: для этого создается отдельная html страница, которая является шаблоном для модального окна.

![Toolbox](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image07.PNG)

При создании своего окна для управления создается контроллер, который будет обрабатывать и передавать данные из окна.

```html
<div class="md-actions" layout="row">
    <md-button ng-click="cancel()">
     Отмена
    </md-button>
    <!-- Вот здесь выполняется передача данных с окна-->
    <md-button ng-click="answer(todo)" class="md-primary">
      Добавить
    </md-button>
</div>
```

Код контроллера управляющего окном:

```js
function DialogController($scope, $mdDialog) {
 ...

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
```

Тогда само окно может вызываться в коде следующим образом:

```js
$mdDialog.show({
      controller: DialogController,
      // вот здесь указывается путь к странице описывающей вид нашего модального окна
      templateUrl: 'dialog.tmpl.html',
      targetEvent: ev,
    })
    .then(function(answer) {
    // answer это то что было передано из нашего окна
    // и здесь происходит вся последующая обработка данных
});
```

Я не стал подробно описывать как все реализовано, чтобы не нагромождать кучей довольно простого кода, только выделил моменты, касающиеся material angular. Все остальное вы можете посмотреть на [github](https://github.com/nesterione/material-angular-demo-project/tree/habr).

### Впечатления и выводы

Изначально я подумал, что появилась замечательная возможность разрабатывать angular приложения с material design, однако немного поработав могу однозначно сказать: использовать еще рано (на момент написания версия 0.6). Содержится множество мелких багов, некоторые элементы отображаются по-разному в различных браузерах и постоянно приходится подстраивать стили вручную.

На данный момент множество проблем с отображением в различных браузерах. Проблем много (столкнулся при написании демонстрационного проекта), покажу только несколько (это примеры с официального сайта проекта, открытые в разных браузерах).

Значки на кнопках:

(Google Chrome):

![Toolbox](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image08.PNG)

(Internent Exprorer 11):

![Toolbox](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image09.PNG)

Диалоговые окна:

(Google Chrome):

![Toolbox](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image10.PNG)

(Internent Exprorer 11):

![Toolbox](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0004/image11.PNG)

Дальше показывать косяки, думаю, не имеет смысла, они есть, и их много, а это значит, что вам придется вручную все поправлять.

Также к недостаткам можно отнести, что не сделано ничего для поддержки различных анимаций. В Material Design много уделяют этому [вопросу](http://www.google.com/design/spec/animation/authentic-motion.html) . Но все это придется делать именно вам.

Пока сложно сказать, как скоро будут исправлены недостатки, но на данном этапе для использования angular material явно не готов.

### Ссылки

* [Мой демо проект](http://nesterione.github.io/md-angular-demo/)
* [Исходный код демо проекта](https://github.com/nesterione/material-angular-demo-project/tree/habr)
* [Сайт проекта Material Angular](https://material.angularjs.org)
* [Официальное описание принципов Material Design](http://www.google.com/design/spec/material-design/introduction.html)

[Оригинал моей статьи на Habrahabr.ru](http://habrahabr.ru/post/247719/)
