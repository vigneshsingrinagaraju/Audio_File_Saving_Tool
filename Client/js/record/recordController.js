recordApp.controller('recordController', ['$scope', '$timeout', '$http', '$window', '$rootScope','$routeParams', 'apiUrl', function($scope,$timeout, $http, $window, $rootScope, $routeParams, apiUrl) {
$scope.initialize = function() {
  if (navigator.getUserMedia) {
    $scope.showimage=false;
  stopRecord.disabled = true;
  submitRecord.disabled = true;
  cancelRecord.disabled = true;
 navigator.getUserMedia({ audio: true},
  function(stream) {
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
      audio.push(e.data);
      if (rec.state == "inactive") {
        let blob = new Blob(audio, {
          type: 'audio/x-mpeg-3'
        });
        $scope.blobdata=blob
        recordedAudio.src = URL.createObjectURL(blob);
        recordedAudio.controls = true;
      }
    }
  },
  function(err) {
   console.log("The following error occurred: " + err.name);
 }
 );
} else {
 console.log("getUserMedia not supported");
}
  $scope.timeLimit = 10;
  // var randomNumber = Math.floor(Math.random() * 16)
  $http({
    url: "/pages/mockdata/text.json",
    method: "GET",
    headers: {'Content-Type':'application/json','Accept':'application/json'}
  }).then(function(response) {
    $scope.datalist=response.data.data;
    var randomNumber = Math.floor(Math.random() * $scope.datalist.length)
      $scope.text= $scope.datalist[randomNumber].text;
        $scope.index=$scope.datalist[randomNumber].index;
        $scope.topic=$scope.datalist[randomNumber].topic;
  }, 
  function(error){
      alertify.error("error,refresh the page and try again");
  });
}

navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia;
if (navigator.getUserMedia) {
  stopRecord.disabled = true;
  submitRecord.disabled = true;
  cancelRecord.disabled = true;
 navigator.getUserMedia({ audio: true},
  function(stream) {
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
      audio.push(e.data);
      if (rec.state == "inactive") {
        let blob = new Blob(audio, {
          type: 'audio/x-mpeg-3'
        });
        $scope.blobdata=blob
        recordedAudio.src = URL.createObjectURL(blob);
        recordedAudio.controls = true;
      }
    }
  },
  function(err) {
   console.log("The following error occurred: " + err.name);
 }
 );
} else {
 console.log("getUserMedia not supported");
}

// TODO: This needs work. Submit button currently does not do anything.
// Also, page does not get reloaded and therefore the results are not shown.
// The POST request has to be done without AJAX.

$scope.startRecording=function () {
   $scope.showimage=true;
  startRecord.disabled = true;
  stopRecord.disabled = false;
  cancelRecord.disabled = false;
  audio = [];
  recordedAudio.controls = false;
  rec.start();
}

$scope.stopRecording=function () {
    $scope.showimage=false;
  startRecord.disabled = false;
  stopRecord.disabled = true;
  submitRecord.disabled = false;
  cancelRecord.disabled = false;
  rec.stop();
}
$scope.submit=function() {
  var reader = new window.FileReader();
  reader.readAsDataURL($scope.blobdata);
  reader.onloadend = function() {
    base64data = reader.result;
    $.ajax({
      type: 'POST',
      url: apiUrl + "/store_file",
      data: JSON.stringify({'language':base64data,'topic':$scope.topic,'index':$scope.index}),
      cache: false,
      crossDomain: true,
      processData: false,
     contentType: "application/json",
        dataType: 'json',
    }).done(function(data) {
      alertify.success("audio saved successfully..");
       stopRecord.disabled = true;
  submitRecord.disabled = true;
  cancelRecord.disabled = true;
  recordedAudio.controls = false;
  $scope.initialize();
    });
  }
}
$scope.cancelaudio=function(){
    $scope.showimage=false;
  recordedAudio.controls = false;
   startRecord.disabled = false;
  stopRecord.disabled = true;
  submitRecord.disabled = true;
  cancelRecord.disabled = true;
}
$scope.initialize();
}]);

