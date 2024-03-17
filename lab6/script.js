document.addEventListener('DOMContentLoaded', function () {
  const databutton = document.getElementById('databutton');
  const responseContainer = document.getElementById('responseContainer');
  databutton.addEventListener('click', function () {
    fetch('https://brianobruno.github.io/cats.json')
      .then(response => response.json())
      .then(data => {
        data.facts.sort((a, b) => a.factId - b.factId);
        const table = document.createElement('table');
        table.border = '1';
        table.innerHTML = `
          <tr>
            <th><b>FactID</th></b>
            <th><b>FactText</th></b>
          </tr>
        `;
        data.facts.slice(0, 5).forEach(fact => {
          const row = table.insertRow();
          row.innerHTML = `
            <td>${fact.factId}</td>
            <td>${fact.text}</td>
          `;
        });
        responseContainer.innerHTML = '';
        responseContainer.appendChild(table);
        const catPhoto = document.createElement('img');
        catPhoto.src = data.catPhoto;
        catPhoto.alt = 'Cat Photo';
        responseContainer.appendChild(catPhoto);
      })
      .catch(error => {
        console.error('Data not found:', error);
        responseContainer.innerHTML = 'Data not found';
      });
  });
});
