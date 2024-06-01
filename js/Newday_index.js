var time = new Date();

var currentDateString = time.toLocaleString().split(" ")[0];

var currrentDateSplitArr = currentDateString.split("/");

var formMate = ["年", "月", "日"];

var currentDate = "";

for (var i = 0; i < currrentDateSplitArr.length; i++) {
  currentDate += currrentDateSplitArr[i] + formMate[i];
}

var currentDateElement = document.querySelector("#currentDate");
var timeHsElement = document.querySelector("#timeHs");

currentDateElement.innerHTML = currentDate;

var currentMinutes = time.getMinutes();

timeHsElement.innerHTML =
  time.getHours() +
  ":" +
  (currentMinutes < 10 ? "0" + currentMinutes : currentMinutes);

setInterval(() => {
  time = new Date();
  currentMinutes = time.getMinutes();
  timeHsElement.innerHTML =
    time.getHours() +
    ":" +
    (currentMinutes < 10 ? "0" + currentMinutes : currentMinutes);
}, 1000);

var week = [
  {
    weekNum: 0,
    weekString: "日曜日",
  },
  {
    weekNum: 1,
    weekString: "月曜日",
  },
  {
    weekNum: 2,
    weekString: "火曜日",
  },
  {
    weekNum: 3,
    weekString: "水曜日",
  },
  {
    weekNum: 4,
    weekString: "木曜日",
  },
  {
    weekNum: 5,
    weekString: "金曜日",
  },
  {
    weekNum: 6,
    weekString: "土曜日",
  },
];

var currentWeek = time.getDay();

var timeWeek = document.querySelector("#timeWeek");

for (var i = 0; i < week.length; i++) {
  if (currentWeek === week[i].weekNum) timeWeek.innerHTML = week[i].weekString;
}

// let hashSearch = location.hash && location.hash.split('#')[1]
const date = new Date();
//获取页面传递参数 调用日期函数
let year = date.getFullYear();
let get_mon = Number(getQueryVariable("mon")) - 1;
var month = 1;
//判断是否从index 页面传参过来
if (get_mon > -1) {
  month = get_mon;
} else {
  // let month = hashSearch || date.getMonth()
  month = date.getMonth();
  init_caledar(year, month);
}

//接受参数跳转
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
//传入参数大于 -1 执行
if (get_mon > -1) {
  init_caledar(year, get_mon);
}

