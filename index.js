const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const revealElements = document.querySelectorAll(".reveal");
const submitBtn = contactForm.querySelector('button[type="submit"]');

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "Light Mode";
    themeToggle.classList.remove("btn-outline-light");
    themeToggle.classList.add("btn-outline-warning");
  } else {
    themeToggle.textContent = "Dark Mode";
    themeToggle.classList.remove("btn-outline-warning");
    themeToggle.classList.add("btn-outline-light");
  }
});

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  formMessage.textContent = "Sending...";
  formMessage.className = "mt-3 mb-0 fw-semibold text-warning";
  submitBtn.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      formMessage.textContent = "Message sent successfully.";
      formMessage.className = "mt-3 mb-0 fw-semibold text-success";
      contactForm.reset();
    } else {
      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        formMessage.textContent = data.errors
          .map((error) => error.message)
          .join(", ");
      } else {
        formMessage.textContent = "Something went wrong. Please try again.";
      }

      formMessage.className = "mt-3 mb-0 fw-semibold text-danger";
    }
  } catch (error) {
    formMessage.textContent = "Network error. Please try again.";
    formMessage.className = "mt-3 mb-0 fw-semibold text-danger";
  } finally {
    submitBtn.disabled = false;
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));