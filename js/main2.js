const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {  
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value,
  server = 'https://api.themoviedb.org/3/search/multi?api_key=f827fc972e4e548f3b85d8a8349b966f&language=ru&query=' + searchText;
  requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {

  const request = new XMLHttpRequest();
  request.open(method, url);
  request.send();
  
  request.addEventListener('readystatechange', function() {
    if (request.readyState !== 4) return;

    if (request.status !== 200){
      console.log('error: ' + request.status);
      return;
    }

    const output = JSON.parse(request.responseText);

    console.log(output);

    let inner = '';
    
    output.results.forEach(function (item) {
      let nameItem = item.name || item.title;
      let rating = item.vote_average;
      let dataItem = item.first_air_date || item.release_date || 'неизвестна';

      // console.log(nameItem);
     
      inner += 
        `<div class="col-12 col-md-4 col-xl-3 text-center cards">
          <div class="card mb-3">
            <b class="text-primary">${nameItem}</b>
            <div class="card-body">
              <p class="card-text"><span class="badge badge-primary">Рейтинг: ${rating}</span></p>
              <p class="card-text text-primary">Дата выхода:<br/>${dataItem}</p>
            </div>
          </div>
        

        </div>`;
    });

    movie.innerHTML = inner;



  });

}