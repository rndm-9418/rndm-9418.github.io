function getQuote(){var a=quotesList.length,b=Math.floor(Math.random()*(a-1-0+1))+0,c=quotesList[b].text,d=quotesList[b].author,e=document.createElement("div");e.classList.add("quote");var f=document.createElement("p");f.classList.add("quote__text"),f.textContent=c;var g=document.createElement("h3");g.classList.add("quote__author"),g.textContent=d,e.appendChild(f),e.appendChild(g),quotes.appendChild(e),setTimeout(function(){e.classList.add("js-show")},100)}var button=document.querySelector(".js-button"),quotes=document.querySelector(".js-quotes");getQuote(),button.onclick=function(a){a.preventDefault(),quotes.children[0].classList.remove("js-show"),quotes.children[0].classList.add("js-hide"),setTimeout(function(){quotes.innerHTML="",getQuote()},1e3)};