// let DivContain = document.querySelector(".ContainerDiv");
// let Btn = document.querySelector(".Btn");
// let dateNaow = document.querySelector(".dateNaow");
// // نجيب التاريخ الحالي
// let today = new Date();

// // نصنع التاريخ بالصورة المطلوبة: day-month-year
// let day = today.getDate();
// let month = today.getMonth() + 1; // لأنه الجافاسكربت بتعد الأشهر من 0
// let year = today.getFullYear();

// // نخليهم بصيغة مثل: 26-09-2025
// let formattedDate = `${day}-${month}-${year}`;
// // dateNaow.innerHTML = `Today Date: ${formattedDate}`;
// // console.log(formattedDate); // جرّب شوف شو يطلع

// function getTimesAdhan(cityInpo) {
//   DivContain.innerHTML = "";
//   axios
//     .get(
//       `https://api.aladhan.com/v1/timingsByAddress/${formattedDate} ?address=${cityInpo}`
//     )
//     .then((res) => {
//       let a = res.data.data.timings;
//       let b = res.data.data.date.readable;
//       console.log(b);
//       dateNaow.innerHTML = b;
//       DivContain.innerHTML += `
//         <div>Sunrise: <span>${a.Sunrise}</span></div>
//         <div>Fajr: <span>${a.Fajr}</span></div>
//         <div>Dhuhr: <span>${a.Dhuhr}</span></div>
//         <div>Asr: <span>${a.Asr}</span></div>
//         <div>Maghrib: <span>${a.Maghrib}</span></div>
//         <div>Isha: <span>${a.Isha}</span></div>
// `;
//     })
//     .catch((error) => console.log(error));
// }

// Btn.onclick = function () {
//   //   let inpoCity = document.querySelector(".cityInput").value;
//   let inpoCity = document.querySelector(".cityInput");
//   let cities = ["Syria", "London"];

//   for (ci of cities) {
//     inpoCity.innerHTML += `<option>${ci}</option>`;
//   }
//   inpoCity.value;

//   getTimesAdhan(inpoCity);
// };

// getTimesAdhan("Damascus");

let DivContain = document.querySelector(".ContainerDiv");
let Btn = document.querySelector(".Btn");
let dateNaow = document.querySelector(".dateNaow");
let inpoCity = document.querySelector(".cityInput");

// نضيف المدن مرة وحدة
let cities = ["Damascus", "London", "Mecca", "Paris"];
for (let ci of cities) {
  inpoCity.innerHTML += `<option value="${ci}">${ci}</option>`;
}

// نجيب التاريخ الحالي
let today = new Date();
let day = today.getDate().toString().padStart(2, "0");
let month = (today.getMonth() + 1).toString().padStart(2, "0");
let year = today.getFullYear();
let formattedDate = `${day}-${month}-${year}`;

function getTimesAdhan(cityInpo) {
  DivContain.innerHTML = "Loading...";
  axios
    .get(
      `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${cityInpo}`
    )
    .then((res) => {
      let a = res.data.data.timings;
      let b = res.data.data.date.readable;

      dateNaow.innerHTML = `<h3>📅 ${b} - ${cityInpo}</h3>`;
      DivContain.innerHTML = `
        <div>🌅 Sunrise: <span>${a.Sunrise}</span></div>
        <div>🕌 Fajr: <span>${a.Fajr}</span></div>
        <div>☀️ Dhuhr: <span>${a.Dhuhr}</span></div>
        <div>🌇 Asr: <span>${a.Asr}</span></div>
        <div>🌆 Maghrib: <span>${a.Maghrib}</span></div>
        <div>🌙 Isha: <span>${a.Isha}</span></div>        
      `;
    })
    .catch((error) => {
      console.log(error);
      DivContain.innerHTML = `<p style="color:red;">حدث خطأ، جرب مدينة تانية</p>`;
    });
}

// زر "Get Times"
Btn.onclick = function () {
  let selectedCity = inpoCity.value;
  if (selectedCity) {
    getTimesAdhan(selectedCity);
  } else {
    alert("اختر مدينة من القائمة أولاً");
  }
};

// عرض مدينة افتراضية أول ما يفتح الموقع
getTimesAdhan("Damascus");
