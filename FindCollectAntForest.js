/*
 * @Author: Yimning
 * @Date: 2021-01-22 16:27:03
 * @LastEditTime: 2021-01-23 19:23:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \undefinedc:\Users\Yimning\Desktop\脚本\-Auto.js-\FindCollectAntForest.js
 */

// 翻页次数 好友越多页数越多
var collectTimes = 20;
var sleepTimes = 1100;
var collectOverTimes = 30;   //收取30个好友后结束
var tryTimes = 5; // 相关操作最多尝试的次数
var screen_width = 1080; //设置屏幕的宽度，像素值
var screen_height = 2310; //设置屏幕的高度，像素值
//===================用户可编辑参数===================
// //所有任务重复次数,解决新增任务问题
// var MAX_ALL_TASK_EPOCH = 2
// //浏览任务最大执行次数
// var MAX_EPOCH = 101
// //任务执行默认等待的时长 考虑到网络卡顿问题 默认15秒
// var wait_sec = 15
// //序列化数据到本地
// var storage = storages.create("javis486");
// //线程执行其任务
var thread = null

threads.start(function () {
    //在子线程中调用observeKey()从而使按键事件处理在子线程执行
    events.observeKey();
    events.on("key_down", function (keyCode, events) {
        //音量键关闭脚本
        if (keyCode == keys.volume_down) {
            toast("您选择退出脚本！")
            sleep(1000);
            exit();
        }
    });
});
//前置操作
setScreenMetrics(screen_width, screen_height);
"ui";
auto() //开启无障碍服务 //auto.waitFor()和"ui";有冲突会导致卡死?

if (floaty && floaty.hasOwnProperty("checkPermission") && !floaty.checkPermission()) {
    floaty.requestPermission(); toast("请先开启悬浮窗权限再运行,否则无法显示提示"); exit()
}

// 唤醒屏幕解锁
unlock();

// 执行蚂蚁森林任务----线程
ant_forest_task();

// 开启点击投射/录制功能 ----必要，体现全自动
startUp();

// 主入口函数
//mainEntrance();

//这个是点亮锁屏的函数
function unlock() {
    if (!device.isScreenOn()) {
        //点亮屏幕
        device.wakeUp();
        sleep(1000);
        //滑动屏幕到输入密码界面
        swipe(500, 1900, 500, 1000, 300);
        sleep(1000);

        //输入四次 （密码为0082） 数字键7的像素坐标为（180,1530）
        // click(240,1530);  //1
        click(480, 2000);
        sleep(500);
        click(480, 2000);
        sleep(500);
        click(480, 1800);
        sleep(500);
        click(480, 1530); //2
        sleep(500);

        //    click(720,1800); //9
        //    sleep(500);

        // click(240,1800);//8
        // sleep(500);

        // click(480,1800);//2
        // sleep(500);


        // click(720,1530);//3

        //click(180,1700);//4

        // click(180,1800);//7
    }
}
//开启点击投射/录制功能
function startUp() {
    sleep(1000);
    click(720, 1800);
}


//收取自己的能量
function steal_own_energy() {
    toast("收取自己的能量");
    sleep(500);
    for (var row = screen_height * 0.256; row < screen_height * 0.376; row += 80)
        for (var col = screen_width * 0.185; col < screen_width * 0.815; col += 80) {
            click(col, row);
            sleep(50);
        }
    toast("自己能量收集完成");
    sleep(1000);
}

//循环收取好友能量
function steal_friends_energy() {
    toast("循环收取好友能量");
    sleep(500);
    while (text("找能量").findOne()&&collectOverTimes!=0) {
        text("找能量").findOne().click();
        sleep(1000);
        if (className("android.view.View").text("startapp?appId=60000002&url=%2Fwww%2Fhome").exists()) {
            toast("已全部收取完毕结束任务");
            back();
            exit();
        }
        for (var row = screen_height * 0.256; row < screen_height * 0.376; row += 80) {
            for (var col = screen_width * 0.185; col < screen_width * 0.815; col += 80) {
                click(col, row);
                sleep(50);
            }
        }
    
        back();
        toast("一个好友能量收取结束，开始下一个");
        // if (text("返回我的森林").findOne()) {
        //     toast("已全部收取完毕结束任务");
        //     collectOverTimes=0;
        // } 
        collectOverTimes--;
        if(collectOverTimes==0)   toast("已全部收取完毕结束任务");
    }
    back(); //返回自己森林主页
    sleep(500);
    toast("循环结束准备退出");
    sleep(1000);
}

// 结束后返回主页面
function whenComplete() {
    toast("结束");
    back();
    sleep(1.5 * sleepTimes);
    back();
}

//蚂蚁森林任务
function ant_forest_task() {
    threads.start(function () {
        requestScreenCapture(false);
        launchApp("支付宝");
        toast("等待支付宝启动");
        sleep(2 * sleepTimes);
        // 打开首页
        //click("首页");

        // 进入蚂蚁森林主页,收集自己的能量
        enterMyMainPage();
        sleep(2 * sleepTimes);

        // 收集自己的能量
        steal_own_energy();

        // 收集好友的能量
        steal_friends_energy();

        //结束后返回主页面
        whenComplete();
        sleep(sleepTimes);

        exit();
        return true;
    });

}

// 从支付宝主页进入蚂蚁森林我的主页
function enterMyMainPage() {
    click("蚂蚁森林");
    toast("进入蚂蚁森林我的主页");
    sleep(3 * sleepTimes);
    // // 收自己能量
    // clickByTextDesc("克", 0);
    // toast("自己能量收集完成");
    // sleep(sleepTimes);
    return true;
}


//程序主入口
function mainEntrance() {

    // 唤醒屏幕解锁
    unlock();

    // 执行蚂蚁森林任务----线程
    ant_forest_task();

    // 开启点击投射/录制功能 ----必要，体现全自动
    startUp();
}