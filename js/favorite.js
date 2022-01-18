
import * as config from "./config.js"
let count = 0;
console.log("hi")
let storage = localStorage.getItem("id")
if(storage !=null){
console.log(storage,"str")
let arr_storage = storage.split(",");
console.log(arr_storage,"arr")
function hossam(){
  console.log("hossam")
}
// stoarge = JSON.parse(storage);
// console.log(storage,"json")
const favorite_div = document.querySelector("#favorite-card");

// function showMovieOnModal(movieId){
//     axios.get(`https://api.themoviedb.org/3/movie/${movieId}?${config.api_key}&language=en-US`)
//     .then(res=>{
//         console.log(res,"modal");
//         changeDataModal(res.data);
//     })
//     }

async function getFavoriteMovie(){
   
   for(let element of arr_storage){
       console.log(element,"id")
   await axios.get(`https://api.themoviedb.org/3/movie/${element}?${config.api_key}&language=en-US`)
    .then(res=>{
        console.log(res,"res fav")
        // showFav(res.data)
       favorite_div.innerHTML += `<div class="col-md-3 col-6">
        <div class="card my-5" >
          <img src="https://image.tmdb.org/t/p/w500/${res.data.poster_path}" class="card-img-top" alt="...">
          
            <h5 class="aps-title text-bold text-center">${res.data.title}</h5>
            <div class=" rate border border-success text-white bg-success rounded position-absolute">${res.data.vote_average}</div>
            <div class="aps-btn"><button class="btn text-danger remove"  id=${res.data.id}><i class="fas fa-trash"></i></button></div>
          
        </div>
      </div>`
    }).catch(err=>{
        console.log(err,"err fav");
    })
   }

   let btn_remove = document.querySelectorAll(".remove")
   console.log(btn_remove,"btn")
  //  btn_remove.addEventListener("click",hossam)
  for(let btn of btn_remove){
    btn.addEventListener("click",(event)=>{
      console.log(event.target,"btn")
        removeFav(event.currentTarget.id);
    })
  }
}
function removeFav(id){
  console.log(id,"id")
console.log( arr_storage,"let arr_storage");
// console.log( arr_storage.includes("id"))
  let index = arr_storage.indexOf(id);
  console.log(index);
  arr_storage.splice(index,1);
  localStorage["id"] = arr_storage
  location.reload()

}
function showFav(movie){
    console.log(movie.title,"title")
//     movie_div.innerHTML = movies.results.map((movie=>{
//         const {title , poster_path,vote_average,id} = movie;
        
//         let color = addColor(vote_average);
//       //   showModal(id);
//       // showMovieOnModal(id);
//       let temp = 
//       ` <div class="col-md-3 col-6" id=${id}>
//      <div class="overlay"></div>
//      <div class="card my-5" >
//        <img src="${base_img}${poster_path}" class="card-img-top img-fluid img-card" alt="..." onerror="this.src='https://image.tmdb.org/t/p/w500//1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'" >
//        <div class="card-body row">
//          <h5 class="card-title col-9">${title}</h5>
//          <div class=" rate border border-${color} text-white bg-${color} rounded position-absolute">${vote_average}</div>
//          <button id=${id} class="add-favorite"><i class="fas fa-heart"></i></button>
//          <button id=${id} "type="button" class="btn btn-primary btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal" 
//          ">
//       Launch demo modal
//     </button>
    
//        </div>
//      </div>
     
//    </div>`
    
//    return temp;
//     })).join("")
//  for(let i = 0 ; i<arr_storage.length ; i++){
  
   let div = document.createElement("div");
    div.innerHTMl += `<div class="col-md-3 col-6">
   <div class="card my-5" >
     <img src="	https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg" class="card-img-top" alt="...">
     <div class="card-body row ">
       <h5 class="card-title col-9 ">${movie.title}</h5>
       <div class=" rate border border-success text-white bg-success rounded position-absolute"> 9.9</div>
       <div class="col-3"><button><i class="fas fa-heart"></i></button></div>
     </div>
   </div>
 </div>`
 console.log(div,"for")
// favorite_div.innerHTML +=`
// <div class="col-md-3 col-6">
//     <div class="card my-5" >
//       <img src="	https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg" class="card-img-top" alt="...">
//       <div class="card-body row ">
//         <h5 class="card-title col-9 ">${movie.title}</h5>
//         <div class=" rate border border-success text-white bg-success rounded position-absolute"> 9.9</div>
//         <div class="col-3"><button><i class="fas fa-heart"></i></button></div>
//       </div>
//     </div>
//   </div>`
//  }
// favorite_div.appendChild(div)

}
getFavoriteMovie();
}