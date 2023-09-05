// Поясніть своїми словами, як ви розумієте поняття асинхронності у Javascript.
//     Асинхронність - це можливість виконання певного завдання коду не в тому порядку розташування як написано.Прикладом може бути функція сеттаймаут, вона виконується так як вказано за умовою і не важливо де вона буде розташована в коді, чи з самого початку, чи в середині тд.
// Завдання
// Написати програму "Я тебе знайду по IP"

// Технічні вимоги:
// Створити просту HTML-сторінку з кнопкою Знайти по IP.
// Натиснувши кнопку - надіслати AJAX запит за адресою https://api.ipify.org/?format=json, отримати звідти IP адресу клієнта.
// Дізнавшись IP адресу, надіслати запит на сервіс https://ip-api.com/ та отримати інформацію про фізичну адресу.
// під кнопкою вивести на сторінку інформацію, отриману з останнього запиту – континент, країна, регіон, місто, район.
// Усі запити на сервер необхідно виконати за допомогою async await.
const url = "http://api.ipify.org/?format=json";
const btn = document.querySelector(".btn");
// const url2 = "https://ip-api.com/";

// // btn.addEventListener("click", function () {
// //   axios
// //     .get(url)
// //     .then(({ data }) => console.log(data))
// //     .catch((error) => console.log(error));

// // });

// btn.addEventListener("click", function () {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url, true);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       const resultIp = JSON.parse(xhr.responseText);
//       const ipAddress = resultIp.ip;
//       document.getElementById("your__ip").textContent = ipAddress;

//       const xhrLocation = new XMLHttpRequest();
//       xhrLocation.open("GET", "https://ip-api.com/" + ipAddress, true);
//       xhrLocation.onreadystatechange = function () {
//         if (xhrLocation.readyState === 4 && xhrLocation.status === 200) {
//           const resultLocation = JSON.parse(xhrLocation.responseText);

//           const infoPlace = `
//     <p>Континент : ${resultLocation.continent}</p>
//     <p>Країна : ${resultLocation.country}</p>
//     <p>Регіон : ${resultLocation.regionName}</p>
//     <p>Місто : ${resultLocation.city}</p>
//     <p>Район : ${resultLocation.district}</p>
//     `;

//           document.getElementById("location").innerHTML = infoPlace;
//         } else if (xhrLocation.readyState === 4) {
//           document.getElementById("location").textContent =
//             "Інформація не завантажена";
//         }
//       };
//       xhrLocation.send();
//     } else if (xhr.readyState === 4) {
//       document.getElementById("your__ip").textContent =
//         "Не вдалося отримати IP-адресу";
//     }
//   };
//   xhr.send();
// });

btn.addEventListener("click", async function () {
  try {
    // Отримати IP адресу за допомогою fetch та async/await
    const ipResponse = await fetch(url);
    if (!ipResponse.ok) {
      throw new Error(`Помилка отримання IP-адреси: ${ipResponse.status}`);
    }
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;
    document.getElementById("your__ip").textContent = ipAddress;

    // Отримати інформацію про місце розташування за IP адресою
    const locationResponse = await fetch("http://ip-api.com/json/" + ipAddress);
    if (!locationResponse.ok) {
      throw new Error(
        `Помилка отримання інформації про місце розташування: ${locationResponse.status}`
      );
    }
    const locationData = await locationResponse.json();

    const infoPlace = `
                    <p>Континент : ${locationData.continent}</p>
                    <p>Країна : ${locationData.country}</p>
                    <p>Регіон : ${locationData.regionName}</p>
                    <p>Місто : ${locationData.city}</p>
                    <p>Район : ${locationData.district}</p>
                `;

    document.getElementById("location").innerHTML = infoPlace;
  } catch (error) {
    console.error(error);
    document.getElementById("your__ip").textContent =
      "Помилка виконання запиту";
    document.getElementById("location").textContent =
      "Помилка виконання запиту";
  }
});
