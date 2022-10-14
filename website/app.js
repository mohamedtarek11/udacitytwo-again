let d = new Date();
let newDate = d.toDateString();
 const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
 const apiKey=",&appid=478fd5fab13a7bcbeda796a67ea4a3ca&units=metric"
let zip = document.getElementById("zip")
const feelings = document.getElementById("feelings")
let generate=document.getElementById("generate")
generate.onclick = function () { 
  let zipvalue=parseInt( zip.value);
  let feelingval=feelings.value;
  let isNum = /^\d+$/.test(zipvalue);
  if(zipvalue== "" || isNum==false){
    console.log("please enter value");
  }else{
    fetchdata(baseURL,zipvalue,apiKey).then((data)=>
    postdata({
     data:newDate,
     temp:data.main.temp,
     feelings: feelingval
    }).then(()=>updataui()) ) 
  }
      
};
//Function to GET Web API Data
async function fetchdata (api,zip,Key){
  let resp=await fetch(`${api}${zip}${Key}`);
  // console.log(resp)
  try{
    const finaldata=await resp.json()
    console.log(finaldata);
    console.log("fff///////////////////////////////////////////////");
    return finaldata
  }catch(error){
console.log(error);
  }
}


async function postdata (data={}){
let posted = await fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json",  },
      body: JSON.stringify(data)

    });

    try{
      let responsedldata=await posted.json()
      console.log(responsedldata);
      return responsedldata
    }catch(error){
  console.log(error);
    }
}

async function updataui (){
  let request =await fetch("/all");
  try{
   const response=await request.json();
  console.log(response)
 document.getElementById("date").innerHTML =response.data
 document.getElementById("tagtemp").innerHTML = response.temp;
 document.getElementById("feeling").innerHTML = response.feelings;
  }catch(error){
    console.log(error);
  }
}
