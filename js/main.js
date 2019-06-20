const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {  
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value,
  server = 'https://api.themoviedb.org/3/search/multi?api_key=f827fc972e4e548f3b85d8a8349b966f&language=ru&query=' + searchText;
  requestApi(server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {

  const request = new XMLHttpRequest();
  request.open('GET', url);
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
      let imgItem = item.poster_path ? `http://image.tmdb.org/t/p/w500/${item.poster_path}` : 'http://via.placeholder.com/200x300/?text=НЕТ+ИЗОБРАЖЕНИЯ';
      console.log(nameItem);
      inner += `
          <div class="col-12 col-md-4 col-xl-3 text-center cards">
          <div class="card mb-3">
          <a href="https://www.themoviedb.org/${item.media_type}/${item.id}">
            <img src="${imgItem}" class="card-img-top" alt="${nameItem}" title="${nameItem}">
          <b>${nameItem}</b></a>
          <div class="card-body">
            <p class="card-text"><span class="badge badge-primary">Рейтинг: ${rating}</span></p>
            <p class="card-text text-primary">Дата выхода:<br/>${dataItem}</p>
            <a href="https://www.themoviedb.org/${item.media_type}/${item.id}" class="btn btn-primary">Перейти</a>
          </div>
          </div>
        

        </div>`;
    });

    movie.innerHTML = inner;



  });

}