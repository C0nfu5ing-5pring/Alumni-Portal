document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/messages");

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    const messages = Array.isArray(data.messages) ? data.messages : [];

    if (messages.length > 0) {
      const displaySection = document.getElementById("message-list");

      messages.forEach((message) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add();
        "message-card", "p-2", "rounded", "shadow-md", "mb-4";

        messageDiv.innerHTML = `
            <div class="border-[3px] border-[#FFDE00] p-5 w-full scroll-none hover:overflow-y-scroll h-[150px] bg-white rounded-md shadow-md shadow-black">    
              <div class="mt-3">
                <h1 class="text-2xl text-[#199D8D] font-bold">${message.user}</h1>
                <hr class="w-[95%] h-1 border-none bg-[#FFDE00]" />
                <hr class="w-[95%] h-1 mb-1 border-none bg-[#199D8D]" />
                <h3 class="mt-1 mb-1">Message: ${message.message}</h3>
              </div>
            </div>
        `;
        displaySection.appendChild(messageDiv);
      });
    } else {
      console.error("No messages available.");
      const displaySection = document.getElementById("message-list");
      displaySection.innerHTML = `<p>No messages to display.</p>`;
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
