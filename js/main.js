const severURL =
  "https://script.google.com/macros/s/AKfycbwGHyvqIJhjonI8SyynfRQVS6OmIWno-qkseHkfTXr-Pl1BG0IL6yIuKpwdtxi26UfvPQ/exec";
let type = "";
let staple = "";
let side = "";

$(document).ready(function () {
  initBtn();
  inputListen();
  $(".a1").hide();
  $(".q2").hide();
  $(".a2").hide();
  $(".q3").hide();
  $(".a3").hide();
});

function initBtn() {
  $(".upload-button").click(function (event) {
    sendToServer();
  });
}

function inputListen() {
  const selectElement = document.querySelector(".form-control");
  selectElement.addEventListener("change", (event) => {
    if (type == "") {
      $(".a1").show();
      $(".q2").show();
      const result = document.querySelector(".a1");
      type = event.target.value;
      result.textContent = type;
      $(".form-control").val("");
    } else if (staple == "" && type != "") {
      $(".a2").show();
      $(".q3").show();
      const result = document.querySelector(".a2");
      staple = event.target.value;
      result.textContent = staple;
      $(".form-control").val("");
    } else if (side == "" && staple != "") {
      $(".a3").show();
      $(".q4").show();
      const result = document.querySelector(".a3");
      side = event.target.value;
      result.textContent = side;
      $(".form-control").val("");
    }
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
