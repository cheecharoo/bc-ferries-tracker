async function loadFerries() {
  try {
    const res = await fetch("/api/ferries");
    const ferries = await res.json();

    console.log("Fetched data:", ferries); // should show capacityRoutes and nonCapacityRoutes

    // Pick which routes to display — capacityRoutes have live fill % data
    const routes = ferries.capacityRoutes;

    const container = document.getElementById("ferry-lines-container");
    container.innerHTML = "";

    routes.forEach(route => {
      const card = document.createElement("div");
      card.className = "card m-2 p-3 shadow-sm";

      // Each route contains sailings array
      const sailings = route.sailings.slice(0, 3); // first 3 sailings

      card.innerHTML = `
        <h5>${route.fromTerminalCode} → ${route.toTerminalCode}</h5>
        <p><small>Duration: ${route.sailingDuration || "N/A"}</small></p>
        <ul class="list-group list-group-flush">
          ${sailings
            .map(
              s => `
              <li class="list-group-item">
                <strong>Dep:</strong> ${s.time || "—"}<br>
                <strong>Arr:</strong> ${s.arrivalTime || "—"}<br>
                <strong>Status:</strong> ${s.sailingStatus || "—"}<br>
                <strong>Fill:</strong> ${s.fill || 0}% cars / ${s.carFill || 0}% foot
              </li>`
            )
            .join("")}
        </ul>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading ferry data:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadFerries);
