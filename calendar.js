// // Días ocupados, puedes cargar desde JSON externo si lo prefieres
// const diasOcupados = [
  
// ];

// const calendarContainer = document.getElementById("calendar-container");

// // Formatear a YYYY-MM-DD
// function formatDate(date) {
//   return date.toISOString().slice(0, 10);
// }

// // Meses en español
// const monthNames = [
//   "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
//   "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
// ];

// // Variables para navegación y selección
// const today = new Date();
// let displayYear = today.getFullYear();
// let displayMonth = today.getMonth();
// let startDate = null;
// let endDate = null;

// // Dibuja el calendario con solo selectores de mes y año
// function drawCalendar(year, month, unavailableDates, selectedStart, selectedEnd) {
//   calendarContainer.innerHTML = "";

//   // Solo permitir meses/años desde el actual
//   if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth())) {
//     calendarContainer.innerHTML = "<div class='calendar-header'>Solo puedes seleccionar desde el mes actual en adelante.</div>";
//     return;
//   }

//   const firstDay = new Date(year, month, 1);
//   const lastDay = new Date(year, month + 1, 0);

//   // Solo selectores, sin botones de << < > >>
//   const header = document.createElement("div");
//   header.className = "calendar-header";
//   header.innerHTML = `
//     <span>
//       <select id="monthSelect">${monthNames.map((m,i)=>`<option value="${i}"${i===month?" selected":""}${year===today.getFullYear()&&i<today.getMonth()?' disabled':''}>${m}</option>`).join("")}</select>
//       <select id="yearSelect">${[...Array(6)].map((_,i)=>`<option value="${today.getFullYear()+i}"${today.getFullYear()+i===year?" selected":""}>${today.getFullYear()+i}</option>`).join("")}</select>
//     </span>
//   `;
//   calendarContainer.appendChild(header);

//   // Tabla de días
//   const table = document.createElement("table");
//   table.className = "calendar-table";
//   const thead = document.createElement("thead");
//   thead.innerHTML = "<tr><th>Lu</th><th>Ma</th><th>Mi</th><th>Ju</th><th>Vi</th><th>Sa</th><th>Do</th></tr>";
//   table.appendChild(thead);

//   const tbody = document.createElement("tbody");
//   let tr = document.createElement("tr");
//   let dayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // lunes=0

//   for (let i = 0; i < dayOfWeek; i++) {
//     tr.appendChild(document.createElement("td"));
//   }

//   for (let day = 1; day <= lastDay.getDate(); day++) {
//     const date = new Date(year, month, day);
//     const dateStr = formatDate(date);

//     const td = document.createElement("td");
//     td.textContent = day;

//     // Solo permitir seleccionar desde hoy
//     if (date < today) {
//       td.className = "unavailable";
//     } else if (unavailableDates.includes(dateStr)) {
//       td.className = "unavailable";
//     } else {
//       td.className = "selectable";
//       td.dataset.date = dateStr;

//       if (selectedStart && selectedEnd && dateStr >= selectedStart && dateStr <= selectedEnd) {
//         td.classList.add("selected");
//       } else if (selectedStart === dateStr) {
//         td.classList.add("selected");
//       } else if (selectedEnd === dateStr) {
//         td.classList.add("selected");
//       }
//       td.onclick = function() {
//         handleDateClick(dateStr, unavailableDates);
//       };
//     }
//     tr.appendChild(td);
//     dayOfWeek++;
//     if (dayOfWeek === 7) {
//       tbody.appendChild(tr);
//       tr = document.createElement("tr");
//       dayOfWeek = 0;
//     }
//   }
//   if (dayOfWeek > 0) {
//     for (let i = dayOfWeek; i < 7; i++) {
//       tr.appendChild(document.createElement("td"));
//     }
//     tbody.appendChild(tr);
//   }
//   table.appendChild(tbody);
//   calendarContainer.appendChild(table);

