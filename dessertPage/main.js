
//wordEffect
let hOneWordSpan=document.querySelectorAll('#hOneWord span');


hOneWordSpan.forEach((v)=>{
    addWordStyle(v.innerText,v);
})
    
// let trimWords= words.replace(/ /g,"");


function addWordStyle(word,element){
   let newWords= [...word].map((v)=>{
        return `<span>${v}</span>`
    }).join("");
    
    element.innerHTML=newWords;

    let creatSpan=element.querySelectorAll('span');

    creatSpan.forEach((v)=>{
        v.className=`test01`;
    })
}

// iconImg
let iconAreaImg=document.querySelectorAll('#iconArea img');

window.addEventListener('scroll',function(){
      if(this.scrollY >= 300){
            iconAreaImg.forEach((v=>{
                    // v.classList.remove('test');
                    v.classList.add('iconImgEf')
            }))
      }
})







