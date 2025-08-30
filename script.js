function generatePass() {
  const bookingId = document.getElementById("bookingId").value.trim().toUpperCase();
  const nameInput = document.getElementById("name").value.trim();
  const ticketDiv = document.getElementById("boardingPass");

  ticketDiv.innerHTML = "";  // Clear any previous content

  // ✅ Check if booking exists
  if (!bookings[bookingId]) {
    alert("Booking ID not found.");
    return;
  }

  const data = bookings[bookingId];

  // ✅ Validate name (case-insensitive)
  if (data.name.toLowerCase() !== nameInput.toLowerCase()) {
    alert("Name does not match booking.");
    return;
  }

  // ✅ Hide input form
  document.getElementById("gateway").style.display = "none";

  // ✅ Ticket Layout (Rectangular 3-part ticket)
  ticketDiv.innerHTML = `
    
    <div class="ticket">

      <!-- LEFT PART: QR + Booking ID + Name + Phone + Gender -->
      <div class="ticket-part stub">

        <div class="qr" id="qrSlot"></div>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
      </div>

      <!-- MAIN PART: Return Journey (Now swapped) -->
      <div class="ticket-part main">

        <p><strong>From:</strong> ${data.from}</p>
        <p><strong>To:</strong> ${data.to}</p>
        <p><strong>Train No:</strong> 54321</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Coach:</strong> ${data.coach} &nbsp; <strong>Seat:</strong> ${data.seat}</p>
      </div>

      <!-- RIGHT PART: Onward Journey (Now swapped) -->
      <div class="ticket-part stub">

        <p><strong>From:</strong> ${data.to}</p>
        <p><strong>To:</strong> ${data.from}</p>
        <p><strong>Train:</strong> BKN DURONTO EXP (${data.train})</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Coach:</strong> ${data.coach} &nbsp; <strong>Seat:</strong> ${data.seat}</p>
      </div>

    </div>

    <!-- Download Button -->
    <button onclick="downloadPDF()">Download as PDF</button>
  `;

  // ✅ Load QR image (from your GitHub repo)
  const img = new Image();
  img.width = 100;
  img.height = 100;
  img.alt = `QR Code for ${bookingId}`;
  img.crossOrigin = "anonymous";

  img.onload = () => {
    document.getElementById("qrSlot").appendChild(img);
    ticketDiv.classList.remove("hidden");
  };

  img.onerror = () => {
    alert(`Could not load QR image for ${bookingId}.`);
  };

  const qrId = qrMapping[bookingId] || bookingId;  // fallback if unmapped
  img.src = `https://snehprayas.github.io/train-boarding-pass-/${qrId}.png?v=${Date.now()}`;
}

// ✅ Download as PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const ticketEl = document.querySelector("#boardingPass");

  if (!ticketEl) {
    alert("No ticket to download yet.");
    return;
  }

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
