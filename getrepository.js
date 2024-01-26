const request=require("request");
const cheerio=require("cheerio");
const findIssueObj=require("./findissues");
const findissues = require("./findissues");
const path=require("path");
const fs=require("fs");

// const url="https://github.com/topics/unreal-engine";

function getrepos(url,topic){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }
        else if(response.statusCode==404){
            console.log("page not found");
        }
        else{
            findrepos(html);
        }
    }

    function findrepos(html){
        const $=cheerio.load(html);
        let allrepos=$(".f3.color-fg-muted.text-normal.lh-condensed");
        console.log(topic);
        for(let i=0;i<8;i++){
            let repolink=$(allrepos[i]).find(".Link.text-bold.wb-break-word").attr("href");
            repolink="https://github.com"+repolink;
            console.log(repolink);
            repoName=repolink.split("/");
            repoName=repoName[repoName.length-1].trim();
            // let repoPath=path.join(__dirname,topic,repoName+".json");
            // let filename="./"+repoName+".json";
            // fs.writeFileSync(repoPath,"[]");
            
            findIssueObj.findobj(repolink,repoName,topic);
        }
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;");
    }
}



module.exports={
    getreposobj:getrepos
}
