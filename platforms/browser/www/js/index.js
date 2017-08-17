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


//First step check parameters mismatch and checking network connection if available call    download function

function DownloadFile(URL, Folder_Name, File_Name) {
//Parameters mismatch check
if (URL == null && Folder_Name == null && File_Name == null) {
    return;
}
else {
    //checking Internet connection availablity
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
        return;
    } else {
        download(URL, Folder_Name, File_Name); //If available download function call
    }
  }
}


function download(URL, Folder_Name, File_Name) {
//step to request a file system 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

function fileSystemSuccess(fileSystem) {
    var download_link = encodeURI(URL);
    ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

    var directoryEntry = fileSystem.root; // to get root path of directory
    directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
    var rootdir = fileSystem.root;
    var fp = rootdir.toURL(); // Returns Fulpath of local directory

    fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
    // download function call
    filetransfer(download_link, fp);
}

function onDirectorySuccess(parent) {
    // Directory created successfuly
}

function onDirectoryFail(error) {
    //Error while creating directory
    alert("Unable to create new directory: " + error.code);
}

  function fileSystemFail(evt) {
    //Unable to access file system
    alert(evt.target.error.code);
 }
}

function filetransfer(download_link, fp) {
var fileTransfer = new FileTransfer();
// File download function with URL and local path
fileTransfer.download(download_link, fp,
                    function (entry) {
                        alert("download complete: " + entry.fullPath);
                    },
                 function (error) {
                     //Download abort errors or download failed errors
                     alert("download error source " + error.source);
                     //alert("download error target " + error.target);
                     //alert("upload error code" + error.code);
                 }
            );
}

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
}

function a() {

var fileTransfer = new FileTransfer();
var uri = encodeURI("http://pujcovaninaradi.cz/download/cenik.pdf");
var fileURL = '/storage/emulated/0/Download/file.pdf';

fileTransfer.download(
    uri,
    fileURL,
    function(entry) {
        alert("download complete: " + entry.toURL());
    },
    function(error) {
        alert("download error source " + error.source);
        alert("download error target " + error.target);
        alert("download error code" + error.code);
    },
    null,
    {
        
        
    }
);
}