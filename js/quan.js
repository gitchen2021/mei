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
    top: 88,
    left: 400,
    backgroundColor: '#fff',
    width: 605
  });


}
// 点击搜索内容的a时，设置跳转链接
function liBtn() {
  let a = $('.search li a');
  a.click(function () {
    let text = $(this).text();
    search();
    $(this).attr('href', `https://bj.meituan.com/s/${text}`);
  })

}
// 设计省份选择中的省份的li的创建和点击时获取的内容
function diMing(data) {
  data.each((index, item) => {
    let text1 = $('.xuanze .text1');
    let li = $('<li></li>');
    let a = $('<a></a>');
    a.text(item.provinceName)
    li.append(a);
    text1.append(li);

  });

  let sheng = $('.xuanze .sheng');
  let li = $('.xuanze .text1 li');
  li.click(function () {
    sheng.text($(this).text());
    let res = $(this);
    let idx = res.index();
    shiMing(data, idx);
  });
}

// 市名的渲染和点击市名时跳转链接
function shiMing(res, index) {
  let ll = $('.xuanze .text2 li');
  // 将上次生成的市名移除
  ll.remove();
  let str = res[index - 1].cityInfoList;
  $(str).each((index, item) => {

    let text2 = $('.xuanze .text2');
    let li = $('<li></li>');
    let a = $('<a></a>');
    a.text(item.name)
    li.append(a);
    text2.append(li);
    let sheng = $('.xuanze .cheng');

    a.click(function () {

      sheng.text($(this).text());
      $(this).attr('href', `https://${item.acronym}.meituan.com/`);

    })

  });
}

function Ping(data) {
  let text = document.querySelector('.suoText');
  let xuanze = $('.xuanze');
  text.oninput = function () {
    //  移除前面生成的ul，避免生成多个ul
    $('.sou1').remove()
    let suoText = $('.suoText');
    let ul = $('<ul class="sou1"></ul>');
    data.each((index, item) => {

      //如果输入框的内容为小写拼音，则转为大写
      $(item.cityInfoList).each((idx, item1) => {

        if (suoText.val().toUpperCase() == item1.firstChar) {
          let li = $('<li></li>');
          let a = $('<a></a>');
          a.text(item1.name);
          li.append(a);
          ul.append(li);
          a.css('color', '#000')
          a.click(function () {
            $(this).attr('href', `https://${item1.acronym}.meituan.com/`)
          })
        }
        if (suoText.val() == item1.name.substr(0, suoText.val().length)) {
          let li = $('<li></li>');
          let a = $('<a></a>');
          a.text(item1.name);
          li.append(a);
          ul.append(li);
          a.css('color', '#000')
          a.click(function () {
            $(this).attr('href', `https://${item1.acronym}.meituan.com/`)
          });
        }

      })
    });
    xuanze.append(ul);
    ul.css({
      position: 'absolute',
      top: 70,
      left: 633,
      width: 150,
      height: 200,
      backgroundColor: '#fff',
      zIndex: 10
    })

    $('html').click(function () {
      ul.css('display', 'none');
    })
  }
}

function rand(data, span) {
  
  let mm=$(`.city .${span.text()}`);
  let arr=[];
  let ul = $('<ul></ul>');

  data.each((index, item) => {
    let c = $(item.cityInfoList);
    c.each((idx, item1) => {
      if (item1.firstChar == span.text()) {
// 将与span的内容相同的数据添加到数组arr中
      arr.push(item1) ;
      }   
    });
  });
  // 通过数组与对象的sort排序的方法按id由小到大排序
    arr=arr.sort(function(a,b){
  return a.id-b.id
});
// 遍历排序后的数组
arr.forEach((it)=>{
  let li=$('<li></li>');
  let a=$('<a></a>');
  a.text(it.name);
  li.append(a);
  ul.append(li);
  a.click(function(){
 $(this).attr('href',`./tuan.html?acronym=${it.acronym}`);
  })
});

mm.append(ul);
ul.hover(function(){
  ul.css('background','#fbfbfb');
},function(){
  ul.css('background','#fff');
});
}