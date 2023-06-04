// Get elements by query
const name_input = document.querySelector("#name-input");
const email_input = document.querySelector("#email-input");
const form = document.getElementById("form-signup");

// Fetch

function submitInfo() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const userInfo = {};

    for (let [name, value] of formData.entries()) {
      userInfo[name] = value;
    }

    fetch("localhost:3001/newsletter_signup", {
      method: "POST",
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((info) => {
        // displayMessage();
        console.log(info);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

// function displayMessage(info) {
//   let user = info.name;
//   let email = info.email;
//   console.log(user + " has successfully subscribed! using " + email);
// }

submitInfo();
