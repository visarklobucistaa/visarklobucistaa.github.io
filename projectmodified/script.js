let searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', e => {
	 let searchInput = document.getElementById('search-input');
   let searchTerm = searchInput.value;
	 e.preventDefault();

	if(searchTerm == '') {
    showMessage('Please add search term', 'alert-danger')
   } else {
		 getArticles();
	 }	
		});

function getArticles(){
	 var searchInput = document.getElementById('search-input');
   var searchTerm = searchInput.value;
   var sortBy = document.querySelector('input[name="sortby"]:checked').value;
   var searchLimit = document.getElementById('limit').value;
	 let after = '';
	 let count = 0;
	 let api;
	if(searchTerm === "" && count === 0){
		api = `https://www.reddit.com/hot.json?`;
	} else if (searchTerm === "" && count > 0) {
		api = `https://www.reddit.com/hot.json?count=${count}&after=${after}`;
	} else {
		api = `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`;
	}	
		console.log(api);
		fetch(api)
			.then(res => res.json())
			.then(data => data.data)
			.catch(err => console.log(err.toString()))
			.then(results => {
			let output = '<div class="card-columns">';
			after = results.after;
			count += 25;
			results.children.forEach(post => {
				let image = post.data.preview ? post.data.preview.images[0].source.url : 'https://cnet4.cbsistatic.com/img/tay4JHKNwejbFaG_tCM-MF0WbQY=/2015/07/09/7bbb900c-b51a-4b78-a791-5bd6fc9793cd/fd-reddit-alien.jpg';
				output += `
	<div class="card">
	<img class="card-img-top" src="${image}" alt="Card image cap">
	<div class="card-body">
	<h5 class="card-title">${post.data.title}</h5>
	<p class="card-text">${truncateText(post.data.selftext, 100)}</p>
	<a href="https://reddit.com${post.data.permalink}" target="_blank" class="btn btn-primary">Read more</a>
	<hr>
	<p><b>Subreddit: ${post.data.subreddit} <br> Score: ${post.data.score}</b></p>
	</div>
	</div>`
			});
			output += '</div>';
			document.getElementById('results').innerHTML = output;
		});
	e.preventDefault();
};
function showMessage(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const searchContainer = document.getElementById('search-container');
    const search = document.getElementById('search');
    searchContainer.insertBefore(div, search);
    setTimeout(() => document.querySelector('.alert').remove(), 5000);
}
function truncateText(text, limit) {
    const shortened = text.indexOf(' ', limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened);
}