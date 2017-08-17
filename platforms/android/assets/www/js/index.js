/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



// ----------------------------------------------------------------------------

function download2(fileEntry, uri, readBinaryData) {

    var fileTransfer = new FileTransfer();
    var fileURL = fileEntry.toURL();

    fileTransfer.download(
        uri,
        fileURL,
        function (entry) {
            console.log("Successful download...");
            console.log("download complete: " + entry.toURL());
            if (readBinaryData) {
              // Read the file...
              readBinaryFile(entry);
            }
            else {
              // Or just display it.
              displayImageByFileURL(entry);
            }
        },
        function (error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
        },
        null, // or, pass false
        {
            //headers: {
            //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            //}
        }
    );
};


function otevri(file) {
      cordova.plugins.fileOpener2.open(
        file,
        'application/pdf', // make sure this is the same mimetype as your file
        {
          error : function(e) {
            alert('Error status: ' + e.status + ' - Error message: ' + e.message);
          },
          success : function () {
            console.log('file opened successfully');
          }
        }
      );
    };
    
    
function otevri2(soubor) {
cordova.plugin.pDialog.init({
    theme : 'HOLO_DARK',
    progressStyle : 'SPINNER',
    cancelable : true,
    title : 'Prosím čekejte',
    message : 'Stahuji soubor ...' + soubor
});

var fileTransfer = new FileTransfer();

var uri = encodeURI("http://pujcovaninaradi.cz/download/" + soubor);
var fileURL = cordova.file.externalRootDirectory + 'Download/files.pdf';

statusDom = document.querySelector('#status');

	fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			statusDom.innerHTML = perc + "% loaded..." + progressEvent.total;       
		} else {
			if(statusDom.innerHTML == "") {
				statusDom.innerHTML = "Loading";
			} else {
				statusDom.innerHTML += ".";
			}
		}
	};

 
fileTransfer.download(
    uri,
    fileURL,
    function(entry) {
      cordova.plugin.pDialog.dismiss();
      var file = entry.toURL();
      cordova.plugins.fileOpener2.open(
        file,
        'application/pdf',
        {
          error : function(e) {
            alert('Error status: ' + e.status + ' - Error message: ' + e.message);
          },
          success : function () {
            console.log('file opened successfully');
          }
        }
    );
  }
);
};    


