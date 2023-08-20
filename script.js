function generateRandomValues(count) {
  const values = [];
  let total = 0;

  for (let i = 0; i < count; i++) {
      const value = Math.random() * 100;
      values.push(value);
      total += value;
  }
  return values.map(value => (value / total) * 100);
}

function drawChart(values, radii, colors) {
  const chart = document.getElementById('chart');
  const centerX = chart.getAttribute('width') / 2;
  const centerY = chart.getAttribute('height') / 2;

  let startAngle = 0;
  let endAngle = 0;

  for (let i = 0; i < values.length; i++) {
      endAngle += (values[i] / 100) * (Math.PI * 2); // Преобразуем проценты в радианы
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const radius = radii[i];
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      // Создаем сектор
      const d = `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${values[i] > 50 ? 1 : 0},1 ${x2},${y2} Z`;
      path.setAttribute('d', d);
      path.setAttribute('fill', colors[i]);
      chart.appendChild(path);

      startAngle = endAngle;
  }
}

// Создаем чёрный круг
function drawBlackCircle() {
  const chart = document.getElementById('chart');
  const centerX = chart.getAttribute('width') / 2;
  const centerY = chart.getAttribute('height') / 2;
  const blackCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  blackCircle.setAttribute('cx', centerX);
  blackCircle.setAttribute('cy', centerY);
  blackCircle.setAttribute('r', 33);
  blackCircle.setAttribute('fill', '#1E1E1E');
  chart.appendChild(blackCircle);
}

// Генерация случайных значений и отрисовка диаграммы при загрузке
const randomValues = generateRandomValues(8); // Задайте количество секторов
const radii = [200, 152, 100, 189, 152, 166, 87, 128];
const colors = ["#F2994A", "#EB5757", "#6FCF97", "#F2C94C", "#9B51E0", "#2F80ED", "#56CCF2", "#219653"];
drawChart(randomValues, radii, colors);
drawBlackCircle();

// Обработчик события для клика на диаграмму
document.getElementById('chart').addEventListener('click', function () {
  // Генерируем новые случайные значения
  const randomValues = generateRandomValues(8); // Задайте количество секторов

  // Очищаем текущую диаграмму
  const chart = document.getElementById('chart');
  while (chart.firstChild) {
      chart.removeChild(chart.firstChild);
  }

  // Рисуем новую диаграмму с новыми значениями
  drawChart(randomValues, radii, colors);
  drawBlackCircle(); // Опционально, если вы хотите также отрисовать чёрный круг
});