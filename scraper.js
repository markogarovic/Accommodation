const express = require("express");
const app = express();

const csvFilePath='./apartmani.csv'
const csv = require('csvtojson')


const cheerio = require("cheerio");
const axios = require("axios").default;
const fs = require("fs")
const csvWriter = require("csv-write-stream")

let writer = csvWriter({ sendHeaders: false });
writer.pipe(fs.createWriteStream('apartmani.csv', { flags: 'a' })) // flag 'a' - append, not overwrite

function hasId(data, id) {
  return data.some(function (el) {
    return el.id === id;
  });
}

let recursiveFunction = function (arr, x, start, end) { 

  if (start > end) return false;  
  let mid=Math.floor((start + end)/2); 
  if (arr[mid]===x) return true; 
  if(arr[mid] > x)  return recursiveFunction(arr, x, start, mid-1); 
  else return recursiveFunction(arr, x, mid+1, end); 
} 
 
// // Driver code 
// let arr = [1, 3, 5, 7, 8, 9]; 
// let x = 5; 
 
// if (recursiveFunction(arr, x, 0, arr.length-1)) 
//   document.write("Element found!<br>"); 
// else document.write("Element not found!<br>"); 
 
// x = 6; 
 
// if (recursiveFunction(arr, x, 0, arr.length-1)) 
//   document.write("Element found!<br>"); 
// else document.write("Element not found!<br>"); 


const fetchHtml = async url => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch {
      console.error(
        `ERROR: An error occurred while trying to fetch the URL: ${url}`
      );
    }
};

const scrapRealitica = async () => {
    
    const jsonArray = await csv().fromFile(csvFilePath);
    
    const url = "https://www.realitica.com/apartmani/Crna-Gora/"
    const home = await fetchHtml(url);
    var $ = cheerio.load(home);

    const size = parseInt(parseInt($("body").find("#xc241").text().split("(")[1]) / 20) + 1;

    var searchResults = jsonArray
    for(let i = 0; i < size;i++){
        const steamUrl = `https://www.realitica.com/?cur_page=${i}&for=Najam&pZpa=Crna+Gora&pState=Crna+Gora&type%5B%5D=&lng=hr`;
        console.log("OK1  "+ i)
        const html = await fetchHtml(steamUrl);
        $ = cheerio.load(html);
        
        for(let k = 1; k<=21; k++){
            if(k === 11){
              continue
            }
            var currentPage = $(`#left_column_holder > *:nth-child(${10+k}) a`).attr("href")
            var urlOglasa = currentPage;
            currentPage = await fetchHtml(currentPage)
            var t = cheerio.load(currentPage)

            var id = t("#listMap + *").text().split("\n")[3].split(": ")[1]
            if(jsonArray.find(x => x.id === id) !== 'undefined'){
              continue
            }

            const base = t(`#listing_body`).contents().text()
            .replace(/\t/g,'').replace(/([a-z+0-9])([A-Z])/g, '$1 $2').split("\n").filter((el)=>{
              if(el !== '' && el !== ' '){
                return el
              }
            });

            var mainData = base[1];
            var br = 1;
            function checker(string){
              var data;
              if(mainData.includes(string)){
                if(string === 'Cijena:'){
                  data = parseFloat(mainData.split(": ")[br].split(" ")[0].slice(1));
                  br++;
                  return data
                }else if(string === 'Soba:' || string === 'Kupatila:' || string === 'Godina Gradnje:' || string === 'Stambena Površina:' || string === 'Parking Mjesta:' || string === 'Od Mora (m):'){
                  data = parseInt(mainData.split(": ")[br].split(" ")[0])
                  br++;
                  return data
                }else if(string === 'Novogradnja' || string === 'Klima Uređaj'){
                  data = true;
                  br++;
                  return data
                }else if((string === 'Lokacija:' && !mainData.includes('Adresa:'))||(string === 'Adresa:')){
                  data = mainData.split(": ")[br].split(" ")
                  data.pop();
                  var poslednji = data[data.length-1]
                  if(poslednji == 'Energetski' || poslednji == 'Godina'){
                    poslednji = data.pop();
                  }
                  data = data.join(" ")
                  br++
                  return data
                }
                data = mainData.split(": ")[br].split(" ")
                data.pop();
                data = data.join(" ")
                br++
                return data
              }
              if(!mainData.includes(string) && (string === 'Novogradnja' || string === 'Klima Uređaj')){
                data = false;
                br++;
                return data
              }else if(string === 'Adresa:' && !mainData.includes(string)){
                data = ''
                return data
              }else if(string === 'Lokacija:' && !mainData.includes(string)){
                data = ''
                return data
              }
              return null
            }

            var vrstaSmjestaja = checker("Vrsta:");
            var podrucje = checker("Područje:");            
            var lokacija = checker("Lokacija:") + ' ' + checker("Adresa:");
            
            var razred = checker("Razred:");
            var cijena = checker("Cijena:");
            var godinaGradnje = checker("Godina Gradnje:")
    
            var brSoba = checker("Soba:");
            var brKupatila = checker("Kupatila:");
            var stambenaPovrsina = checker("Stambena Površina:");
            var parkingMjesta = checker("Parking Mjesta:");
            var odMora = checker("Od Mora (m):");
            var novogradnja = checker("Novogradnja");
            var klima = checker("Klima Uređaj");
        
            var naslov = base[0];
            var opis = base[2].slice(6);
            let j = 3
            for(j; j <base.length;j++){
              if(base[j].includes("Više detalja na:") || base[j].includes("Oglasio:")){
                break;
              }
              opis = opis + " " + base[j]
            }

            var mainData2 = base[j]
            br = 1
            function checker2(string){
              var data;
              if(mainData2.includes(string)){
                if(string === "Mobitel:"){
                  data = mainData2.split(": ")[br].split(" ")[0];
                  br++
                  return data
                }
                data = mainData2.split(": ")[br].split(" ")
                data.pop();
                data = data.join(" ")
                br++
                return data
              }
              return null
            }

            var webStranica = checker2("Više detalja na:");
            var oglasio = checker2("Oglasio:");
            var mobilni = checker2("Mobitel:");

            j++

            var id = base[j++].split(": ")[1];
            var zadnjaPromjena = base[j].split(": ")[1].replace(/,/g,'');
            
            var slike = t('#rea_blueimp > a').toArray().map((el)=>{
              return t(el).attr('href')
            })

            var json = 
            {
              vrstaSmjestaja,
              podrucje,
              lokacija,
              cijena,
              brSoba,
              brKupatila,
              stambenaPovrsina,
              zemljiste: null,
              parkingMjesta,
              odMora,
              novogradnja,
              klima,
              naslov,
              opis,
              webStranica,
              oglasio,
              mobilni,
              id,
              zadnjaPromjena,
              slike,
              url: urlOglasa
          }
          searchResults.push(json);
          writer.write(json);
        
        }
    }
    writer.end();
    console.log("DONE")
    app.get("/", async function (req, res) {
      res.write(JSON.stringify(searchResults,undefined,2))
    })
    return searchResults

};

var file = scrapRealitica()



app.listen(3000, (err, data) => {
  if (!err) console.log("Connected")
})

//module.exports = scrapRealitica;