//   // Navegación solo por selectores
//   document.getElementById("monthSelect").onchange = e => {
//     const value = parseInt(e.target.value,10);
//     if (!(displayYear === today.getFullYear() && value < today.getMonth())) {
//       displayMonth = value;
//       drawCalendar(displayYear, displayMonth, unavailableDates, startDate, endDate);
//     }
//   };
//   document.getElementById("yearSelect").onchange = e => {
//     const value = parseInt(e.target.value,10);
//     if (value >= today.getFullYear()) {
//       displayYear = value;
//       if (displayYear === today.getFullYear() && displayMonth < today.getMonth()) {
//         displayMonth = today.getMonth();
//       }
//       drawCalendar(displayYear, displayMonth, unavailableDates, startDate, endDate);
//     }
//   };
// }

// // Selección de rango
// function handleDateClick(dateStr, unavailableDates) {
//   if (!startDate || (startDate && endDate)) {
//     startDate = dateStr;
//     endDate = null;
//     document.getElementById("llegada").value = "";
//     document.getElementById("salida").value = "";
//     document.getElementById("err-calendario").style.display = "none";
//   } else if (!endDate) {
//     if (dateStr < startDate) {
//       endDate = startDate;
//       startDate = dateStr;
//     } else {
//       endDate = dateStr;
//     }
//     // Validar fechas bloqueadas
//     const rangeDates = getDatesBetween(startDate, endDate);
//     if (rangeDates.some(d => unavailableDates.includes(d))) {
//       document.getElementById("err-calendario").style.display = "block";
//       startDate = null;
//       endDate = null;
//       document.getElementById("llegada").value = "";
//       document.getElementById("salida").value = "";
//     } else {
//       document.getElementById("err-calendario").style.display = "none";
//       document.getElementById("llegada").value = startDate;
//       document.getElementById("salida").value = endDate;
//     }
//   }
//   drawCalendar(displayYear, displayMonth, diasOcupados, startDate, endDate);
// }

// // Todas las fechas entre dos días (inclusive)
// function getDatesBetween(start, end) {
//   const arr = [];
//   let d = new Date(start);
//   const endDate = new Date(end);
//   while (d <= endDate) {
//     arr.push(formatDate(d));
//     d.setDate(d.getDate() + 1);
//   }
//   return arr;
// }
// import { getDiasOcupados } from "./firebase-init.js";

// async function cargarFechasOcupadas(callback) {
  
//   const fechas = await getDiasOcupados();
//    diasOcupados.splice(0, diasOcupados.length, ...fechas); // actualiza array globa
//   callback(fechas);
// }
// // Inicializar
// drawCalendar(displayYear, displayMonth, diasOcupados, null, null);

// cargarFechasOcupadas(function(diasOcupados) {
//   drawCalendar(displayYear, displayMonth, diasOcupados, null, null);
// });

// // Validación del paso
// $(function(){
//   $(".next-btn").on("click", function(e){
//     const $step = $(this).closest('.step');
//     if ($step.data("step") == 9) {
//       const llegada = $("#llegada").val();
//       const salida = $("#salida").val();
//       if (!llegada || !salida) {
//         $("#err-calendario").show();
//         e.preventDefault();
//         return false;
//       }
//     }
//   });
// });


import { getDiasOcupados } from "./firebase-init.js";

// Días ocupados inicial (vacío, luego lo cargamos de Firestore)
let diasOcupados = [];

const calendarContainer = document.getElementById("calendar-container");

// Formatear a YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

// Meses en español
const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Variables globales
const today = new Date();
let displayYear = today.getFullYear();
let displayMonth = today.getMonth();
let startDate = null;
let endDate = null;

