const installBtn = document.getElementById("installBtn");
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installBtn.hidden = true;
});

const foodInfo = {
  bandeja: {
    title: "Bandeja paisa 🍛",
    text: "Aprendiste que la bandeja paisa está asociada principalmente con Antioquia y la región Andina. Es un plato abundante que reúne varios ingredientes como fríjoles, arroz, carne molida, chicharrón, huevo, plátano, arepa y aguacate."
  },
  ajiaco: {
    title: "Ajiaco 🥣",
    text: "Aprendiste que el ajiaco bogotano es una sopa tradicional preparada con pollo y diferentes papas. Las guascas son importantes para su sabor característico."
  },
  arepa: {
    title: "Arepa 🌽",
    text: "Aprendiste que la arepa tiene como base tradicional el maíz y que existen muchas variantes regionales en Colombia."
  },
  sancocho: {
    title: "Sancocho 🍲",
    text: "Aprendiste que el sancocho es una sopa sustanciosa con diferentes versiones regionales. Sus ingredientes pueden incluir carnes, yuca, plátano, papa y mazorca."
  },
  tamal: {
    title: "Tamal 🫔",
    text: "Aprendiste que el tamal se prepara con masa de maíz y diferentes rellenos, y que tradicionalmente se envuelve en hojas. Colombia tiene numerosas variantes."
  },
  lechona: {
    title: "Lechona 🐖",
    text: "Aprendiste que la lechona está especialmente relacionada con Tolima y Huila. Su preparación tradicional incluye cerdo, arroz, arvejas y condimentos."
  }
};

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

document.querySelectorAll(".learn-btn").forEach(button => {
  button.addEventListener("click", () => {
    const data = foodInfo[button.dataset.food];
    modalTitle.textContent = data.title;
    modalText.textContent = data.text;
    modal.hidden = false;
  });
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.hidden = true;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") modal.hidden = true;
});

const correctAnswers = {
  q1: "b",
  q2: "a",
  q3: "a",
  q4: "b",
  q5: "b",
  q6: "a",
  q7: "b"
};

document.getElementById("quizForm").addEventListener("submit", (event) => {
  event.preventDefault();

  let score = 0;
  let answered = 0;

  for (const question in correctAnswers) {
    const selected = document.querySelector(`input[name="${question}"]:checked`);
    if (selected) {
      answered++;
      if (selected.value === correctAnswers[question]) score++;
    }
  }

  const result = document.getElementById("result");
  result.classList.add("show");

  if (answered < 7) {
    result.textContent = `⚠️ Responde todas las preguntas. Has respondido ${answered} de 7.`;
    return;
  }

  const percentage = Math.round((score / 7) * 100);
  let message = "¡Sigue aprendiendo!";
  if (score === 7) message = "🏆 ¡Excelente! Dominas los sabores de Colombia.";
  else if (score >= 5) message = "👏 ¡Muy bien! Tienes un buen conocimiento.";
  else if (score >= 3) message = "👍 Buen comienzo. Repasa las secciones y vuelve a intentarlo.";

  result.textContent = `${message} Resultado: ${score}/7 (${percentage}%).`;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then(() => console.log("Service Worker registrado."))
      .catch(error => console.error("Error registrando Service Worker:", error));
  });
}
