const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {  
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value,
  server = 'https://api.themoviedb.org/3/search/multi?api_key=f827fc972e4e548f3b85d8a8349b966f&language=ru&query=' + searchText;
  movie.innerHTML = 'Загрузка';
  requestApi(server)
    .then(function(result){
      const output = JSON.parse(result);
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
    })
    .catch(function(reason){
      movie.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Упс, что-то пошло не так! <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
      console.log('error: ' + reason.status);
    });
}
searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {
  return new Promise (function (resolve, reject){
  const request = new XMLHttpRequest();
  request.open('GET', url);
    
    request.addEventListener('load', function(){
      if (request.status !== 200){
        reject({status: request.status});
        return;
      }

      resolve(request.response);
    });

    request.addEventListener('error', function(){
      reject({status: request.status});
    });
    request.send();
  });

}