// 初始化日历
function init_caledar(currentYear, currentMonth) {
  // 年历 (令和四年)
  const _calendar = document.querySelector("#_calendar");
  // this.currentMonth = currentMonth.replace('"', "").replace('"', "");
  const calendar_table = document.querySelector("#calendar_table");
  const timeMonth = document.querySelector("#timeMonth");
  const dayIntroduced = document.querySelector("#dayIntroduced");
  const dayIntroduced_top = dayIntroduced.querySelector(".dayIntroduced__top");
  const dayIntroduced_bottom = dayIntroduced.querySelector(
    ".dayIntroduced__bottom"
  );

  const currentMonthEl = document.querySelector("#currentMonth");

  //
  _calendar.innerHTML = calendarTransform(currentYear);

  // console.log("当前月份:" + currentMonth);

  currentMonthEl.innerHTML = currentMonth + 1 + "月";
  calendar_table.innerHTML = "";

  // 获取月份数据
  let caledar_data = get_caledar_data(currentMonth + 1);

  if (currentMonth + 1 === 6) {
    document.querySelector("#solarTerm").style.display = "none";
  } else if (currentMonth + 1 === 12) {
    document.querySelector("#holiday").style.display = "none";
  } else {
    document.querySelector("#solarTerm").style.display = "block";
    document.querySelector("#holiday").style.display = "block";
  }

  // 跳转锚点
  let linkAnchor = [
    "one_month",
    "two_month",
    "three_month",
    "four_month",
    "five_month",
    "six_month",
    "seven_month",
    "eight_month",
    "nine_month",
    "ten_month",
    "eleven_month",
    "twe_month",
  ];

  // 设置跳转链接
  timeMonth.querySelector("a").href = "./Note.html#" + linkAnchor[currentMonth];

  // 设置月份单词
  timeMonth.querySelector(".time__month--current").innerHTML =
    caledar_data.word;

  // 设置月份的动画背景图标
  timeMonth.querySelector("#move_bg").src = caledar_data.move_bg;

  //设置月份的动画类型
  timeMonth.querySelector(".time__bg").style.animation = caledar_data.animation;
  // 设置月份的译语
  timeMonth.querySelector(".time__month--info").innerHTML =
    caledar_data.translation;

  // 设置顶部信息
  for (let i = 0; i < dayIntroduced_top.children.length; i++) {
    // zr_bg

    if (i === 0) {
      dayIntroduced_top.children[i]
        .querySelector(".dayIntroduced__item__title")
        .querySelector("#zr_bg img").src =
        caledar_data.month_info.top[i].title_bg;
    }

    dayIntroduced_top.children[i]
      .querySelector(".dayIntroduced__item__title")
      .querySelector(
        "p"
      ).innerHTML = `<p>${caledar_data.month_info.top[i].title}</p>`;

    const item_children = dayIntroduced_top.children[i].querySelector(
      ".dayIntroduced__item__list"
    );
    item_children.innerHTML = "";
    for (let j = 0; j < caledar_data.month_info.top[i].item.length; j++) {
      const dayIntroduced__list__item = document.createElement("div");
      dayIntroduced__list__item.classList.add("dayIntroduced__list__item");
      dayIntroduced__list__item.innerHTML = `
      <div class="dayIntroduced__list__item">
      <div class="solar_term">
        <span>${caledar_data.month_info.top[i].item[j].key}</span>
      </div>
      <div class="solar_term_date">
        <span>${caledar_data.month_info.top[i].item[j].value}</span>
      </div>
      `;
      item_children.appendChild(dayIntroduced__list__item);
    }
  }

  // 设置底部信息
  dayIntroduced_bottom.innerHTML = "";
  for (let i = 0; i < caledar_data.month_info.bottom.length; i++) {
    let itemNode = document.createElement("div");
    itemNode.classList.add("dayIntroduced__item");
    itemNode.innerHTML = `
      <div class="dayIntroduced__item__title">
        <p>${caledar_data.month_info.bottom[i].title}</p>
      </div>
    `;
    let itemListNode = document.createElement("div");
    itemListNode.classList.add("dayIntroduced__item__list");

    for (let item of caledar_data.month_info.bottom[i].item) {
      let listItemNode = document.createElement("div");
      listItemNode.classList.add("dayIntroduced__list__item");
      if (item.value) {
        listItemNode.innerHTML = `
        <div class="solar_term">
          <span>${item.key}</span>
        </div>
        <div class="solar_term_date">
          <span>${item.value}</span>
        </div>
        `;
      } else {
        listItemNode.innerHTML = `
        <div class="solar_term">
          <span>${item.key}</span>
        </div>
        `;
      }
      itemListNode.append(listItemNode);
    }

    itemNode.append(itemListNode);
    dayIntroduced_bottom.append(itemNode);
  }

  let date = new Date(currentYear, currentMonth, 1);
  // 第一天wekk
  date.setDate(1);
  let week_first = date.getDay();
  week_first = week_first === 0 ? 7 : week_first;
  // 当前月份最后一天
  let day_laster = new Date(currentYear, currentMonth + 1, 0).getDate();
  // 上个月最后一天
  let prevMonth_laster = new Date(currentYear, currentMonth, 0).getDate();
  // 日历表格中的数字
  let table_day = prevMonth_laster - (week_first - 1);
  // console.log(table_day);
  let flag = false;

  // 循环生成日历
  for (let i = 0; i < 6; i++) {
    const tr_node = document.createElement("tr");
    tr_node.setAttribute("valign", "top");
    // 设置表格主题颜色 ， 应用 css 变量
    tr_node.style.setProperty("--theme-color", caledar_data.table_theme[i]);

    for (let j = 1; j <= 7; j++, table_day++) {
      const td_node = document.createElement("td");

      // week_first === (j - 1) 第一天是周日，week_first === j 第一天是周一
      if (
        (week_first === j - 1 && i === 0) ||
        (table_day > day_laster && i > 0)
      ) {
        table_day = 1;
        flag = !flag;
      }

      if (flag) {
        // 设置当前月份日期，添加背景色高亮
        td_node.classList.add("currentDate");
        let lunar = calendar.solar2lunar(
          currentYear,
          currentMonth + 1,
          table_day
        );

        // 祝日
        let title_bg = caledar_data.month_info.top[0].title_bg;

        for (let z = 0; z < caledar_data.month_info.top[0].item.length; z++) {
          let str = caledar_data.month_info.top[0].item[z].key;
          // 假日
          let date = str.match(/\d+日/)[0].split("日")[0];
          if (table_day == date) {
            // 设置节假日图片
            td_node.style.backgroundImage = `url(${title_bg})`;
            td_node.style.backgroundSize = "auto 2rem";
            break;
          }
        }

        // 新月
        if (lunar.lDay === 1) {
          td_node.classList.add("new_moon");
        }

        // 上弦月
        if (lunar.lDay === 7) {
          td_node.classList.add("half_moon");
        }

        // 满月
        if (lunar.lDay === 15) {
          td_node.classList.add("full_moon");
        }

        // 下弦月
        if (lunar.lDay === 23) {
          td_node.classList.add("waning_moon");
        }
      }

      td_node.innerHTML = table_day;
      tr_node.appendChild(td_node);
    }
    calendar_table.appendChild(tr_node);
  }
}
// if (hashSearch) {
//     init_caledar(year, parseInt(hashSearch))
// } else {
//     init_caledar(year, month)
// }

