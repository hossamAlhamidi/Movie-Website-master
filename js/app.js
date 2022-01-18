import * as config from "./config.js"
const base_img = "https://image.tmdb.org/t/p/w500/"
const movie_div = document.querySelector("#movie-card");
const btn = document.querySelector("#btn-search");
const input_search = document.querySelector("#search");

let arr_id = [];
let str = localStorage.getItem("id");
if(str!=null){

arr_id = str.split(",");
}
console.log(arr_id,"arr_id")

input_search.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      console.log("enter")
       btn.click()
    }
  });

btn.addEventListener("click",()=>{
    searchByName(input_search.value)
    input_search.value = "";
})

function searchByName(movieName){
    axios.get(config.base_url+`/search/movie?${config.api_key}&query=${movieName}`).then(res=>{
        console.log(res,"search")
        showMovies(res.data)
    }).catch(err=>{
    //     console.log(err,"ser")
    //     console.log("zero")
    //     let div = document.createElement("div");
    //     let text = document.createTextNode("no result")
    //     div.appendChild(text);
    // //    div.style.color = "white"
    //     movie_div.innerHTML = `div`
    })
}

function getMovie(url){
  axios.get(url).then(res=>{
      console.log(res.data,"movie");
    showMovies(res.data)
  }).catch(err=>{
      console.log(err,"err");
  })

}
function addColor(rate){
 if(rate>8){
     return "success"
 }
 else if(rate >5){
     return "warning"
 }
 else {
     return "danger"
 }
}
function showMovies(movies){
    // showModal()
   
  movie_div.innerHTML = movies.results.map((movie=>{
      const {title , poster_path,vote_average,id} = movie;
      
      let color = addColor(vote_average);
    //   showModal(id);
    // showMovieOnModal(id);
    let temp = 
    ` <div class="col-md-3 col-6" id=${id}>
   <div class="overlay"></div>
   <div class="card my-5" >
     <img src="${base_img}${poster_path}" class="card-img-top img-fluid img-card" alt="..." onerror="this.src='https://image.tmdb.org/t/p/w500//1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'" >
     <h5 class="aps-title text-bold text-center">${title}</h5>
       
       <div class=" rate border border-${color} text-white bg-${color} rounded position-absolute">${vote_average}</div>
       <div class=" aps-btn"><button id=${id} class=" text-white btn add-favorite"><i class="fas fa-heart"></i></button></div>
       <button id=${id} "type="button" class="btn btn-primary btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal" 
       ">
    Show Details
  </button>
  
    
   </div>
   
 </div>`
  
 return temp;
  })).join("")
  
  if(movies.results.length == 0){
    
      movie_div.innerHTML = `<div class="text-white">No Result</div>`
  }
  else{
      
   
      const btn_modal = document.querySelectorAll(".btn-modal");
      const btn_favorite = document.querySelectorAll(".add-favorite")
       for(let btn of btn_modal){
           btn.addEventListener("click",(event)=>{
               console.log(event.target.id)
            showMovieOnModal(event.target.id);
           })
       }
       for(let btn1 of btn_favorite){
           btn1.addEventListener("click",(event)=>{
               console.log(event.target.id)
            //    if(event.target.tagName.toLowerCase()!="button"){
            //        console.log(event.target.parentNode,"node")
            //    }
            console.log(event.currentTarget,"cuu")
               event.target.classList.add("text-danger")
               
               if(!arr_id.includes(event.currentTarget.id)){
                   console.log("yes")
               arr_id.push(event.currentTarget.id)
           addFavoraite(arr_id)
               }
               else{
                   console.log("no")
               }
           })
       }

  }

}

function addFavoraite(id){
    console.log("fav",id)
    // localStorage.setItem("id",id)
    localStorage["id"] = id
   
}

function showMovieOnModal(movieId){
axios.get(`https://api.themoviedb.org/3/movie/${movieId}?${config.api_key}&language=en-US`)
.then(res=>{
    console.log(res,"modal");
    changeDataModal(res.data);
})
}

function changeDataModal(movieData){
    
     const modal = document.querySelector("#modal");
     document.querySelector(".modal-body").innerHTML= movieData.overview
     document.querySelector(".modal-title").innerHTML= movieData.title ;
    let genreAndTime =  document.querySelector(".modal-genre")
    genreAndTime.innerHTML= `${movieData.runtime} min ` 
     for(let e of movieData.genres){
        genreAndTime.innerHTML+= e.name +" ";
     }
     document.querySelector(".modal-rate").innerHTML = movieData.vote_average +" Rate"
    //  modal.innerHTML = `<!-- Button trigger modal -->
     
     
    //  <!-- Modal -->
    //  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //    <div class="modal-dialog">
    //      <div class="modal-content">
    //        <div class="modal-header">
    //          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
    //          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //        </div>
    //        <div class="modal-body">
    //         ${movieData.overview}
    //        </div>
    //        <div class="modal-footer">
    //          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //          <button type="button" class="btn btn-primary">Save changes</button>
    //        </div>
    //      </div>
    //    </div>
    //  </div>`
   }

function categories(){
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?${config.api_key}&language=en-US`)
  .then(res=>{
      console.log(res.data,"gengre")
      showCategories(res.data)
  }).catch(err=>{
      console.log(err);
  })

}
// =================== for the nav categories
function showCategories(categories){
    const categories_div = document.querySelector("#categories");
   categories_div.innerHTML = categories.genres.map((genre,i)=>{
       if(i<=7){
         return `<h5 class="mx-4" style="display:inline-block;cursor:pointer" id=${genre.id}>${genre.name}</h5>`
       }
    }).join(" ")

    const categories_nav = document.querySelectorAll("#categories > h5");
    for(let element of categories_nav ){
        element.addEventListener("click",()=>{
            showMoviesByCategories(event.target.id)
            
        })
    }
}

// ================================ to show movies for each categories
function showMoviesByCategories(genreId){
axios.get(`${config.base_url}/discover/movie?${config.api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${genreId}`).then(res=>{
    console.log(res,"res show")
    showMovies(res.data)
}).catch(err=>{
    console.log(err)
})

}


categories();

getMovie(config.api_url)

// setTimeout(()=>{

//     const add_favorite = document.querySelector("#add-favorite");
//     const rate = document.querySelector(".rate");
//     console.log(rate)
//     console.log(add_favorite)

// },1)
// window.addEventListener("load",()=>{
//     const add_favorite = document.querySelectorAll(".add-favorite");
   
//     for(let element of add_favorite){
//        element.addEventListener("click",()=>{
          
//        })
//     }

    

// })


