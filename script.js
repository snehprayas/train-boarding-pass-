function generatePass() {
  const bookingId = document.getElementById("bookingId").value.trim();
  const name = document.getElementById("name").value.trim();
  const ticketDiv = document.getElementById("boardingPass");

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
    <h2>TRAIN BOARDING PASS</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Train No:</strong> ${data.train}</p>
    <p><strong>Date:</strong> ${data.date}</p>
    <p><strong>Time:</strong> ${data.time}</p>
    <p><strong>From:</strong> ${data.from} → <strong>To:</strong> ${data.to}</p>
    <p><strong>Coach:</strong> ${data.coach} | <strong>Seat:</strong> ${data.seat}</p>
    <p><strong>Booking ID:</strong> ${bookingId}</p>
  `;
  ticketDiv.classList.remove("hidden");
}
