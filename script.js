function generatePass() {
  const bookingId = document.getElementById("bookingId").value.trim().toUpperCase();
  const name = document.getElementById("name").value.trim();
  const ticketDiv = document.getElementById("boardingPass");

  // Clear old content
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
    <div class="ticket-left">
      <h2>TRAIN BOARDING PASS</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Booking ID:</strong> ${bookingId}</p>
      <p><strong>Train No:</strong> ${data.train}</p>
      <p><strong>Coach:</strong> ${data.coach}</p>
      <p><strong>Seat:</strong> ${data.seat}</p>
    </div>
    <div class="ticket-right">
      <p><strong>Date:</strong> ${data.date}</p>
      <p><strong>Time:</strong> ${data.time}</p>
      <p><strong>From:</strong> ${data.from}</p>
      <p><strong>To:</strong> ${data.to}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
    </div>
  `;

  ticketDiv.classList.remove("hidden");
}
