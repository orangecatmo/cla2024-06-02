// 滚动显示 上下箭头
// $(function () {
//   var p = 0, t = 0
//   $(window).on('scroll', function (e) {
//     p = $(this).scrollTop()
//     if (t <= p) {
//       $('#scroll_up').removeClass('scroll_show')
//       $('#scroll_down').addClass('scroll_show')
//       // 1s 后移除 显示
//       setTimeout(() => {
//         $('#scroll_down').removeClass('scroll_show')
//       }, 1000)
//     } else {
//       $('#scroll_down').removeClass('scroll_show')
//       $('#scroll_up').addClass('scroll_show')
//       // 1s 后移除 显示
//       setTimeout(() => {
//         $('#scroll_up').removeClass('scroll_show')
//       }, 1000)
//     }
//     t = p;
//   })
// })

$(function () {
  $("#scroll_down").click(scrollMove.bind(window, "down"));

  $("#scroll_up").click(scrollMove.bind(window, "up"));
  // 滚动
  function scrollMove(option) {
    let e = this.event;
    // 每次移动高度
    let moveRang = 100;
    e.preventDefault();
    let speed = $(window).scrollTop();
    if (option === "up") {
      speed -= moveRang;
    } else if (option === "down") {
      speed += moveRang;
    }
    $(window).scrollTop(speed);
  }
});

$(function () {
  // 获取按钮元素
  const backToTopBtn = document.getElementById("backToTopBtn");

  // 当用户向下滚动20px时，显示按钮
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  // 当点击按钮时，滚动到页面顶部
  backToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
});
