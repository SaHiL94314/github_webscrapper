const request=require("request");
const cheerio=require("cheerio");
const getreposOBJ=require("./getrepository");
const fs=require("fs");

const url="https://github.com/topics";
request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }
    else if(response.statusCode==404){
        console.log("page not found");
    }
    else{
        findtopics(html);
    }
}

function findtopics(html){
    const $=cheerio.load(html);
    const topicsArr=$(".topic-box.position-relative.height-full.text-center.border.color-border-muted.rounded.color-bg-default.p-5");
    // console.log(topicsArr.length);
    for(let i=0;i<topicsArr.length;i++){
        let link=$(topicsArr[i]).find(".no-underline.d-flex.flex-column.flex-justify-center").attr("href");
        link="https://github.com"+link;
        // console.log(link);
        let topicName=link.split("/");
        topicName=topicName[topicName.length-1].trim();
        // if(fs.existsSync(topicName)==false) fs.mkdirSync(topicName);
        getreposOBJ.getreposobj(link,topicName);
    }
}
