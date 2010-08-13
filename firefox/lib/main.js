const widgets = require("widget");
var tabs = require("tabs");

// create a basic widget for our button
widgets.add(widgets.Widget({
  label: "Connecting the World to the Commons.",
  image: "http://a1.twimg.com/profile_images/151129745/avatar_normal.jpg",
  onClick: function() { tabs.open("http://doc.iskme.org/oer-connector/backend/index.php?link=" + tabs.activeTab.location) }
}));
