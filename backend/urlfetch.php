<?php 

// URL Fetch code.
//
// Ultimately, this code will send back "yes" if the link is
// listed in the OER-C database.
//
// For now, it just returns "yes" for any URL that ends in .org.

$link = ($_GET['link']);

$regex='/\.org/';
$logfile='urlfetch.log';
$fh = fopen($logfile, 'a');
if (preg_match($regex,$link,$matches)) {
  print '{"urlfound": "yes"}';
  fwrite($fh,"yes\n");
}
else {
  print '{"urlfound": "no"}';
  fwrite($fh,"no\n");
}
fclose($fh);

?>
