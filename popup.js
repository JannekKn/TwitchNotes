// Get the current tab URL
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var tab = tabs[0];
  var url = tab.url;
  
  

  // Get the notes from storage
  chrome.storage.sync.get(url, function(data) {
    var notes = data[url];
    var notesDiv = document.getElementById("notes");
    // Display the notes in the popup
    if (notes && notes != "") {
      notesDiv.innerHTML = notes;
    } else {
      notesDiv.placeholder = "";
    }
  });
});

// Save the notes to storage when the save button is clicked
var saveButton = document.getElementById("save");
var infoDiv = document.getElementById("info");
saveButton.addEventListener("click", function() {
  // Get the current tab URL
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var tab = tabs[0];
  var url = tab.url;

  // Check if the URL starts with https://www.twitch.tv/
  var prefix = "https://www.twitch.tv/";
  var isTwitch = url.startsWith(prefix);
  
  if(isTwitch) {
      // Get the notes from the popup
      var notesDiv = document.getElementById("notes");
      var notes = notesDiv.innerHTML;

      // Save the notes to storage
      chrome.storage.sync.set({[url]: notes}, function() {
        //Info sucess
        infoDiv.innerHTML = "Note saved!";
        infoDiv.style.color = "green";
      });
  } 
  else {
    //Info fail
    infoDiv.innerHTML = "You are not on twitch! Note is NOT saved";
    infoDiv.style.color = "red";
  }
    
  });
});