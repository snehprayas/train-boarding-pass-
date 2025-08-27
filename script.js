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
        <img src="${bookingId}.png" alt="QR Code" width="100" height="100"/>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
      </div>
    </div>
  `;

  ticketDiv.classList.remove("hidden");
}
