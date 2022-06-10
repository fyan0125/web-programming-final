const serverUrl =
  "https://script.google.com/macros/s/AKfycbyi3KijHcRiUoiDlRhucTIKTUrm_oM8N8AsO_BMNePRVHwZxP4dtJg173uLlT4gNGLQlQ/exec";
let mealData = [];

$(document).ready(function () {
  getData();
  initBtn();
  inputListen();
});

function initBtn() {
  $(".confirm-button").click(function (event) {
    $(".mealList").html("");
    $(".message").show();
    inputListen();
  });
}

function inputListen() {
  for (let i = 0; i < mealData.length; i++) {
    let firstSplit = mealData[i].date.split("-");
    let secondSplit = firstSplit[2].split("T");
    let date = `${firstSplit[0]}-${firstSplit[1]}-${secondSplit[0]}`;
    if (date == $("[name=datePicker]").val()) {
      let content = template(mealData[i]);
      $(".mealList").append(content);
      $(".message").hide();
    }
  }
}

function getData() {
  let parameter = {
    method: "read",
  };
  $.post(serverUrl, parameter, function (data) {
    if (data.result == "sus") {
      mealData = data.data;
      console.log(mealData);
    }
  }).fail(function (e) {
    console.log(e);
  });
}

function template(mealData) {
  let template = `<div
    class="meal mb-3 d-flex flex-column justify-content-center align-items-center"
  >
    <div class="d-flex align-items-center">
      <i class="fa fa-cutlery" aria-hidden="true"></i>
      <p class="ml-1">${mealData.type}</p>
    </div>
    <div class="food d-flex">
      <p>${mealData.staple}</p>
      <p class="ml-1">${mealData.stapleCa} kal</p>
    </div>
    <div class="food d-flex">
      <p>${mealData.side}</p>
      <p class="ml-1">${mealData.sideCa} kal</p>
    </div>
  </div>`;
  return template;
}
