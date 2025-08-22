function generatePass() {
  const bookingId = document.getElementById("bookingId").value.trim().toUpperCase();
  const name = document.getElementById("name").value.trim();
  const ticketDiv = document.getElementById("boardingPass");
  const actionsDiv = document.getElementById("actions");

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
    <div class="ticket-wrapper">
      <div class="ticket-header">
        <span>🚆 BKN DURANTO EXP</span>
        <span>ECONOMY</span>
        <span>BOARDING PASS</span>
      </div>
      <div class="ticket">
        <div class="ticket-left">
          <div class="ticket-section">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Train No:</strong> ${data.train}</p>
            <p><strong>Coach:</strong> ${data.coach}</p>
            <p><strong>Seat:</strong> ${data.seat}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>From:</strong> ${data.from}</p>
            <p><strong>To:</strong> ${data.to}</p>
          </div>
          <div id="qrcode"></div>
        </div>
        <div class="ticket-right">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>From:</strong> ${data.from}</p>
          <p><strong>To:</strong> ${data.to}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          <p><strong>Coach:</strong> ${data.coach} | <strong>Seat:</strong> ${data.seat}</p>
        </div>
      </div>
    </div>
  `;

  // Generate QR Code
  new QRCode(document.getElementById("qrcode"), {
    text: `Passenger: ${data.name}\nBooking ID: ${bookingId}\nTrain: ${data.train}\nCoach: ${data.coach}\nSeat: ${data.seat}\nFrom: ${data.from}\nTo: ${data.to}\nDate: ${data.date}\nTime: ${data.time}`,
    width: 90,
    height: 90
  });

  ticketDiv.classList.remove("hidden");
  actionsDiv.classList.remove("hidden");
}

// Download as PDF
function downloadPDF() {
  const element = document.getElementById("boardingPass");
  const opt = {
    margin:       0.5,
    filename:     'boarding-pass.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
  };
  html2pdf().set(opt).from(element).save();
}
