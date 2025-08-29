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
  `;

  // Load QR image from your GitHub Pages site
  const img = new Image();
  img.width = 100;
  img.height = 100;
  img.alt = `QR Code ${bookingId}`;
  img.onload = () => {
    document.getElementById("qrSlot").appendChild(img);

    // After boarding pass is generated
ticketDiv.innerHTML += `
  <button onclick="downloadPDF()">Download as PDF</button>
`;

    ticketDiv.classList.remove("hidden");
  };
  function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Grab the pass section
  const pass = document.getElementById("boardingPass");

  doc.html(pass, {
    callback: function (doc) {
      doc.save("boarding-pass.pdf");
    },
    x: 10,
    y: 10,
    width: 180
  });
}

  img.onerror = () => {
    alert(`Could not load QR image for ${bookingId}.`);
  };
  img.src = `https://snehprayas.github.io/train-boarding-pass-/${bookingId}.png?v=${Date.now()}`;
}
