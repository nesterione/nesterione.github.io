<?
header('Content-Type: text/html; charset=utf-8');
$host = $_SERVER['HTTP_HOST'];
setlocale(LC_TIME, "ru_RU.utf8");
date_default_timezone_set('Europe/Moscow');
 include ('db.php');
 $nowDate = date("Y-m-d H:i:s");

 $sql = 'INSERT INTO `Info`(`Data`) VALUES ("Show Flower! :'.$nowDate.'")';
 
if(!mysql_query($sql)) {
	echo '<center><p><b>Ошибка при добавлении данных!</b></p></center>';
} else {
	echo '<center><p><b>Данные успешно добавлены!</b></p></center>';
}
?>