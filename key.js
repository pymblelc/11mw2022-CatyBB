//declaring variables like buttons and stuff to make it easier later.
let takePhotoBtn = document.getElementById("takePhoto");
let myWebcam = document.getElementById("webcam");
let myCanvas = document.getElementById("canvas");
let ctx = myCanvas.getContext("2d");
let checkBtnOne = document.getElementById("checkBtn1");
let unlockBtn = document.getElementById("unlockBtn");
let lockBtn = document.getElementById("lockBtn");
let Locked = document.getElementById("Lockfunction:Locked");
let Unlocked = document.getElementById("Lockfunction:Unlocked");
let kaede = document.getElementById("kaede");
let HowdoIunlockthis = document.getElementById("HowdoIunlockthis");
let HowdoI = document.getElementById("howdoI");
let ABOUTOURLOCKS = document.getElementById("ABOUTOURLOCKS");
let homeBtn  = document.getElementById("homeBtn");
let webcam = new Webcam(myWebcam, "user", myCanvas);
let aboutOur = document.getElementById("aboutOur")
var firstfaceanalysis;
var secondfaceanalysis;


//creating functions for starting and stopping the webcam
function webcamStart() {
  webcam
    .start()
    .then((result) => {
      console.log("webcam started!");
    })
    .catch((error) => {
      console.log("error");
    });
}

// getting the webcam to take photo
takePhotoBtn.addEventListener("click", function () {
  var picture = webcam.snap();
});

checkBtnOne.addEventListener("click", function () {
  myCanvas.toBlob(function (blob) {
    ImageAPI.analyseFacesBlob(blob, (data) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].faceAttributes);
      }
    });
  });
});

//<-------------------------------------------------------------------------------------------------------------------->
//if no. of people in photo = 1, then the locking mechanism will engage.

checkBtnOne.addEventListener("click", function () {
  myCanvas.toBlob(function (blob) {
    ImageAPI.analyseFacesBlob(blob, (data) => {
      const peopleNo = data.length;
      console.log("PeopleNo");
      if (peopleNo > 1) {
        alert("Too many faces recognised. This is a single person lock only.");
      }
      if (peopleNo < 1) {
        alert("No faces recognised");
      } else {
        //using face analysis to lock the lock
        checkBtnOne.addEventListener("click", function () {
          myCanvas.toBlob(function (blob) {
            ImageAPI.analyseFacesBlob(blob, (data) => {
              for (let i = 0; i < data.length; i++) {
                let haircolor = data[i].faceAttributes.hair.hairColor[0].color;
                let glasses = data[i].faceAttributes.glasses;
                let lipstick = data[i].faceAttributes.makeup.lipMakeup;
                if (firstfaceanalysis == null) {
                  firstfaceanalysis = data;
                  console.log("firstfaceanalysis");
                } else {
                  secondfaceanalysis = data;
                  console.log("secondfaceanalysis");
                }
              }
            });
          });
        });
        if (firstfaceanalysis == secondfaceanalysis) {
          console.log("Lock is unlocked");
          unlockBtn.addEventListener("click", function () {
            alert("Lock is unlocked");
            unlockBtn.style.display = "none";
            aboutOur.style.display = "block";
            kaede.style.display = "none";
            HowdoIunlockthis.style.display = "none";
            Locked.style.display = "none";
            Unlocked.style.display = "block";
            lockBtn.style.display = "inline";
            HowdoI.style.display = "none";
            ABOUTOURLOCKS.style.display ="block";
            homeBtn.addEventListener("click", function () {
              window.location.href = "index.html";
            });
          });
        } else {
          console.log("The lock is still engaged.");
          unlockBtn.addEventListener("click", function () {
            alert("The lock is engaged. Please unlock the lock to continue.");
            });
            homeBtn.addEventListener("click", function () {
              alert ("Please unlock the lock first")
            }); 
        }
      }
    });
  });
});