// 根据当前月份获取数据对象
function get_caledar_data(month) {
  switch (month) {
    case 1:
      return calerdar_theme.Jan;
    case 2:
      return calerdar_theme.Feb;
    case 3:
      return calerdar_theme.Mar;
    case 4:
      return calerdar_theme.Apr;
    case 5:
      return calerdar_theme.May;
    case 6:
      return calerdar_theme.June;
    case 7:
      return calerdar_theme.July;
    case 8:
      return calerdar_theme.Aug;
    case 9:
      return calerdar_theme.Sep;
    case 10:
      return calerdar_theme.Oct;
    case 11:
      return calerdar_theme.Nov;
    case 12:
      return calerdar_theme.Dec;
    default:
      return calerdar_theme.Jan;
  }
}

const prev = document.querySelector("#prev");
const prevMonth = document.querySelector("#prevMonth");
const next = document.querySelector("#next");
const nextMonth = document.querySelector("#nextMonth");
const container = document.querySelector("#container");

//判断传入参数是否大于-1
let prev_month = get_mon > -1 ? get_mon : date.getMonth();
if (prev_month == 0) prev_month = 12;
console.log("prev_month:" + prev_month);
let next_month = get_mon > -1 ? get_mon + 2 : date.getMonth() + 2;
if (next_month > 12) next_month = 1;
console.log("next_month:" + next_month);
// 渲染上一个月 下一个月 月份的按钮.
prevMonth.innerHTML = prev_month;
nextMonth.innerHTML = next_month;

prev.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log("prev_month:" + prev_month);
  if (prevMonth.innerHTML == 12) {
    month = 12;
    year = --year;
  }
  if (prev_month === 1) {
    --prev_month;
    prevMonth.innerHTML = prev_month = 12;
    nextMonth.innerHTML = --next_month;
  } else {
    prevMonth.innerHTML = --prev_month;
    nextMonth.innerHTML = --next_month < 1 ? (next_month = 12) : next_month;
  }
  init_caledar(year, --month);
});

next.addEventListener("click", function (e) {
  e.preventDefault();
  if (nextMonth.innerHTML == 1) {
    month = -1;
    year = ++year;
    // return
  }

  if (next_month === 12) {
    ++next_month;
    prevMonth.innerHTML = ++prev_month;
    nextMonth.innerHTML = next_month = 1;
  } else {
    prevMonth.innerHTML = ++prev_month > 12 ? (prev_month = 1) : prev_month;
    nextMonth.innerHTML = ++next_month;
  }

  init_caledar(year, ++month);
});

// 中文转数字
function ChineseToNumber(chnStr) {
  var rtn = 0;
  var section = 0;
  var number = 0;
  var secUnit = false;
  var str = chnStr.split("");

  for (var i = 0; i < str.length; i++) {
    var num = chnNumChar[str[i]];
    if (typeof num !== "undefined") {
      number = num;
      if (i === str.length - 1) {
        section += number;
      }
    } else {
      var unit = chnNameValue[str[i]].value;
      secUnit = chnNameValue[str[i]].secUnit;
      if (secUnit) {
        section = (section + number) * unit;
        rtn += section;
        section = 0;
      } else {
        section += number * unit;
      }
      number = 0;
    }
  }
  return rtn + section;
}

// 转为 年历
function calendarTransform(year) {
  switch (year) {
    case 2019:
      return "令和一年";
    case 2020:
      return "令和二年";
    case 2021:
      return "令和三年";
    case 2022:
      return "令和四年";
    case 2023:
      return "令和五年";
    case 2024:
      return "令和六年";
    case 2025:
      return "令和七年";
    case 2026:
      return "令和八年";
    case 2027:
      return "令和九年";
    case 2028:
      return "令和十年";
    case 2029:
      return "令和十一年";
    case 2030:
      return "令和十二年";
    case 2031:
      return "令和十三年";
  }
}
