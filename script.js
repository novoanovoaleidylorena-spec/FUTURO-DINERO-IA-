window.onload = () => {
  income.value = localStorage.getItem("income") || "";
  expenses.value = localStorage.getItem("expenses") || "";
};

// IA + simulación completa
function calculate() {

  let incomeVal = +income.value;
  let expensesVal = +expenses.value;
  let goalVal = +goal.value;
  let inflationVal = +inflation.value / 100;
  let rateAnnual = +investment.value;

  let savings = incomeVal - expensesVal;

  if (savings <= 0) {
    months.innerText = "No puedes ahorrar.";
    return;
  }

  // guardar datos (app real)
  localStorage.setItem("income", incomeVal);
  localStorage.setItem("expenses", expensesVal);

  // ajuste inflación
  let adjustedGoal = goalVal * (1 + inflationVal);

  // interés compuesto
  let rate = rateAnnual / 12;
  let total = 0;
  let monthsCount = 0;
  let history = [];

  while (total < adjustedGoal) {
    total = total * (1 + rate) + savings;
    monthsCount++;
    history.push(total);
  }

  months.innerText = `Meta en ${monthsCount} meses`;

  // IA INTELIGENTE (mejorada)
  let percentSaved = savings / incomeVal;

  let advice = "";

  if (percentSaved < 0.1) {
    advice = "⚠️ Estás ahorrando menos del 10%. Riesgo financiero.";
  } else if (percentSaved < 0.2) {
    advice = "💡 Buen inicio, intenta llegar al 20% de ahorro.";
  } else if (percentSaved < 0.4) {
    advice = "🚀 Excelente disciplina financiera.";
  } else {
    advice = "🔥 Nivel alto: podrías invertir agresivamente.";
  }

  aiAdvice.innerText = advice;

  // barra progreso
  progress.style.width = Math.min((savings / goalVal) * 100, 100) + "%";

  // contador animado
  animateCounter(total);

  // gráfico
  new Chart(chart, {
    type: 'line',
    data: {
      labels: history.map((_, i) => i + 1),
      datasets: [{
        label: 'Crecimiento',
        data: history
      }]
    }
  });

  // imágenes
  let images = {
    viaje: "https://cdn-icons-png.flaticon.com/512/201/201623.png",
    casa: "https://cdn-icons-png.flaticon.com/512/69/69524.png",
    carro: "https://cdn-icons-png.flaticon.com/512/743/743922.png",
    negocio: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  };

  dreamImage.src = images[dream.value] || images.viaje;
}

// animación dinero creciendo
function animateCounter(finalValue) {
  let start = 0;
  let duration = 1000;
  let step = finalValue / (duration / 10);

  let interval = setInterval(() => {
    start += step;
    if (start >= finalValue) {
      start = finalValue;
      clearInterval(interval);
    }
    counter.innerText = "$" + Math.floor(start).toLocaleString("es-CO");
  }, 10);
}

// PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("FUTURO DEL DINERO CON IA", 10, 10);
  doc.text(months.innerText, 10, 20);
  doc.text(aiAdvice.innerText, 10, 30);

  doc.save("plan_financiero.pdf");
}
