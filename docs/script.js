const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const form = document.querySelector("#cake-form");
const formStatus = document.querySelector("#form-status");
const dateInput = form.querySelector('input[type="date"]');

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.min = tomorrow.toISOString().split("T")[0];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const requiredFields = [...form.querySelectorAll("[required]")];
  let firstInvalid = null;

  requiredFields.forEach((field) => {
    const invalid = !field.checkValidity();
    field.classList.toggle("invalid", invalid);
    if (invalid && !firstInvalid) firstInvalid = field;
  });

  if (firstInvalid) {
    formStatus.textContent = "Please complete the required fields so we can respond thoughtfully.";
    firstInvalid.focus();
    return;
  }

  const customerName = form.elements.name.value.trim().split(" ")[0];
  formStatus.textContent = `Thank you, ${customerName}. Your consultation request is ready to send.`;
  form.reset();
});

form.addEventListener("input", (event) => {
  if (event.target.matches("[required]")) {
    event.target.classList.remove("invalid");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
