document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/network");
    const data = await response.json();

    console.log("Fetched data:", data);
    const users = data.events || [];

    if (Array.isArray(users) && users.length > 0) {
      const displaySection = document.getElementById("user-list");

      users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.classList.add(
          "user-card",
          "p-4",
          "rounded",
          "shadow-2xl",
          "mb-4"
        );

        userDiv.innerHTML = `
          <div class="border-[3px] border-[#FFDE00] p-5 w-full overflow-y-auto h-[250px] bg-[#199D8D] rounded-md shadow-md shadow-black">
            <div class="border-[3px] border-[#FFDE00] p-5 w-full  overflow-y-auto h-[200px] bg-white rounded-md shadow-md shadow-black">    
              <div class="mt-3">
                <h1 class="text-2xl text-[#199D8D] font-bold">${
                  user.userName
                }</h1>
                <hr class="w-[95%] h-1 border-none bg-[#FFDE00]" />
                <hr class="w-[95%] h-1 mb-1 border-none bg-[#199D8D]" />
                <h3 class="mt-1 mb-1">Job Status: ${user.jobStatus}</h3>
                <hr class="w-[95%] h-1 border-none bg-[#FFDE00]" />
                <hr class="w-[95%] h-1 mb-1 border-none bg-[#199D8D]" />
                <h3 class="mt-1 mb-1">Mobile: ${user.mobile}</h3>
                <a class="mt-1 mb-1 text-[#199D8D]" href="${
                  user.social || "#"
                }" target="_blank">Social Media Link</a>
              </div>
            </div>
          </div>
        `;
        displaySection.appendChild(userDiv);
      });
    } else {
      console.error("Expected an array of users, but got:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
