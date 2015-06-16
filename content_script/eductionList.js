gpa_global ={
    "bixiu": 0,
    "xianxuan": 0,
    "tongshi": 0,
    "gexinghua": 0,
    "tiyu": 0,
    "liangke": 0,
    "erzhuan": 0,
    "units": 0,
    "grades": 0,
    "scores": 0
};

function optimize_myEductionList(){
    if(!inUrl("/edu/StuStatusMange/MyGradList.aspx"))
        return 0;

    gpa_global["units"] = 0;
    gpa_global["grades"] = 0;
    gpa_global["scores"] = 0;
    gpa_global["bixiu"] = gpa_colomn("#dgBX1", "#lbBxxf2", [6,5,7]); //必修
    gpa_global["tiyu"] = gpa_colomn("#dgPE", "#lbPE1", [6,5,7]); //体育
    gpa_global["liangke"] = gpa_colomn("#dgTH", "#lbTH1", [6,5,7]); //两课
    gpa_global["xianxuan"] = gpa_colomn("#dgXX2", "#lbXxxf1", [7,6,8]); //限选
    gpa_global["tongshi"] = gpa_colomn("#dgTsk2", "#lbTSK1", [7,6,9]); //通识
    gpa_global["gexinghua"] = gpa_colomn("#dgGxh2", "#lbGxxf1", [6,5,7]); //任选
    gpa_global["erzhuan"] = gpa_colomn("#dgez", "#lbGxxf1", [6,5,7]);
    // 将统计结果显示在最上方的总表格中
    var p = "共修" + gpa_global["units"] + "学分, 平均分为" + (gpa_global["scores"]/gpa_global["units"]).toFixed(2) + "，平均GPA为" + (gpa_global["grades"]/gpa_global["units"]).toFixed(2);
    jQuery("#form1 > table > tbody > tr:nth-child(6)").after("<tr><td><fieldset style='width:900px'><legend>所有课程分数情况（由electsys++提供）</legend><table width='100%'><p>"+p+"</p></table></fieldset></td></tr>");
}

function gpa_colomn(table, title, colomn){
    /**
        @table: 成绩表格的id
        @title: 标题
        @colomn: 代表“成绩”，“学分”，“备注”所在列
    */
    var gpa_all = 0;
    var unit_all = 0;
    var score_all = 0;
    jQuery(table).find("tr").each(function(){
        var score = jQuery(this).find("td:nth-child(" + colomn[0] +")").html();
        var unit = parseInt(jQuery(this).find("td:nth-child(" + colomn[1] +")").html());
        var comment = jQuery(this).find("td:nth-child(" + colomn[2] +")").html();
        score = turn_score(score);
        var gpa = score2gpa(score); 
        if (typeof(gpa) == "number" && comment != "无需关注" && comment != "尚未修读" && comment != "正在修读"){
            gpa_all += gpa * unit;
            unit_all += unit;
            score_all += score * unit;
            gpa_global["scores"] += score * unit;
            gpa_global["units"] += unit;
            gpa_global["grades"] += gpa * unit;
        }
        if (comment == "无需关注" || comment == "尚未修读" || comment == "正在修读"){
            gpa = comment;
        }
        jQuery(this).append("<td>" + gpa + "</td>");
    });
    var gpa_avg = gpa_all / unit_all;
    var score_avg = score_all / unit_all;
    jQuery(title).parent().append("<br> 本部分课程总GPA为：" + gpa_avg.toFixed(2) + "，平均分为：" + score_avg.toFixed(2));
  //  console.log("unit_all = " + unit_all);
}

function turn_score(score) {
    if (score == "A+") {
        return 95;
    } else if (score == "A") {
        return 90;
    } else if (score == "A-") {
        return 85;
    } else if (score == "B+") {
        return 80;
    } else if (score == "B") {
        return 75;
    } else if (score == "B-") {
        return 70;
    } else if (score == "C+") {
        return 67;
    } else if (score == "C") {
        return 65;
    } else if (score == "C-") {
        return 62;
    } else if (score == "D") {
        return 60;
    } else if (score == "P") {
        return 85;
    }
    return score;
}

function score2gpa(score){
    // not quite sure
    if (score == "成绩"){
        return "GPA";
    }
    if (score >= 95){
        return 4.30;
    }else if (score >= 90){
        return 4.00;
    }else if (score >= 85){
        return 3.70;
    }else if (score >= 80){
        return 3.30;
    }else if (score >= 75){
        return 3.00;
    }else if (score >= 70){
        return 2.70;
    }else if (score >= 67){
        return 2.30;
    }else if (score >= 65){
        return 2.00;
    }else if (score >= 63){
        return 1.70;
    }else if (score >= 60){
        return 1.00;
    }else{
        return 0.00;
    }
    return "";
}