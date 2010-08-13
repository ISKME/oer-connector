<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"> 
<head> 
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 
  <title>OER Commons Knowledge Bank</title> 
  <link rel="stylesheet" href="css/common.css" type="text/css" />
  <link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/base/ui.all.css" />
  <link type="text/css" href="css/ui.multiselect.css" rel="stylesheet" />
  <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
  <script type="text/javascript" src="js/jquery-ui-1.8.custom.min.js"></script>
  <script type="text/javascript" src="js/ui.multiselect.js"></script>

  <script type="text/javascript">
  var rating = new Array('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F');

  // On ready function for multiselect box
  $(function(){
    $(".multiselect").multiselect();
  });


  // On ready function for slider
  $(function() {
    $("#slider").slider({
      value:0,
      min: 0,
      max: 12,
      step: 1,
      slide: function(event, ui) {
        $("#grade").val(rating[ui.value]);
        }
    });    $("#grade").val(rating[$("#slider").slider("value")]);
  });

  </script>

</head>
<body>
 
<div id="wrapper"> 

  <div id="header"> 
    <h1>OER Commons Knowledge Bank</h1> 
    <p>Filling the commons with awesome knowledge, yo!</p>
  </div>

<?php 
// RENDER THIS BLOCK IF THERE'S FORM DATA
if ($_GET['link'])
{
?>
	
  <div id="content">
    <form action="index.php">
      <h3>Link: <?php echo $_GET['link']; ?></h3>
      <h3>Standards Alignment</h3>
      <select id="standards" class="multiselect" multiple="multiple" name="standards[]">
<?php include 'standards/CC-MATH.php'?>
      </select>
      <br/>

      <h3>License</h3>
      <select id="license" name="license">
        <option>CC-BY</option>
        <option>CC-BY-SA</option>
        <option>CC-BY-SA-NC</option>
        <option>Strings Attached / Fair Use</option>
        <option selected> I don't know!</option>
      </select>

      <h3>Your Rating</h3>
      <div id="slider"></div>
      <label for="grade">Your rating is:<label> <input readonly id="grade" class="text" name="grade" style="border:0" size="2" type="text"><br>

      <input type="submit" value="Submit Form"/>
    </form>

  <h3>URL Contents:</h3>
  <pre>
<?php

$curl_handle=curl_init();
curl_setopt($curl_handle,CURLOPT_URL,$_GET['link']);
curl_exec($curl_handle);
curl_close($curl_handle);

?>
  </pre>

  </div> 

<?php
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
 
  <div id="footer"> 
    <p class="left">An <a href="http://www.iskme.org/">ISKME</a> Joint...</p>
    <p class="right">...and an <a href="http://www.oercommons.org">OER Commons production</a>, ya dig?
    <p class="left"><em>Building the Educational Commons...</em></p>
    <p class="right"><em>...By Any Means Necessary</em></p>
    <br class="clear"/>
  </div> 
</div> 
</body> 

</html>
