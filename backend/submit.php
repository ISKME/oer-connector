<!-- some style changes -->
<style type="text/css">
body { 
  max-width:250px;
}
#slider { margin: 10px; }
</style>

<!-- this is jquery 1.4.2 and jquery-ui 1.8.2 -->
<link href="jquery-ui.css" rel="stylesheet" type="text/css"/>
<script src="jquery.min.js"></script>
<script src="jquery-ui.min.js"></script>

<script>
  // initialize the slider here
  var rating = new Array('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F');
  $(function() {
    $("#slider").slider({
      value:0,
      min: 0,
      max: 12,
      step: 1,
      slide: function(event, ui) {
        $("#grade").val(rating[ui.value]);
        }
    });
    $("#grade").val(rating[$("#slider").slider("value")]);
  });
</script>

<form id="content" method="get" action="">
    <fieldset>
      <legend>OER Connector</legend>
      Link: <?php echo $_GET['link']; ?> <br>
      What's the subject?
      <select name="subject">
        <option value="arts">Arts
        <option value="business">Business
        <option value="humanities">Humanities
        <option value="math">Mathematics
        <option value="science">Science and Technology
        <option value="social">Social Sciences
      </select><br>
      How good is the material?
      <div id="slider"></div>
      <label for="grade">Your rating is:<label> <input readonly id="grade" class="text" name="grade" style="border:0" size="2" type="text"><br>
      <input type="checkbox" name="collection" value="collection">Add to my collection<br>
      <button class="submit" onclick="send()"> Submit </button>
    </fieldset>
</form>
