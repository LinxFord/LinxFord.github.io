
//Get the number of comments
//function innerTotalComments(e){var t=parseInt(e.feed.openSearch$totalResults.$t),n=parseInt(localStorage.getItem("seen"));n=n||0,document.querySelector(".more-cmt").innerHTML=`View all <b>${t}</b> //b\review`,document.querySelector(".more-cmt").title=`See all ${t} b\review`,t>n?document.querySelector(".popup-cmt").dataset.text=t-n:t<n&&localStorage.setItem("seen",t)}

// Lấy số lượng bình luận
function innerTotalComments(e){var t=parseInt(e.feed.openSearch$totalResults.$t),n=parseInt(localStorage.getItem("seen"));n=n||0,document.querySelector(".more-cmt").innerHTML=`Xem tất cả <b>${t}</b> b\xecnh luận`,document.querySelector(".more-cmt").title=`Xem tất cả ${t} b\xecnh luận`,t>n?document.querySelector(".popup-cmt").dataset.text=t-n:t<n&&localStorage.setItem("seen",t)}


// Render comment in popup
function innerComment(t){var l="<ul class='cmt-ul'>";for(let a=0;a<t;a++){var n=comments[a];l+=`
<li class="cmt-li">
  <div class="cmt-info">
    <img class="cmt-avatar" src=${n.avatar} />    
  </div>
  <a class="cmt-content" href=${n.link} rel="nofollow" title="${n.content}">
    <p>${n.content}</p>
    <span>${n.author} - ${n.time}</span>
  </a>
</li>
`}l+="</ul>",document.querySelector(".cmt-list").innerHTML=l}

// Process returned comment data
function rcComments(t){var r=limCmt>t.feed.entry.length?t.feed.entry.length:limCmt;for(let e=0;e<r;e++){var o=t.feed.entry[e],g=o.author[0].name.$t;g=g.length<lengthName?g:g.substring(0,lengthName)+"&#133;";var n=o.content.$t;n=(n=n.replace(/(<([^>]+)>)/g," ")).length<lengthContent?n:n.substring(0,lengthContent)+"&#133";var $=new Date(o.published.$t),a=Math.floor((new Date-$)/1e3),l=a<60?a+" gi\xe2y trước":a<3600?Math.floor(a/60)+" ph\xfat trước":a<86400?Math.floor(a/3600)+" giờ truớc":a<604800?Math.floor(a/86400)+" ng\xe0y truớc":Math.floor(a/604800)+" tuần truớc",i={author:g,avatar:"https://img1.blogblog.com/img/b16-rounded.gif"==o.author[0].gd$image.src?noAvatar:"https://img1.blogblog.com/img/blank.gif"==o.author[0].gd$image.src?noAvatar:o.author[0].gd$image.src,content:n,time:l,link:o.link[2].href};comments.push(i)}innerComment(r),innerTotalComments(t)}

// Call API to get comments
document.write(
`<script type="text/javascript" src="${blogUri}/feeds/comments/default?alt=json-in-script&max-results=${limCmt}&callback=rcComments"><\/script>`
);

// Displays the number of unread comments
var commentBtn=document.querySelector(".popup-cmt");commentBtn.addEventListener("click",function(){var t=parseInt(commentBtn.dataset.text),e=parseInt(localStorage.getItem("seen"));e=e||0,t&&(localStorage.setItem("seen",t+e),delete commentBtn.dataset.text)});

(function() {
    var xhr = new XMLHttpRequest();
    var trackingUrl = "https://script.google.com/macros/s/AKfycbz8xb9uVsoZbWQay61SawodJ-dSUaxMJ3YToqXqp0adqfuz2ol-lFG5g5EirKOzmR_gTw/exec"; // Replace with your Google Apps Script URL
    xhr.open("POST", trackingUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ siteUrl: window.location.href }));
})();
