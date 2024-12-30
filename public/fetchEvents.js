function createEventCard(event, imageUrl) {
  const eventDiv = document.createElement("div");
  eventDiv.className = `event-card border-[3px] border-[#FFDE00] box p-5 w-full md:max-w-[350px] 
     overflow-hidden h-[400px] bg-[#C5E7E2] rounded-md shadow-md shadow-black flex flex-col`;

  const uniqueId = Date.now() + Math.random();
  const yesButtonId = `yesButton-${uniqueId}`;
  const noButtonId = `noButton-${uniqueId}`;
  const yesNoDivId = `yesNoDiv-${uniqueId}`;

  eventDiv.innerHTML = `
      <img
        src="${imageUrl}"
        alt="Event Image"
        class="w-full h-32 object-cover rounded-md"
      />
      <h1 class="text-2xl text-[#199D8D] font-bold mt-3">
        ${event.location}
      </h1>
      <h3 class="mt-1 mb-1 font-light text-[#199D8D]">${event.date}</h3>
      <h3 class="mt-1 mb-1 font-light">By ${event.organiser}</h3>
      <h3 class="mt-1 mb-1 font-light">Number of Attendees ${event.counter}</h3>
      <p class="text-sm text-justify text-[#199D8D]">
        ${event.description}
      </p>

    <div
      class="bg-[#199D8D] w-full flex justify-between px-2 py-2 text-white 
      sticky bottom-0"
      id="${yesNoDivId}"
    >
      <div class="text-[#FEDD00]">Will you attend the event?</div>
      <div>
        <button
          class="mr-2 bg-green-500 hover:bg-green-600 px-1 ring-[#FFDD00] 
          ring-2 rounded"
          id="${yesButtonId}"
        >
          Yes
        </button>
        <button
          class="bg-rose-400 hover:bg-rose-500 px-1 ring-[#FFDD00] 
          ring-2 rounded"
          id="${noButtonId}"
        >
          No
        </button>
      </div>
    </div>`;

  const eventsContainer = document.getElementById("eventsContainer");
  eventsContainer.appendChild(eventDiv);

  const yesButton = document.getElementById(yesButtonId);
  const noButton = document.getElementById(noButtonId);
  const yesNoDiv = document.getElementById(yesNoDivId);
  const counter = document.getElementById(event.counter);

  yesButton.addEventListener("click", async () => {
    console.log(`Visitors: ${counter}`);
    yesNoDiv.style.display = "none";
    // const organiser = prompt("Write the organiser's name to verify your login ");
    alert("You're most welcome to join the event");
    // location.reload()
    setTimeout(() => {
      location.reload();
    }, 3000);

    const counterData = {
      yesButton: yesButtonId,
      noButton: noButtonId,
      counter: counter,
    };

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(counterData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        alert("Data added successfully!");
      } else {
        alert("Error submitting data.");
        console.error(result);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`There was a problem submitting data: ${error.message}`);
    }
  });

  noButton.addEventListener("click", () => {
    yesNoDiv.style.display = "none";
  });
}

async function fetchEvents() {
  try {
    const response = await fetch("http://localhost:3000/events");
    const data = await response.json();
    console.log(data);

    if (data.success) {
      const imageUrls = [
        "images/navratri.jpg",
        "images/hackathon.jpeg",
        "images/football-match.jpg",
        "images/fire-safety.jpg",
        "images/project-display.jpg",
      ];

      data.events.forEach((event, index) => {
        const imageUrl = imageUrls[index % imageUrls.length];
        createEventCard(event, imageUrl);
      });
    } else {
      console.error("Failed to fetch events:", data.message);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

window.onload = fetchEvents();
{
  /* <h3 class="mt-1 mb-1 font-light">Attendees Count: ${event.counter}</h3> */
}
