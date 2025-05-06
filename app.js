let dataBox = document.querySelector(".dataBox");
let searchBox = document.querySelector(".searchBox");
let button = document.querySelector(".button");
let skeletonLoading = `<div
          class="bg-[#161b22]/70 border border-[#30363d] backdrop-blur-md rounded-2xl p-6 shadow-xl flex gap-5 items-center animate-pulse ring-1 ring-white/5 max-w-xl"
        >
          <div class="w-20 h-20 rounded-full bg-[#21262d]"></div>
          <div class="flex-1 space-y-3">
            <div class="w-1/3 h-5 bg-[#21262d] rounded"></div>
            <div class="w-1/2 h-4 bg-[#21262d] rounded"></div>
            <div class="flex gap-3">
              <div class="w-24 h-3 bg-[#21262d] rounded"></div>
              <div class="w-20 h-3 bg-[#21262d] rounded"></div>
              <div class="w-28 h-3 bg-[#21262d] rounded"></div>
            </div>
          </div>
        </div>`;
function renderUserData(data) {
  return `
            <div class="max-w-2xl mx-auto bg-[#161b22]/70 border border-[#30363d] backdrop-blur-md rounded-2xl p-6 shadow-xl text-white ring-1 ring-white/5">
              <div class="flex items-start gap-6">
                <img src="${data.avatar_url}" alt="${
    data.name
  }" class="w-20 h-20 rounded-full border-2 border-blue-500 object-cover" />
                
                <div class="flex-1 space-y-2">
                  <div>
                    <h2 class="text-2xl font-bold">${
                      data.name || "No Name"
                    }</h2>
                    <p class="text-gray-400">@${data.login}</p>
                    <p class="text-sm text-gray-300 mt-1">${
                      data.bio || "No bio provided."
                    }</p>
                  </div>
        
                  <div class="flex flex-wrap gap-x-6 text-sm text-gray-300 mt-2">
                    <p><span class="font-semibold text-white">Public Repos:</span> ${
                      data.public_repos
                    }</p>
                    <p><span class="font-semibold text-white">Followers:</span> ${
                      data.followers
                    }</p>
                    <p><span class="font-semibold text-white">Following:</span> ${
                      data.following
                    }</p>
                    <p><span class="font-semibold text-white">Location:</span> ${
                      data.location || "Unknown"
                    }</p>
                  </div>
        
                  <div class="flex flex-wrap gap-x-6 text-sm text-gray-300">
                    <p><span class="font-semibold text-white">Company:</span> ${
                      data.company || "N/A"
                    }</p>
                    <p><span class="font-semibold text-white">Blog:</span> ${
                      data.blog
                        ? `<a href="${data.blog}" class="text-blue-400 hover:underline break-all">${data.blog}</a>`
                        : "N/A"
                    }</p>
                  </div>
                </div>
              </div>
            </div>`;
}

dataBox.innerHTML = skeletonLoading;

function getUserData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((response) => {
    const remaining = response.headers.get("X-RateLimit-Remaining");
    document.querySelector(
      ".noticeShow"
    ).innerHTML = `<div class="text-blue-700 w-fit mx-auto">GitHub allows 60 requests per hour. You have ${remaining} request(s) remaining in this hour.</div>`;
    if (!response.ok) {
      dataBox.innerHTML = `<div class="mx-auto text-red-700 w-fit">Please enter a valid username.</div>`;
    } else {
      return response.json();
    }
  });
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  let searchName = searchBox.value.trim();

  dataBox.innerHTML = skeletonLoading;

  getUserData(searchName).then((data) => {
    if (data) dataBox.innerHTML = renderUserData(data);
  });
});
