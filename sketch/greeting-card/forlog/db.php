<?php
header('Content-Type: text/html; charset=utf-8');
$host = $_SERVER['HTTP_HOST'];
setlocale(LC_TIME, "ru_RU.utf8");
date_default_timezone_set('Europe/Moscow');
 // Выполняем все команды файла config.php

$bd = mysql_connect("mysql.hostinger.ru","u763643126_test","VVc5M2");
mysql_select_db("u763643126_test",$bd);
 ?>