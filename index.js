const puppeteer = require('puppeteer');
const url = 'https://web.facebook.com/ads/library/?active_status=all&ad_type=all&country=MA&q=%27%20%27&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&start_date[min]=2023-02-14&start_date[max]=2023-02-15&search_type=keyword_unordered&media_type=all';
const search = 'product 2';
const searchInputXpath = '//*[@id="content"]/div/div/div/div[3]/div[3]/div/div/div[3]/div[1]/div/div[1]/div/input';


(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({width: 0, height: 0});
  await page.goto(url, { timeout: 60000 });
  await page.waitForXPath(searchInputXpath);
  const searchInput = await page.$x(searchInputXpath);
  //clear input field value
  await searchInput[0].click({clickCount: 3});
  await searchInput[0].press('Backspace');
  //type search value
  await searchInput[0].type(search);
  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  await page.evaluate(() => {
    window.scrollDown = true;
    window.addEventListener('keydown', e => {
      if (e.ctrlKey) {
        window.scrollDown = false;
      }
    });
  });

  while (await page.evaluate(() => window.scrollDown)) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

  }
  

  page.waitForSelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.x1cy8zhl.x78zum5.xyamay9.x1pi30zi.x18d9i69.x1swvt13.x1n2onr6 > div > div.xeuugli.x2lwn1j.x78zum5.xdt5ytf > div:nth-child(2) > span');
  page.waitForSelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div._7k71 > div > div > div > div > div.x1rg5ohu > div > div > a > span');
   page.waitForSelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > div');
   page.waitForSelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > a');
 
  //get data
    //wait the product to be loaded
    const data = await page.evaluate(() => {
    const result = [];
    const bigContainer = document.querySelector('#content > div > div > div > div:nth-child(5) > div:nth-child(2)');
    const containers = bigContainer.querySelectorAll('.x6s0dn4.x78zum5.xdt5ytf.xl56j7k.x1n2onr6.x1ja2u2z.x19gl646.xbumo9q');
    containers.forEach(container => {
      const container1 = container.querySelector('.x1dr75xp.xh8yej3.x16md763');
      const productContainer = container1.querySelector('.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w').childNodes;
      productContainer.forEach(product => {

      
       const p = [{
          created_at: product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.x1cy8zhl.x78zum5.xyamay9.x1pi30zi.x18d9i69.x1swvt13.x1n2onr6 > div > div.xeuugli.x2lwn1j.x78zum5.xdt5ytf > div:nth-child(2) > span') ?  product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.x1cy8zhl.x78zum5.xyamay9.x1pi30zi.x18d9i69.x1swvt13.x1n2onr6 > div > div.xeuugli.x2lwn1j.x78zum5.xdt5ytf > div:nth-child(2) > span').innerText : null,
          brandname: product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div._7k71 > div > div > div > div > div.x1rg5ohu > div > div > a > span') ? product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div._7k71 > div > div > div > div > div.x1rg5ohu > div > div > a > span').innerText : null,
          description: product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > div') ? product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > div').innerText : null, 
          image: product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div:nth-child(2) > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > a > div.x1ywc1zp.x78zum5.xl56j7k.x1e56ztr.x1277o0a > img') ? product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div:nth-child(2) > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > a > div.x1ywc1zp.x78zum5.xl56j7k.x1e56ztr.x1277o0a > img').getAttribute('src') : null,
          video: product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div:nth-child(2) > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > div._8o0a._8o0b > div.x1ywc1zp.x78zum5.xl56j7k.x1e56ztr.xh8yej3 > video') ? product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div:nth-child(2) > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > div._8o0a._8o0b > div.x1ywc1zp.x78zum5.xl56j7k.x1e56ztr.xh8yej3 > video').getAttribute('src') : null,
          link: product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > a') ? product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > a').getAttribute('href') : null,
          action: product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > a > div._8jgz._8jg_ > div._8jh0') ? product.querySelector('.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > a > div._8jgz._8jg_ > div._8jh0').innerText : null,
        }];
      
        result.push(p);
      });

     
    }
    );
    return result;
  });
  console.log(data);


  //store data in file .json 
  const fs = require('fs');
  const filename = search + new Date().toISOString().replace(/:/g, '-') + '.json';
  fs.writeFile(filename, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  //await browser.close();
  
    

    

  
    

 
})();
