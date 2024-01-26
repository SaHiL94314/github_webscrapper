const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const PDFDocument = require('pdfkit');

// const url="https://github.com/microsoft/AirSim";
function for_request(url,repoName,topic){
    request(url,cb);

    function cb(err,response,html){
        if(err){
            console.log(err);
        }
        else if(response.statusCode==404){
            console.log("page not found");
        }
        else{
            findIssuesLink(html);
        }
    }
    function findIssuesLink(html){
        const $=cheerio.load(html);
        const issue=$(".d-inline-flex");
        let link=$(issue[1]).find("a").attr("href");
        link="https://github.com"+link;
        // console.log(link);
        findAll(link);
    }
    
    function findAll(link){
        request(link,function (err,response,html){
            if(err){
                console.log(err);
            }
            else{
                getallissues(html);
            }
        })
    }
    
    function getallissues(html){
        const $=cheerio.load(html);
        let alldiv=$(".d-flex.Box-row--drag-hide.position-relative");
        let arr=[];
        for(let i=0;i<alldiv.length;i++){
            let url=$(alldiv[i]).find(" .Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title").attr("href");
            url = ""+url;
            
            arr.push(url);
            // let data=JSON.stringify(content);
            // arr.push(url);
            // fs.writeFileSync(repopath,data);
        }

        let folderpath=path.join(__dirname,topic);
        dirCreator(folderpath);
        let filepath=path.join(folderpath,repoName+".pdf");
        let text=JSON.stringify(arr);
        // fs.writeFileSync(filepath,text);

        let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream(filepath));
        pdfDoc.text(text);
        pdfDoc.end();
    }
}
function dirCreator(folderpath){
    if(fs.existsSync(folderpath)==false){
        fs.mkdirSync(folderpath);
    }
}


module.exports={
    findobj:for_request
}
