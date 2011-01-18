<html>
<head><title>OER Rocks!</title></head>
<body>

<?php 

// URL PROCESSING BLOCK.
// This block of PHP is called if there's a URL -- which means we presume
// that it's an attempted submission to OER-C.

if ($_GET['link'])
{

  // If there's a link, put the contents of that link up in a separate 
  // iframe, so that users can easily refer to the page as they enter
  // metadata about that page.

  echo '<iframe src=' . $_GET['link'] . ' width="100%" height="60%"></iframe>';

  // Now, we have to find out if the link already exists in
  // the OER Commons database.  For this, we will use the API.
  // Currently, this is an external Python call.  A big FIXME
  // is to write PHP bindings for this API -- and since it's all
  // dead simple JSON stuff, that shouldn't be difficult.

  $raw_resource = exec("/var/www/html/oer-connector/backend/OER-Commons-API/GETRESOURCE/getResourceByUrl.sh " . $_GET['link']);

  $resource = json_decode($raw_resource);

  // echo "<pre>\n";
  // echo var_dump($resource);
  // echo "</pre>\n";

  // echo $resource->title;
  $newtitle = $resource->title;
  echo $newtitle;
  $urltitle = preg_replace("/\W+/", '-', $resource->title);
  $urltitle = strtolower($urltitle);
  $fullurl = 'http://www.oercommons.org/courses/' . $urltitle;
  // $urltitle = preg_replace("/r/", '-', $newtitle);

  echo '<iframe src=' . $fullurl . ' width="100%" height="40%"></iframe>';

  // Fetch the link and parse it to prepopulate the PHP page.
  // Helpful notes at http://blog.unitedheroes.net/curl/

  $curl_handle=curl_init();
  curl_setopt($curl_handle,CURLOPT_URL,$_GET['link']);
  curl_setopt ($curl_handle, CURLOPT_RETURNTRANSFER, 1); 
  $page_content = curl_exec($curl_handle);
  curl_close($curl_handle);

  // Match for TITLE.
  $regex='/<title>(.*?)<\/title>/';
  if (preg_match($regex,$page_content,$matches)) {
    $page_title = $matches[1];
  }

  // Match for CC LICENSE URL.
  // This doesn't work, but it's a start.
  $regex='/<a href="(.*creativecommons.*)">/';
  if (preg_match($regex,$page_content,$matches)) {
    $page_license= $matches[1];
  }
}
else
{
?>
  <div id="content">
  <h1>AWESOME!!!</h1>
  <h2>Thanks for submitting that excellent resource.</h2>
  <h1>You are an OER NINJA!</h1>
  </div>
<?php
}
?>

</body>
</html>
