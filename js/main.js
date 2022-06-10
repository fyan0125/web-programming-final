const severURL =
  "https://script.google.com/macros/s/AKfycbyi3KijHcRiUoiDlRhucTIKTUrm_oM8N8AsO_BMNePRVHwZxP4dtJg173uLlT4gNGLQlQ/exec";
let dialogueNum = 1;
let yStatus = 0;
let type = "";
let staple = "";
let stapleCa = "";
let side = "";
let sideCa = "";

$(document).ready(function () {
  initBtn();
  inputListen();
});

function initBtn() {
  $(".upload-button").click(function (event) {
    sendToServer();
  });
  $(".refresh-button").click(function (event) {
    window.location.reload();
  });
  $(".start-button").click(function (event) {
    gsap
      .to(".front-page", { y: -550, duration: 0.3 })
      .then($(".dialogue-container").removeClass("z--1"));
    gsap.to(".input-box", { y: -200, duration: 0.3 });
    yStatus = -120;
    gsap.to(".dialogue", { y: yStatus, duration: 0.3 });
  });
}

function inputListen() {
  const selectElement = document.querySelector(".form-control");
  selectElement.addEventListener("change", (event) => {
    if (event.target.value != "") {
      switch (dialogueNum) {
        case 1:
          type = event.target.value;
          document.querySelector(".a1").textContent = type;
          break;
        case 2:
          staple = event.target.value;
          document.querySelector(".a2").textContent = staple;
          document.querySelector(
            ".q3"
          ).textContent = `${staple}的卡路里是多少呢？`;
          break;
        case 3:
          stapleCa = event.target.value;
          document.querySelector(".a3").textContent = stapleCa;
          break;
        case 4:
          side = event.target.value;
          document.querySelector(".a4").textContent = side;
          document.querySelector(
            ".q5"
          ).textContent = `${side}的卡路里是多少呢？`;
          break;
        case 5:
          sideCa = event.target.value;
          document.querySelector(".a5").textContent = sideCa;
          document.querySelector(".q6").textContent = `關於這次的紀錄：
          你吃了${staple}
          卡路里是${stapleCa}kcal
          還吃了${side}
          卡路里是${sideCa}kcal
          確認無誤請點擊上傳
          有誤請點擊重新回答`;
          gsap.to(".input-box", { y: 0, duration: 0.3 });
          break;
      }
      yStatus -= 100;
      dialogueNum++;
      $(".form-control").val("");
    }
    gsap.to(".dialogue", { y: yStatus, duration: 0.3 });
  });
}

function sendToServer() {
  let parameter = {
    method: "write",
    type: type,
    staple: staple,
    stapleCa: stapleCa,
    side: side,
    sideCa: sideCa,
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
