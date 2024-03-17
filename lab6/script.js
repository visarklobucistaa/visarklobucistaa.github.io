document.addEventListener('DOMContentLoaded', function() {
  const catList = document.getElementById('catList');
  const apiUrl = 'https://brianobruno.github.io/cats.json';
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const cats = data.cats;
      cats.forEach(cat => {
        const catElement = document.createElement('div');
        catElement.innerHTML = `
          <h3>${cat.name}</h3>
          <p>Breed: ${cat.breed}</p>
          <img src="${cat.image}" alt="${cat.name}">
        `;
        catList.appendChild(catElement);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
