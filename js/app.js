(function(){
  "use strict";
  // ---- CTA: "Solicitar análise gratuita" → WhatsApp (número placeholder — trocar pelo real) ----
  var WA = "5511999999999"; // TODO: WhatsApp comercial real da Sucesso em Vendas
  var MSG = "Olá! Quero solicitar a análise comercial gratuita da minha operação.";
  document.querySelectorAll("[data-cta]").forEach(function(a){
    a.setAttribute("href","https://wa.me/"+WA+"?text="+encodeURIComponent(a.getAttribute("data-msg")||MSG));
    a.setAttribute("target","_blank"); a.setAttribute("rel","noopener");
  });
  // ---- Mobile menu ----
  var mob=document.getElementById("mob"), burger=document.querySelector(".burger");
  if(burger&&mob){
    burger.addEventListener("click",function(){
      var isOpen = !mob.classList.contains("open");
      mob.classList.toggle("open");
      mob.setAttribute("aria-hidden", isOpen?"false":"true");
      burger.setAttribute("aria-expanded", isOpen?"true":"false");
    });
    mob.querySelectorAll("[data-close],a").forEach(function(el){
      el.addEventListener("click",function(){
        mob.classList.remove("open");
        mob.setAttribute("aria-hidden","true");
        burger.setAttribute("aria-expanded","false");
      });
    });
  }
  // ---- FAQ accordion ----
  document.querySelectorAll(".faq-q").forEach(function(q){
    q.addEventListener("click",function(){
      var item=q.parentElement, a=item.querySelector(".faq-a");
      var open=item.classList.toggle("open");
      a.style.maxHeight = open ? (a.scrollHeight+"px") : "0";
      q.setAttribute("aria-expanded", open?"true":"false");
    });
  });
  // ---- Reveal on scroll (fallback: sem IO tudo visível) ----
  if(!("IntersectionObserver" in window)){
    document.querySelectorAll("[data-rev]").forEach(function(el){el.classList.add("in");});
  } else {
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
    document.querySelectorAll("[data-rev]").forEach(function(el){io.observe(el);});
  }
  // ---- Header hide on scroll down ----
  var hd=document.querySelector(".site-header"), last=0;
  window.addEventListener("scroll",function(){var y=pageYOffset; hd.style.transform=(y>last&&y>300)?"translateY(-100%)":"translateY(0)"; hd.style.transition="transform .35s ease"; last=y;},{passive:true});
})();
