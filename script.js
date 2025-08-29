function generatePass() {
  const bookingId = document.getElementById("bookingId").value.trim().toUpperCase();
  const name = document.getElementById("name").value.trim();
  const ticketDiv = document.getElementById("boardingPass");

  ticketDiv.innerHTML = "";

  if (!bookings[bookingId]) {
    alert("Booking ID not found.");
    return;
  }

  const data = bookings[bookingId];

  if (data.name.toLowerCase() !== name.toLowerCase()) {
    alert("Name does not match booking.");
    return;
  }

  ticketDiv.innerHTML = `
    <div class="ticket">
      <div class="ticket-left">
        <h2>SNEH PRAYAS</h2>
        <p><strong>Name of Passenger:</strong> ${data.name}</p>
        <p><strong>Train:</strong> BKN DURONTO EXP (${data.train})</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>From:</strong> ${data.from}</p>
        <p><strong>To:</strong> ${data.to}</p>
        <p><strong>Coach:</strong> ${data.coach} &nbsp; <strong>Seat:</strong> ${data.seat}</p>
      </div>

      <div class="ticket-right">
        <h2>BOARDING PASS</h2>
        <div class="qr" id="qrSlot"></div>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
      </div>
    </div>
    <button onclick="downloadPDF()">Download as PDF</button>
  `;

  // Load QR image
  const img = new Image();
  img.width = 100;
  img.height = 100;
  img.alt = `QR Code ${bookingId}`;
  img.crossOrigin = "anonymous"; // important for PDF rendering
  img.onload = () => {
    document.getElementById("qrSlot").appendChild(img);
    ticketDiv.classList.remove("hidden");
  };
  img.onerror = () => {
    alert(`Could not load QR image for ${bookingId}.`);
  };
  img.src = `https://snehprayas.github.io/train-boarding-pass-/${bookingId}.png?v=${Date.now()}`;
}

// ✅ Global function (outside generatePass)
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const ticketEl = document.querySelector("#boardingPass .ticket");

  if (!ticketEl) {
    alert("No ticket to download yet.");
    return;
  }

  // Use html2canvas to capture the ticket as image
  html2canvas(ticketEl, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("boarding-pass.pdf");
  });
}
