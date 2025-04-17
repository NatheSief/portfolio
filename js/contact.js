const contacts = [
  {
    name: "GitHub",
    url: "https://github.com/NatheSief",
    icon: "🐙",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nathan-siefert-903601240/",
    icon: "💼",
  },
  {
    name: "CodinGame",
    url: "https://www.codingame.com/profile/9e30cab7a6ca09b2ea07a42eed8bd5072045375",
    icon: "🧠",
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleContacts");
  const section = document.getElementById("contactSection");

  toggleBtn?.addEventListener("click", () => {
    section.classList.toggle("hidden");

    if (!section.classList.contains("loaded")) {
      contacts.forEach((contact) => {
        const link = document.createElement("a");
        link.href = contact.url;
        link.target = "_blank";
        link.innerHTML = `${contact.icon} ${contact.name}`;
        link.className = "block hover:text-blue-400 transition";
        section.appendChild(link);
      });
      section.classList.add("loaded");
    }
  });
});

