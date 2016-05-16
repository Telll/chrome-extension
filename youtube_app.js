/**
 * youtube_app.js
 * by Monsenhor filipo@kobkob.org
 * copyright GPL Affero 3.0
 * implements the Chrome plugin for telll at youtube
 */

console.log ("begin telll "+VERSION);

loadTelllModule();
var videoId = readVideoId();
var taggedVideos = getTagged();
var userId;

for (var i=0; i < taggedVideos.length; i++){
	if (videoId == taggedVideos[i]){
	    console.log("Found! ", videoId);
	    telllDialog("Telll: Loading "+videoId+" ...",3000);
	    // login
	    // sync player
	    // load photolinksList
	    // load tagPlayer
	}
}
/**
 * readVideoId
 * @return {string} the video id
 */ 
function readVideoId(){
	var id = "TEgQM6ZhkWg";
	return id;
}

/**
 * getTagged
 * @return {array} the tagged videos ids
 */ 
function getTagged(){
	var videoIds = ["TEgQM6ZhkWg","TEgQM6Zhkii"];
	return videoIds;
}

//////////////////////////////////////////////////////
// native cliente stuff
var telllModule = null;  // Global application object.
function loadTelllModule(){
   //var path = chrome.runtime.getPlatformInfo().nacl_arch;
   var path = "https://localhost"; 
    console.log(chrome);
    var $listener = $("<div id='listener'></div>").appendTo("body");
    var $module = $('<embed id="telll_module" width=0 height=0 src="'+path+'/telll.nmf" type="application/x-pnacl" />').appendTo($listener);
    //$listener.on('load', function() { moduleDidLoad(); });
    //$listener.on('message', function(){ handleMessage(); });

    var listener = document.getElementById('listener');
    listener.addEventListener('load', moduleDidLoad, true);
    listener.addEventListener('message', handleMessage, true);

    if (telllModule == null) {
      telllDialog('Loading telll module ...', 2000);
    } else {
      // It's possible that the Native Client module onload event fired
      // before the page's onload event.  In this case, the status message
      // will reflect 'SUCCESS', but won't be displayed.  This call will
      // display the current message.
      telllDialog('telll module loaded ...', 2000);

    }
}

// Indicate load success.
function moduleDidLoad() {
  telllModule = document.getElementById('telll_module');
  telllDialog('telll loaded!           --', 3000);
}

// The 'message' event handler.  This handler is fired when the NaCl module
// posts a message to the browser by calling PPB_Messaging.PostMessage()
// (in C) or pp::Instance.PostMessage() (in C++).  This implementation
// simply displays the content of the message in an alert panel.
function handleMessage(message_event) {
  alert(message_event.data);
}
