async function sendData(message) {
    try {
      return await fetch(`https://api.telegram.org/bot8091327488:AAEAX4ZAYxVPf04ECs18yfunXYvdXgXtbJk/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: -1002424483985,
          text: message
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  let fullName = document.querySelector('#fullName');
  let email = document.querySelector('#email');
  let telegramUsername = document.querySelector('#telegramUsername');
  let signature = document.querySelector('#signature');
  let btnsubmit = document.querySelector("button");
  
  btnsubmit.addEventListener("click", function (event) {
    event.preventDefault();
  
    // Перевірка, чи форма заповнена
    if (fullName.value.trim() && email.value.trim() && telegramUsername.value.trim() && signature.checked) {
      let message = `Новий колега:\n\n ПІБ: ${fullName.value} \n Email: ${email.value} \n Telegram Username: ${telegramUsername.value} \n Підпис: ${signature.checked ? "Так" : "Ні"}`;
      
      sendData(message)
        .then(data => data.json())
        .then(data => console.log(data))
        .then(() => {
          // Блокуємо кнопку після відправки
          btnsubmit.disabled = true;
          openPopup();
        });
    }
  });
  
  function checkInputs() {
    var name = fullName.value;
    var emailValue = email.value;
    var username = telegramUsername.value;
    var isSigned = signature.checked;
  
    // Кнопка буде активована лише тоді, коли всі поля заповнені, і підпис поставлений
    btnsubmit.disabled = !(name.trim() && emailValue.trim() && username.trim() && isSigned);
  }
  
  // Перевіряємо стан полів при введенні
  fullName.addEventListener('input', checkInputs);
  email.addEventListener('input', checkInputs);
  telegramUsername.addEventListener('input', checkInputs);
  signature.addEventListener('change', checkInputs);
  
  function openPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
    setTimeout(function() {
      popup.classList.add("open");
    }, 100);
  }
  
  function closePopup() {
    var popup = document.getElementById("popup");
    popup.classList.remove("open");
    setTimeout(function() {
      popup.style.display = "none";
    }, 500);
  }
  