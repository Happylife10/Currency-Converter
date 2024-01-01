const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const selectBoxes = document.querySelectorAll(".opt-select");
const selectBox = document.querySelector("select");
const mybtn = document.querySelector(".btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let ind=0; ind<selectBoxes.length; ind++)
{
    for(countryCode in countryList)
    {
        let opt=document.createElement("option");
        opt.value=countryCode;
        opt.innerText=countryCode;
        if(countryCode==="USD" && ind===0) opt.selected="selected";
        if(countryCode==="INR" && ind===1) opt.selected="selected";
        selectBoxes[ind].append(opt);
    }
    selectBoxes[ind].addEventListener("change", (evt)=>{
        updateFlag(evt.target);
        // console.log(evt);
    })
}
const updateFlag=(element) =>{
    let countryCode=countryList[element.value];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    
} 
mybtn.addEventListener("click", (evt)=>{
    calculateRate();
})
const calculateRate= async()=>{
    
        let amt = document.querySelector(".amount input");
        let amtVal=amt.value;
        if(amtVal==="" || amtVal<1) amtVal=1;
        // console.log(fromCurr.value.toLowerCase(),toCurr.value);
        const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
        let response= await fetch(url);
        let data =await response.json();
        let rate= data[toCurr.value.toLowerCase()];
        msg.innerText=`${amtVal} ${fromCurr.value} = ${amtVal*rate} ${toCurr.value}`;
        
    
}

window.addEventListener("load", ()=>{
    
      calculateRate();  
    
})
