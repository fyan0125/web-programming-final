const severURL =
  "https://script.google.com/macros/s/AKfycbwGHyvqIJhjonI8SyynfRQVS6OmIWno-qkseHkfTXr-Pl1BG0IL6yIuKpwdtxi26UfvPQ/exec";
let type = "";
let staple = "";
let side = "";
var yStatus = 0;

$(document).ready(function () {
  initBtn();
  inputListen();
});

function initBtn() {
  // $(".upload-button").click(function (event) {
  //   sendToServer();
  // });
  $(".start-button").click(function (event) {
    gsap.to(".front-page", { y: -400, duration: 0.3 });
    gsap.to(".input-box", { y: -200, duration: 0.3 });
    yStatus = -180;
    gsap.to(".dialogue", { y: yStatus, duration: 0.3 });
  });
}

function inputListen() {
  const selectElement = document.querySelector(".form-control");
  selectElement.addEventListener("change", (event) => {
    if (type == "") {
      const result = document.querySelector(".a1");
      type = event.target.value;
      result.textContent = type;
      $(".form-control").val("");
      yStatus -= 99;
    } else if (staple == "" && type != "") {
      const result = document.querySelector(".a2");
      staple = event.target.value;
      result.textContent = staple;
      $(".form-control").val("");
      yStatus -= 99;
    } else if (side == "" && staple != "") {
      const result = document.querySelector(".a3");
      side = event.target.value;
      result.textContent = side;
      $(".form-control").val("");
      yStatus -= 38;
    }
    gsap.to(".dialogue", { y: yStatus, duration: 0.3 });
  });
}

function sendToServer() {
  let parameter = {
    method: "write",
    type: type,
    staple: staple,
  };
  $.post(severURL, parameter, function (data) {
    console.log(data);
    if (data.result == "sus") {
    } else {
    }
  }).fail(function (data) {
    alert("送出失敗");
  });
}
