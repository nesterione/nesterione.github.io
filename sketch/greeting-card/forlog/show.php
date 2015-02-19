<?
header('Content-Type: text/html; charset=utf-8');
$host = $_SERVER['HTTP_HOST'];
setlocale(LC_TIME, "ru_RU.utf8");
date_default_timezone_set('Europe/Moscow');
 include ('db.php');

  //Выбираем все записи
 $sql="SELECT * FROM Info";
 //В переменной $res сохраняем результаты выборки
 $res=mysql_query($sql);
 echo 'Выбранные данные:';
 //В цикле выводим по очереди все полученные строки
 while ($memberinfo=mysql_fetch_array($res))
 {
 echo ' <br> '.$memberinfo["ID"].' -> '.$memberinfo["Data"].' ';
 }

 
?>