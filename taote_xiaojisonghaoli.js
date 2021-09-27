/*
界面中的按钮
不含文字：领饲料，登录领现金，收下去喂鸡，每日免费领饲料，去浏览，去下单，可领,明天再来，去喂养
含文字：直接领取，去完成,明日可领，点击签到，已签, 浏览任务, 饲料不足, 免费换商品
*/

function btn_position_click(x) {
  let a = click(x.bounds().centerX(), x.bounds().centerY());
  if (a) return true;
}
function text_search(x) {
  let a = textContains(x).findOne(20000);
  if (a != null) {
    let b = btn_position_click(a);
    return b;
  } else {
    toastLog("没找到");
    return false;
  }
};
function meirilingqu() {
  let str = "每日免费领饲料"
  let errtimes = 0;//出错3次就结束重试
  let err = 0;
  top:
  for (err; err < 3; err++) {
    let b = textContains(str).findOne(2000);
    for (let ii = 0; ii < 6; ii++) {
      if (!b) break;
      b = b.parent();
      let text1 = false;
      b.children()
        .forEach(
          function (child) {
            //toastLog(child.text());
            text1 = child.text()
            if (text1 === "明天再来") {
              return text1 = true;
            };
          });
      if (text1) {
        toastLog("明天再来");
        break top;
      };
    };
    let a = textContains(str).findOne(2000);
    if (a) {
      toastLog("找到了" + str);
      btn_assure_click(str);
      let e = text("直接领取").findOne(20000);
      if (e === null) {
        toastLog("没有打开'每日领取饲料'页面，现在退出这个任务");
        errtimes++;
        toastLog(errtimes);
        if (errtimes === 3) return false;
        //函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回。
      }
      sleep(1000);
      //商品浏览页下滑
      if (textContains("直接领取").exists()) {
        text("直接领取").click();
        sleep(1000);
        break;
      };

    } else {
      toastLog("没找到" + str);
      errtimes++;
      if (errtimes === 3) return false;
    };
  };
};
//一直找到上层控件中有可点击的子控件并点击,x参数为目标字符串
function btn_assure_click(x) {
  let a = textContains(x).findOne(2000);
  if (a && a.clickable()) return a.click()
  for (let ii = 0; ii < 6; ii++) {
    if (!a) break
    a = a.parent()
    a.children()
      .forEach(
        function (child) {
          //toastLog(child.clickable());
          let button = child.clickable()
          if (button) {
            return child.click()
          }
          //else{
          //toastLog("没找到按键");
          //}
        }
      );
  };
};
//登录有礼/簽到，直接調用函數,“登录领现金”按键采用坐标。
function lingsiliao() {
  b = className("android.view.View").depth(16).drawingOrder(0).indexInParent(8).findOne(3000);//领饲料按钮
  if (b != null) {
    btn_position_click(b);
    sleep(2000);
  } else {
    click(215, 1200);//点击领饲料坐标
    sleep(2000);
  }
};
function qiandao() {
  textContains("免费换商品").findOne(10000);
  sleep(1500);
  click(640, 300);//签到按钮
  sleep(1500);
  let a, b
  if (textContains("已签").exists()) {
    //toastLog("存在'已签'");
    a = btn_position_click(textContains("已签").findOne())
  } else if (textContains("点击签到").exists()) {
    //toastLog("存在'点击签到'")
    b = btn_position_click(textContains("点击签到").findOne())
  }
  if (a || b) toastLog("签到完成")
  else {
    toastLog("签到未完成");
    return false;
  };
};
function liulanrenwu() {
  let errtimes = 0;//出错3次就结束重试
  for (let err = 0; err < 1; err++) {
    top: {
      let a = textContains("浏览任务").findOne(2000);
      if (a != null) {
        toastLog("找到了浏览任务");
        let b = a.parent().children().filter(function (x) {//检查还剩几次
          return x.text().length >= 2;
        });
        let d = b[1].text().charAt(3) - b[1].text().charAt(1)
        if (d === 0) { toastLog("浏览任务已完成") } else {
          for (j = 0; j < d; j++) {
            btn_assure_click("浏览任务");
            let e = text("小鸡送好礼").findOne(20000);
            if (e == null) {
              back();
              toastLog("没有打开'浏览得饲料'页面，现在退出这个任务");
              err = 0;
              errtimes++;
              if (errtimes === 3) return false;
              break top;//没打开"浏览得饲料"页面就退出。
              //函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回。
            }
            sleep(1000);
            //商品浏览页下滑
            if (textContains("下滑").exists()) {
              for (i = 0; i < 17; i++) {
                swipe(360, 1300, 360, 780, 500);
                sleep(1000);
              };
            } else {
              sleep(17000);
            };
            back();
          };
        };
      } else {
        toastLog("没找到浏览任务");
        err = 0;
        errtimes++;
        if (errtimes === 3) return false;
        //exit();
      };
    };
  };
};
function guangyiguang() {
  let str = "逛一逛精品好货15秒"
  let errtimes = 0;//出错3次就结束重试
  for (let err = 0; err < 1; err++) {
    top: {
      let a = textContains(str).findOne(2000);
      if (a != null) {
        toastLog("找到了" + str);
        btn_assure_click(str);
        let e = text("小鸡送好礼").findOne(20000);
        if (e === null) {
          back();
          toastLog("没有打开'浏览得饲料'页面，现在退出这个任务");
          err = 0;
          errtimes++;
          if (errtimes === 3) return false;
          break top;//没打开"浏览得饲料"页面就退出。
          //函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回。
        }
        sleep(1000);
        //商品浏览页下滑
        if (textContains("任务已完成").exists()) {
          back();
          toastLog(str + "已完成");
          return true;
        } else if (textContains("下滑").exists()) {
          for (i = 0; i < 17; i++) {
            swipe(360, 1300, 360, 780, 500);
            sleep(1000);
          };
        } else {
          sleep(17000);
        };
        back();

      } else {
        toastLog("没找到" + str);
        err = 0;
        errtimes++;
        if (errtimes === 3) return false;
      };
    };
  };
};
function liulanshangpinesiliao() {
  let str = "浏览商品得饲料"
  let errtimes = 0;//出错3次就结束重试
  for (let err = 0; err < 1; err++) {
    top: {
      let a = textContains(str).findOne(2000);
      if (a != null) {
        toastLog("找到了" + str);
        btn_assure_click(str);
        let e = text("小鸡送好礼").findOne(20000);
        if (e == null) {
          back();
          toastLog("没有打开'浏览得饲料'页面，现在退出这个任务");
          err = 0;
          errtimes++;
          if (errtimes === 3) return false;
          break top;//没打开"浏览得饲料"页面就退出。
          //函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回。
        }
        sleep(1000);
        //商品浏览页下滑
        if (textContains("任务已完成").exists()) {
          back();
          toastLog(str + "已完成");
          return true;
        } else if (textContains("下滑").exists()) {
          for (i = 0; i < 15; i++) {
            swipe(360, 1300, 360, 780, 500);
            sleep(1000);
          };
        } else {
          sleep(17000);
        };
        back();

      } else {
        toastLog("没找到" + str);
        err = 0;
        errtimes++;
        if (errtimes === 3) return false;
      };
    };
  };
};
function baoxiang() {
  //当宝箱可见时，可以设定每20次喂饲料就打开宝箱一次
  if (text("O1CN01MOLNEy1ZcVzpEVlmA_!!6000000003215-2-tps-262-84.png_").exists()) {
    text("O1CN01MOLNEy1ZcVzpEVlmA_!!6000000003215-2-tps-262-84.png_").click();//宝箱
    sleep(1500);
    click(350, 1160);
  };
};
function weisiliao() {
  let siliaocount = 0;
  if (textContains("一键喂5次").exists()) {
    for (i = 0; i < 100; i++) {
      textContains("一键喂5次").click();
      siliaocount = siliaocount + 5;
      if (siliaocount >= 20) {
        baoxiang();
        siliaocount = 0;
      };
      let a = textContains("饲料不足").findOne(3000);
      if (a != null) break;
    }
  } else {
    for (i = 0; i < 100; i++) {
      click(615, 1270);//点击喂饲料坐标
      siliaocount = siliaocount + 1;
      if (siliaocount >= 20) {
        baoxiang();
        siliaocount = 0;
      };
      let a = textContains("饲料不足").findOne(3000);
      if (a != null) break;

    };
  };
};
function shouge() {
  top:
  for (ii = 0; ii < 10; ii++) {
    for (i = 0; i < 10; i++) {
      //let t1 = "小鸡送好礼"
      home();
      sleep(1000);
      app.launchApp("淘特");
      waitForPackage("com.taobao.litetao");
      sleep(500);
      let c = text_search("小鸡送好礼");
      //toastLog(c);
      if (!c) continue;//如果没找到"小鸡送好礼"，重新找
      //sleep(2000);
      textContains("扫描通讯录").findOne(20000);
      if (textContains("明天再来").exists()) {
        break top;
      } else if (textContains("可收获").exists()) {
        text_search("可收获");
        text("开心收下").findOne(3000).click();
        sleep(500);
        home();
        sleep(500000);
      } else break top;
    };
    toastLog("已达上限或不能领取");
  };
};
function meirilingqu() {
  let str = "每日免费领饲料"
  let errtimes = 0;//出错3次就结束重试
  let err = 0;
  top:
  for (err; err < 3; err++) {
    let b = textContains(str).findOne(2000);
    for (let ii = 0; ii < 6; ii++) {
      if (!b) break;
      b = b.parent();
      let text1 = false;
      b.children()
        .forEach(
          function (child) {
            //toastLog(child.text());
            text1 = child.text()
            if (text1 === "明天再来") {
              return text1 = true;
            };
          });
      if (text1) {
        toastLog("明天再来");
        break top;
      };
    };
    let a = textContains(str).findOne(2000);
    if (a != null) {
      toastLog("找到了" + str);
      btn_assure_click(str);
      let e = text("直接领取").findOne(20000);
      if (e === null) {
        toastLog("没有打开'每日领取饲料'页面，现在退出这个任务");
        errtimes++;
        toastLog(errtimes);
        if (errtimes === 3) return false;
        //函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回。
      }
      sleep(1000);
      //商品浏览页下滑
      if (textContains("直接领取").exists()) {
        text("直接领取").click();
        sleep(1000);
        break;
      };

    } else {
      toastLog("没找到" + str);
      errtimes++;
      if (errtimes === 3) return false;
    };
  };
};
//单次浏览任务函数可通用，将str变量作为函数参数即可。
//================逻辑部分======================

//======================

//======================
//收割庄稼
shouge();
sleep(1500);
qiandao();
sleep(1500);
lingsiliao();
sleep(1500);
liulanrenwu();
sleep(1500);
guangyiguang();
sleep(1500);
meirilingqu();
sleep(1500);
liulanshangpinesiliao();
sleep(1500);
click(653, 530);//点X关闭
weisiliao();
sleep(1500);
click(653, 530);//点X关闭