// Dibuja el calendario
function drawCalendar(year, month, unavailableDates, selectedStart, selectedEnd) {
  calendarContainer.innerHTML = "";

  if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth())) {
    calendarContainer.innerHTML = "<div class='calendar-header'>Solo puedes seleccionar desde el mes actual en adelante.</div>";
    return;
  }

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const header = document.createElement("div");
  header.className = "calendar-header";
  header.innerHTML = `
    <span>
      <select id="monthSelect">${monthNames.map((m,i)=>`<option value="${i}"${i===month?" selected":""}${year===today.getFullYear()&&i<today.getMonth()?' disabled':''}>${m}</option>`).join("")}</select>
      <select id="yearSelect">${[...Array(6)].map((_,i)=>`<option value="${today.getFullYear()+i}"${today.getFullYear()+i===year?" selected":""}>${today.getFullYear()+i}</option>`).join("")}</select>
    </span>
  `;
  calendarContainer.appendChild(header);

  const table = document.createElement("table");
  table.className = "calendar-table";
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Lu</th><th>Ma</th><th>Mi</th><th>Ju</th><th>Vi</th><th>Sa</th><th>Do</th></tr>";
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  let tr = document.createElement("tr");
  let dayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  for (let i = 0; i < dayOfWeek; i++) {
    tr.appendChild(document.createElement("td"));
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const dateStr = formatDate(date);

    const td = document.createElement("td");
    td.textContent = day;

    if (date < today) {
      td.className = "unavailable";
    } else if (unavailableDates.includes(dateStr)) {
      td.className = "unavailable";
       td.innerHTML = `${day} 🌴`;
    } else {
      td.className = "selectable";
      td.dataset.date = dateStr;

      if (selectedStart && selectedEnd && dateStr >= selectedStart && dateStr <= selectedEnd) {
        td.classList.add("selected");
      } else if (selectedStart === dateStr || selectedEnd === dateStr) {
        td.classList.add("selected");
      }
      td.onclick = function() {
        handleDateClick(dateStr, unavailableDates);
      };
    }
    tr.appendChild(td);
    dayOfWeek++;
    if (dayOfWeek === 7) {
      tbody.appendChild(tr);
      tr = document.createElement("tr");
      dayOfWeek = 0;
    }
  }
  if (dayOfWeek > 0) {
    for (let i = dayOfWeek; i < 7; i++) {
      tr.appendChild(document.createElement("td"));
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  calendarContainer.appendChild(table);

  document.getElementById("monthSelect").onchange = e => {
    const value = parseInt(e.target.value,10);
    if (!(displayYear === today.getFullYear() && value < today.getMonth())) {
      displayMonth = value;
      drawCalendar(displayYear, displayMonth, diasOcupados, startDate, endDate);
    }
  };
  document.getElementById("yearSelect").onchange = e => {
    const value = parseInt(e.target.value,10);
    if (value >= today.getFullYear()) {
      displayYear = value;
      if (displayYear === today.getFullYear() && displayMonth < today.getMonth()) {
        displayMonth = today.getMonth();
      }
      drawCalendar(displayYear, displayMonth, diasOcupados, startDate, endDate);
    }
  };
}

// Click de fechas
function handleDateClick(dateStr, unavailableDates) {
  if (!startDate || (startDate && endDate)) {
    startDate = dateStr;
    endDate = null;
    document.getElementById("llegada").value = "";
    document.getElementById("salida").value = "";
    document.getElementById("err-calendario").style.display = "none";
  } else if (!endDate) {
    if (dateStr < startDate) {
      endDate = startDate;
      startDate = dateStr;
    } else {
      endDate = dateStr;
    }
    const rangeDates = getDatesBetween(startDate, endDate);
    if (rangeDates.some(d => unavailableDates.includes(d))) {
      document.getElementById("err-calendario").style.display = "block";
      startDate = null;
      endDate = null;
      document.getElementById("llegada").value = "";
      document.getElementById("salida").value = "";
    } else {
      document.getElementById("err-calendario").style.display = "none";
      document.getElementById("llegada").value = startDate;
      document.getElementById("salida").value = endDate;
    }
  }
  drawCalendar(displayYear, displayMonth, diasOcupados, startDate, endDate);
}

// Todas las fechas entre dos días
function getDatesBetween(start, end) {
  const arr = [];
  let d = new Date(start);
  const endDate = new Date(end);
  while (d <= endDate) {
    arr.push(formatDate(d));
    d.setDate(d.getDate() + 1);
  }
  return arr;
}

// Cargar ocupadas desde Firestore
async function cargarFechasOcupadas() {
  diasOcupados = await getDiasOcupados();
  drawCalendar(displayYear, displayMonth, diasOcupados, null, null);
}



// Inicializar
drawCalendar(displayYear, displayMonth, diasOcupados, null, null);
cargarFechasOcupadas();

// Validación del paso
$(function(){
  $(".next-btn").on("click", function(e){
    const $step = $(this).closest('.step');
    if ($step.data("step") == 9) {
      const llegada = $("#llegada").val();
      const salida = $("#salida").val();
      if (!llegada || !salida) {
        $("#err-calendario").show();
        e.preventDefault();
        return false;
      }
    }
  });
});
