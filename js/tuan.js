function search(res) {

  let se = $('.search');

  let ul = $('<ul></ul>');

  se.append(ul);
  // 搜索内容时，获取当前创建的ul元素的兄弟元素ul给移出
  ul.siblings('ul').remove()


  $(res).each((index, item) => {
    let li = $('<li></li>');
    let a = $('<a></a>');

    a.html(item.editorWord);
    li.append(a);
    ul.append(li);

  })

  ul.css({
    display: 'block',
    position: 'absolute',
    top: 65,
    left: 400,
    backgroundColor: '#fff',
    width: 605
  });
}

function liBtn() {
  let a = $('.search li a');
  a.click(function () {
    let text = $(this).text();
    search();
    $(this).attr('href', `https://bj.meituan.com/s/${text}`);
  })

}

function diany(data, num) {
  let swi = $('.gallery-dianTop .swiper-wrapper');
  let str2 = '';

  data.each((index, item) => {
    // console.log(item);
    num++;
    str2 += `  <div class="swiper-slide">
      <a href=""><video src="${item.videourl}" muted controls poster='../img/2-${num}.jpg'></video></a>
<div class='gz'><p>观众评 <i>${item.mk}</i></p>
<div>${item.nm}</div><span>购票</span>
</div>
  </div>
  `;

  });

  swi.html(str2);
}

function diany1(data, num) {
  let swi = $('.gallery-dianTop .swiper-wrapper');
  let str2 = '';

  data.each((index, item) => {
    console.log(item);
    num++;
    str2 += `  <div class="swiper-slide">
      <a href="">
      <video src="${item.videourl}" muted controls poster='../img/2-${num}.jpg'></video>
      </a>
<div class='gz'>
<p><i>${item.wish}</i> 人想看</p>
<div>${item.nm}</div>
</div>
  </div>
  `;

  });

  swi.html(str2);
}

function zhushu(url, th) {
  let str66='';
  let id=0;
  let san=document.querySelector('.main .zhuShu .zhu a .san');
  let zhu1 = $('.main .zhuShu .zhu a div');
let zhu = $('.main .zhuShu .shu');
  zhu1.css('display', 'none');
  if(th[0]==san){
    th.css('display', 'block');
  }else{
    th.find('div').css('display', 'block');
  }
    
  $.ajax({
    url: url,
    type: 'get',
    success: function (res) {
      console.log(res);
      $(res.productList).each(function (index, item) {
        id++;
        str66+= `  <div class="b">
              <a href="./zhuShu.html?id=${id}">
             
                  <img src="${item.coverImage}"
                      alt="" class='img2'>   
                      <img src="${item.hostAvatarUrl}"
                      alt="" class="img1">     
          <p>${item.title}</p>
          <span>整套${item.layoutRoom}居室·可住${item.maxGuestNumber}人 | ${item.locationArea}</span>
          <div>￥${item.price}</div>
          </a>
          </ul>
       </div>`;
      }); 
  zhu.html(str66); 
    }

  });
  
  
}

function meishi(data){
  let num=0;
  let shi=$('.main .meiShi .shi');
  let str='';
 data.each((index,item)=>{
  num++;
     str+=`<a href="">
  <img src="../img/3-${num}.jpg"
      alt="">
  <div>
      <p>${item.title}</p>
      <span><i>${item.score}</i>星</span>
      <span>${item.commentNum}个评价</span>
      <div class="yu">${item.areaName}</div>
      <div class="qi">￥<i>${item.lowPrice}</i>起</div>

  </div>
</a>`;
 });
shi.html(str);
}