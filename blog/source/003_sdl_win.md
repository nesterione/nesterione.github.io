<!--
{ "title":"Использование и установка SDL 2 на windows",
  "category":"OpenGL",
  "date":"27.03.2015",
  "change":"22.08.2015",
  "slug":"00003",
  "comments":"55aa81c9a4e0b5d90568fc81" }
-->

## Использование и установка SDL 2 на windows

### Что такое SDL?

Simple DirectMedia Layer (SDL) — это свободная кроссплатформенная мультимедийная библиотека, реализующая единый программный интерфейс к графической подсистеме, звуковым устройствам и средствам ввода для широкого спектра платформ. Данная библиотека активно используется при написании кроссплатформенных мультимедийных программ (в основном игр).

###Приступим к установке

SDL кроссплатформенная библиотека. Здесь я кратко поясню как можно установить SDL для разработки приложений на Windows с использованием компилятора MinGW. Почему я выбрал именно MinGW? Поскольку я ориентируюсь на кроссплатформенную разработку, и код написанный на MinGW можно будет без проблем перенести на Linux.

*Хочу заменить что я описываю установку в марте 2015, и поэтому со временем что-то может поменяться, но скорее всего суть останется прежней.*

### 1. Скачайте SDL библиотеки для разработчика

Для начала вам нужно зайти на сайт SDL [https://www.libsdl.org/](https://www.libsdl.org/) и скачать его версия 2.0 для window, обратите внимание что вам нужны  **Development Libraries**:

![Library](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0003/image03.PNG)

Скачивайте и в распакованном архиве выбирайте версию для своей платформы.

![Library](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0003/image05.PNG)


### Сделайте так чтобы ваш компилятор их нашел

И тут у вас 2 варианта, либо указать путь компилятору где находятся заголовочные файлы ** \*.h ** и файлы библиотек ** \*.a ** (для MinGW), или можете вручную забросить файлы в стандартные папки компилятора.

#### Вариант 1:

Чтобы указать компилятору где искать include

```sh
Чтобы указать компилятору где искать libs
```

```sh
-LвашПуть
```


Путь лучше брать в кавычки если вы компилируете с командной строки, можете просто дописать эти команды после команды компиляции, в другом случае смотрите как это сделать для вашей среды разработки.

#### Вариант 2 (разбросать файлы по нужным каталогам):

Открыть папку с установленным MinGW и скопировать библиотеки для вашей платформы:

![Library](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0003/image01.PNG)

И это все!

### Компиляция:

Чтобы собрать программу, компилятору нужно указать ссылки на библиотеки  

```bash
-lmingw32 -lSDL2main -lSDL2
```

**(! Их нужно указывать именно в таком порядке, иначе получите ошибки помпиляции)**


Я использую для небольших программ geany
[http://www.geany.org/](http://www.geany.org/) и команды компиляции выглядят следующим образом:

![Library](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0003/image06.PNG)

Теперь создайте файл (например test.cpp), и попробуйте скомпилировать следующий код (просто создает окно, которое закрывается через некоторое время):

```cpp
// Using SDL and standard IO
#include <SDl2/SDL.h>;
#include <stdio.h>;

// Screen dimension constants
const int SCREEN_WIDTH = 640;
const int SCREEN_HEIGHT = 480;

int main(int argc, char* argv[]) {
    // The window we'll be rendering to
    SDL_Window* window = NULL;

    // The surface contained by the window
    SDL_Surface* screenSurface = NULL;

    // Initialize SDL
    if( SDL_Init( SDL_INIT_VIDEO) &lt; 0 ) {
        printf( "SDL could not initialize! SDL_GetError: %s\n", SDL_GetError() );
    }
    else {
        // Create window

        window = SDL_CreateWindow("My SDL Window", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
             SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN );
        if( window == NULL ) {
            printf( "Window could not be created! SDL_GetError: %s\n", SDL_GetError() );
        }
        else {
            // Get window surface
            screenSurface = SDL_GetWindowSurface( window );

            // Fill the surface white
            SDL_FillRect( screenSurface, NULL, SDL_MapRGB( screenSurface->format, 0xFF, 0xFF, 0xFF));

            // Update the surface
            SDL_UpdateWindowSurface( window );

            // Wait two seconds
            SDL_Delay( 2000 );
        }
    }

    // Destroy window
    SDL_DestroyWindow( window );

    // Quit SDL subsystems
    SDL_Quit();

    return 0;
}
```

При запуске у вас будет пустое окно:

![Library](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0003/image02.PNG)

Теперь вы можете, например, подключить OpenGL и сделать свою игру! Не забывайте, чтобы ваша программа запускалась на других компьютерах нужно копировать вместе с \*.exe файлом, еще и файл SDL2.dll (Можно скачать с сайта или взять из архива который вы скачали). Ложить его нужно вместе с exe файлом

## Проблемы при компиляции?

В зависимости от версии SDL у вас может возникнуть следующая проблема:

![Library](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0003/image00.PNG)

Описание проблемы есть на stackoverflow
[Вопрос на stakoverflow](http://stackoverflow.com/questions/22446008/winapifamily-h-no-such-file-or-directory-when-compiling-sdl-in-codeblocks)

Это ошибка в заголовочном файле SDL. Вы можете скачать обновленный файл [(скачать)](https://hg.libsdl.org/SDL/raw-file/e217ed463f25/include/SDL_platform.h)

и заменить его в папке, куда вы скопировали библиотеки, в моем случае:

![Library](https://www.googledrive.com/host/0B2w0rtQkeBZadEpxd3Y2M3hMTUU/blog/0003/image04.PNG)

Теперь компиляция должна пройти успешно (если нет, посмотрите или правильные версии библиотек вы скопировали)