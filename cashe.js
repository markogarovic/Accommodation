// console.log("OK2")
        // var currentPage = $(`#left_column_holder > *:nth-child(${10+1}) a`).attr("href")
        // currentPage = await fetchHtml("https://www.realitica.com/hr/listing/1735887")
        // var t = cheerio.load(currentPage)
        // const base = t(`#listing_body`).contents().text()
        //   .replace(/\t/g,'').replace(/([a-z+0-9])([A-Z])/g, '$1 $2').split("\n").filter((el)=>{
        //     if(el !== '' && el !== ' '){
        //       return el
        //     }
        //   });
        // var mainData = base[1];
        // var br = 1;
        // function checker(string){
        //   var data;
        //   if(mainData.includes(string)){
        //     if(string === 'Cijena:'){
        //       data = parseFloat(mainData.split(": ")[br].split(" ")[0].slice(1));
        //       br++;
        //       return data
        //     }else if(string === 'Soba:' || string === 'Kupatila:' || string === 'Godina Gradnje:' || string === 'Stambena Površina:' || string === 'Parking Mjesta:' || string === 'Od Mora (m):'){
        //       data = parseInt(mainData.split(": ")[br].split(" ")[0])
        //       br++;
        //       return data
        //     }else if(string === 'Novogradnja' || string === 'Klima Uređaj'){
        //       data = true;
        //       br++;
        //       return data
        //     }else if(string === 'Adresa:'){
        //       data = mainData.split(": ")[br].split(",");
        //       temp = data[0] + ", " + data[1].split(" ")[1] 
        //       br++
        //       return temp;
        //     }else if(string === 'Lokacija:' && !mainData.includes('Adresa:')){
        //       data = mainData.split(": ")[br].split(" ")
        //       data.pop();
        //       data.pop();
        //       data = data.join(" ")
        //       br++
        //       return data
        //     }
        //     data = mainData.split(": ")[br].split(" ")
        //     data.pop();
        //     data = data.join(" ")
        //     br++
        //     return data
        //   }
        //   return ''
        // }

        // console.log(base)
        // var vrstaSmjestaja = checker("Vrsta:");
        // var podrucje = checker("Područje:");
        
        // var lokacija = checker("Lokacija:") + ' ' + checker("Adresa:");

        // var razred = checker("Razred:");
        // var cijena = checker("Cijena:");
        // var godinaGradnje = checker("Godina Gradnje:")
    
        // console.log(vrstaSmjestaja,podrucje,razred,cijena,lokacija,godinaGradnje)
        
        // var brSoba = checker("Soba:");
        // var brKupatila = checker("Kupatila:");
        // var stambenaPovrsina = checker("Stambena Površina:");
        // // var zemljiste = checker('Zemljište:');
        // var parkingMjesta = checker("Parking Mjesta:");
        // var odMora = checker("Od Mora (m):");
        // var novogradnja = checker("Novogradnja");
        // var klima = checker("Klima Uređaj");

        // console.log(brSoba,brKupatila,stambenaPovrsina,parkingMjesta,novogradnja,klima,odMora)
        
        // var naslov = base[0];
        // var opis = base[2].slice(6);
        // let j = 3
        // for(j; j <base.length;j++){
        //   if(base[j].includes("Više detalja na:") || base[j].includes("Oglasio:")){
        //     break;
        //   }
        //   opis = opis + " " + base[j]
        // }
        // console.log(naslov)
        // console.log(opis)
        
        // var mainData2 = base[j]
        // br = 1
        // function checker2(string){
        //   var data;
        //   if(mainData2.includes(string)){
        //     if(string === "Mobitel:"){
        //       data = mainData2.split(": ")[br].split(" ")[0];
        //       br++
        //       return data
        //     }
        //     data = mainData2.split(": ")[br].split(" ")
        //     data.pop();
        //     data = data.join(" ")
        //     br++
        //     return data
        //   }
        //   return ''
        // }

        // var webStranica = checker2("Više detalja na:");
        // var oglasio = checker2("Oglasio:");
        // var mobilni = checker2("Mobitel:");
        // console.log(webStranica,oglasio,mobilni)
        // j++

        // var id = base[j++].split(": ")[1];
        // var zadnjaPromjena = base[j].split(": ")[1].replace(/,/g,'');
        // console.log(id,zadnjaPromjena)
        
        // var slike = t('#rea_blueimp > a').toArray().map((el)=>{
        //   return t(el).attr('href')
        // })
        // // .map((el)=>{
        // //   return el.attr('src')
        // // });
        // console.log(slike)

        // var urlCSV = './post.csv';
























         // var csv = json2csv(json)
          // fs.appendFileSync("./post.csv", csv);


            // var csv = json2csv(json,{ fields:[
            //   "vrsta","podrucje","lokacija","brSoba","brKupatila","cijena","stambenaPovrsina","zemljiste","parkingMjesta",
            //   "odMora","novogradnja","klima","naslov","opis","webStranica","oglasio","mobilni","id","zadnjaPromjena","slike","url"
            // ]})
            // fs.appendFileSync('./post.csv',csv)
            // writeStream.write(`${vrstaSmjestaja}`,`${podrucje}`,`${lokacija}`,`${cijena}`,
            // `${brSoba}`,`${brKupatila}`,`${stambenaPovrsina}`,null,`${parkingMjesta}`,`${odMora}`,`${novogradnja}`,`${klima}`,
            // `${naslov}`,`${opis}`,`${webStranica}`,`${oglasio}`,`${mobilni}`,`${id}`,`${zadnjaPromjena}`,`${slike}`,`${urlCSV}`)
        