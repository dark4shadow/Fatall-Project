// Reusable fetch function
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
    }
    return response.json();
  };
  
  // Card builder helper
  const createCard = (item) => {
    const card = document.createElement("div");
    card.className = "executor-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <a href="${item.url}" download>Download</a>
    `;
    return card;
  };
  
  // Loading state manager
  const setLoading = (spinnerId, listId, isLoading) => {
    const spinner = document.getElementById(spinnerId);
    spinner.style.display = isLoading ? "block" : "none";
  };
  
  // Main content loader
  const loadContent = async (type) => {
    const config = {
      executors: {
        url: "data/executors.json",
        spinnerId: "loading-executors",
        listId: "executor-list"
      },
      scripts: {
        url: "data/scripts.json",
        spinnerId: "loading-scripts",
        listId: "script-list"
      }
    };
  
    const { url, spinnerId, listId } = config[type];
    const contentList = document.getElementById(listId);
  
    try {
      setLoading(spinnerId, listId, true);
      const data = await fetchData(url);
  
      if (!data.length) {
        contentList.innerHTML = `<p>No ${type} available.</p>`;
        return;
      }
  
      contentList.innerHTML = '';
      data.forEach(item => {
        contentList.appendChild(createCard(item));
      });
  
    } catch (error) {
      console.error(`Error loading ${type}:`, error);
      contentList.innerHTML = `<p>Failed to load ${type}. Please try again later.</p>`;
    } finally {
      setLoading(spinnerId, listId, false);
    }
  };
  
  // Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    loadContent('executors');
    loadContent('scripts');
  });