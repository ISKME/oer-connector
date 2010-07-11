<?php

$database = new SQLiteDatabase('/var/www/html/oer-connector/data.db', 0666, $error);

$link = $_GET['link'];
$subject = $_GET['subject'];
$grade = $_GET['grade'];
$collection = $_GET['collection'];

$query = "INSERT INTO content(link, subject, grade, collection) VALUES ('$link', '$subject', '$grade', '$collection')";

$results = $database->queryexec($query);

?>
