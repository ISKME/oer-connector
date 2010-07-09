<?php
$handle = fopen("/var/www/html/oer-connector/data.txt","a");
if ($handle) {
  // Open data file in append mode
  fwrite($handle,$_GET['link']);
  fwrite($handle,' | ');
  fwrite($handle,$_GET['subject']);
  fwrite($handle,' | ');
  fwrite($handle,$_GET['grade']);
  fwrite($handle,' | ');
  fwrite($handle,$_GET['collection']);
  fwrite($handle,"\n");
}
fclose($handle);
?>
