document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/meetup");
    const data = await response.json();

    console.log("Fetched data:", data);
    const meetups = data.meetups || [];

    if (Array.isArray(meetups) && meetups.length > 0) {
      const displaySection = document.getElementById("meetup-list");

      meetups.forEach((meetup) => {
        const meetupDiv = document.createElement("div");
        meetupDiv.classList.add(
          "meetup-card",
          "p-4",
          "rounded",
          "shadow-2xl",
          "mb-4"
        );

        meetupDiv.innerHTML = `
              <div class="border-[3px] border-[#FFDE00] p-5 w-full overflow-y-auto h-[210px] bg-white rounded-md shadow-md shadow-black">    
                <div class="mt-3">
                  <h1 class="text-2xl text-[#199D8D] font-bold">${meetup.name}</h1>
                  <hr class="w-[95%] h-1 border-none bg-[#FFDE00]" />
                  <hr class="w-[95%] h-1 mb-1 border-none bg-[#199D8D]" />
                  <h3 class="mt-1 mb-1">Available From: ${meetup.s_date} To: ${meetup.e_date}</h3>
                  <a href="mapdemo.html" class="text-[#199D8D] text-lg" target="_blank"> Click here for Location</a>
                </div>
            </div>
          `;
        displaySection.appendChild(meetupDiv);
      });
    } else {
      console.error("Expected an array of meetups, but got:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
