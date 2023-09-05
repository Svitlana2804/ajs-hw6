// Поясніть своїми словами, як ви розумієте поняття асинхронності у Javascript.
//     Асинхронність - це можливість виконання певного завдання коду не в тому порядку розташування як написано.Прикладом може бути функція сеттаймаут, вона виконується так як вказано за умовою і не важливо де вона буде розташована в коді, чи з самого початку, чи в середині тд.
// Завдання
// Написати програму "Я тебе знайду по IP"


const url = "http://api.ipify.org/?format=json";
const btn = document.querySelector(".btn");
btn.addEventListener("click", async function () {
  try {
    const ipResponse = await fetch(url);
    if (!ipResponse.ok) {
      throw new Error(`Помилка отримання IP-адреси: ${ipResponse.status}`);
    }
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;
    document.getElementById("your__ip").textContent = ipAddress;
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
      "Запит не виконано";
    document.getElementById("location").textContent =
      "Запит не виконано";
  }
});
