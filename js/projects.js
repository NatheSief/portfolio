document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("projects");

  try {
    const res = await fetch("data/projects.json");
    const projects = await res.json();

    projects.forEach(async (proj) => {
      const isVisible = proj.visible === undefined || proj.visible === true;
      if (!isVisible) return;

      const card = document.createElement("div");
      card.className =
        "bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-6 hover:shadow-lg transition";

      const langs = proj.repo ? await getRepoLanguages(proj.repo) : proj.tags || [];
      const lastCommit = proj.repo ? await getLastCommitDate(proj.repo) : null;

      const tags = langs
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join(" ");

      card.innerHTML = `
        <h2 class="text-2xl font-bold mb-2 text-blue-400">${proj.repo?.split('/')[1] || proj.title}</h2>
        <p class="text-zinc-300 mb-2">${proj.description}</p>
        <div class="mb-2">${tags}</div>
        <p class="text-zinc-400 text-sm mb-4">Last commit: ${lastCommit}</p>
        <a href="${proj.link}" target="_blank" class="btn-primary inline-block">See on GitHub</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML =
      "<p class='text-red-400'>Could not load projects... 😞</p>";
    console.error(err);
  }
});

async function getRepoLanguages(repoName) {
  const url = `https://api.github.com/repos/${repoName}/languages`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return Object.keys(data);
  } catch (e) {
    console.error(`Error fetching languages for ${repoName}`, e);
    return [];
  }
}

async function getLastCommitDate(repoName) {
  const url = `https://api.github.com/repos/${repoName}/commits`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return new Date(data[0].commit.committer.date).toLocaleDateString();
  } catch (e) {
    console.error(`Error fetching last commit for ${repoName}`, e);
    return "Unknown";
  }
}

