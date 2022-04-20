
import * as main from "./app.js"
import * as config from "./config.js"
const searchable = [
    "php","css","html","Javascript","java","coding","some other item","how to code"
]

const searchInput = document.querySelector("#search");
const searchWrapper = document.querySelector(".wrapper");
const resultsWrapper =  document.querySelector(".results")
const searchBtn = document.querySelector("#btn-search")

async function searchByName(movieName){
   let temp ;
   const response = await axios.get(config.base_url+`/search/movie?${config.api_key}&query=${movieName}`)
   
   return response.data.results

//    await axios.get(config.base_url+`/search/movie?${config.api_key}&query=${movieName}`).then(res=>{
//         console.log(res.data.results,"search auto")
//         titles = res.data.result
//         showMovies(res.data)
//     }).catch(err=>{
//     //     console.log(err,"ser")
//     //     console.log("zero")
//     //     let div = document.createElement("div");
//     //     let text = document.createTextNode("no result")
//     //     div.appendChild(text);
//     // //    div.style.color = "white"
//     //     movie_div.innerHTML = `div`
//     })
}



let results = [];
searchInput.addEventListener("keyup",(event)=>{
    let arr = searchByName(searchInput.value)
arr.then(res=>{
    
    let inputVal = searchInput.value;
   
    if(inputVal.length){
        results = res.filter((item)=>{
            
           
            return item.title.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())
        })
    }
    console.log(results,"results")
    renderResults(results)

    if (event.keyCode === 13){
        
        searchBtn.click()
        
        console.log("yes")
    }
}).catch(err=>{
    searchWrapper.classList.remove("show")
    console.log(err,"err")
})

    // let inputVal = searchInput.value;
   
    // if(inputVal.length){
    //     results = searchable.filter((item)=>{
    //         return item.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())
    //     })
    // }
    // console.log(results,"results")
    // renderResults(results)

    // if (event.keyCode === 13){
        
    //     searchBtn.click()
        
    //     console.log("yes")
    // }
})

function renderResults(results){
    resultsWrapper.innerHTML = ""
    if(!results.length || !searchInput.value.length){
        
      return  searchWrapper.classList.remove("show");
    }
   
    let ul = document.createElement("ul")
    console.log(results,"map")
        results.map((item,i)=>{
            
        // return `<li>${item}</li>`
        if(i <=5){
        let li = document.createElement("li");
        li.classList.add("item")
         li.textContent = item.title 
         ul.appendChild(li);
         return ul;
        }
    }).join("");

    searchWrapper.classList.add("show");
   
  
    // resultsWrapper . innerHTML = `<ul>${content}</ul>`
    resultsWrapper.appendChild(ul)

    // console.log(content)
    // console.log("-------")

    clickEvent()

}

function clickEvent(){
    const result = document.querySelectorAll(".results ul li")
    // console.log(result,"result")
   for(let element of result){
       element.addEventListener("click",(event)=>{
           console.log(event.target,"target")
         searchInput.value = event.target.textContent
         searchWrapper.classList.remove("show")
         searchInput.focus()
       })
   }
   
}

searchBtn.addEventListener("click",(event)=>{
    // const output = document.querySelector(".output");
    // output.innerHTML=searchInput.value
    searchInput.value = ""
    searchWrapper.classList.remove("show");
   
})

document.body.addEventListener("click",(event)=>{
    console.log(event.target.tagName.toLowerCase(),"tagname")
    if(event.target.tagName.toLowerCase() != "li" && !event.target.classList.contains("item")  ){
        console.log("yess")
        searchWrapper.classList.remove("show");
        resultsWrapper.innerHTML = "";
        
           
    }
})