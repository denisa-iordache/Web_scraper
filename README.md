# Web_scraper
## Tehnologii folosite
• În realizarea aplicației am folosit React.js pe partea de frontend, respectiv Node.js (Express.js ca și framework) pe partea de backend. <br/>
• Pentru stilizare am folosit Tailwind. <br/>
• Pentru extragerea datelor am folosit libraria de Node.js Puppeteer. <br/>
## Rularea aplicatiei
Pentru rularea aplicatiei trebuie urmati urmatorii pasi:<br/><br/>
• Atat pentru partea de client, cat si pentru partea de server, folosind in cmd comenzile cd server, respectiv cd gui, trebuie sa instalam pachetele necesare prin comanda npm install.<br/><br/>
• Dupa acest prim pas, pe partea de server rularea se face cu comanda nodemon server.js, iar pe partea de client cu comanda npm start.<br/><br/>
## Descrierea aplicației
• Aplicatia are ca scop extragerea de date in format JSON de pe site-ul https://wsa-test.vercel.app/ asemanator unui blog. Utilizatorul introduce numele site-ului in casuta de cautare, apasa butonul Search si ii sunt returnate diferite informatii despre postarile de pe blog (titlu, descriere scurta, imagine, href, descriere lunga, numarul de cuvinte din postare, sentimentul general al postarii.<br/>
![image](https://github.com/denisa-iordache/Web_scraper/assets/74931542/d835f9f4-ebae-4e9d-8f16-a02f7748b6f4)
• Exista posibilitatea ca dupa introducerea site-ului in caseta text, utilizatorul sa poata primi date doar pentru o anumita postare. Acest lucru se face prin adaugarea la numele site-ului a titlului postarii.<br/>
![image](https://github.com/denisa-iordache/Web_scraper/assets/74931542/cdff1b73-75c6-4aeb-93d4-b9d8323c653a)
• Ultima optiune este aceea de descarcare a unui fisier JSON cu rezultatul generat, acest lucru fiind posibil prin apasarea butonului Download JSON.<br/>
![image](https://github.com/denisa-iordache/Web_scraper/assets/74931542/4c67e44e-7c7b-4cdf-9912-6c4d15e515f1)
## Explicatii
• Din cele spuse mai sus, se poate observa ca exista doua endpoint-uri API, unul pentru generarea detaliilor despre toate postarile si unul pentru o postare la alegere. Pentru a realiza acest lucru, pe partea de backend exista pagina apiRoutes.js unde prin metoda GET extrag informatiile returnate prin scraping.<br/>
![image](https://github.com/denisa-iordache/Web_scraper/assets/74931542/18b0427c-18f5-48c7-8c8d-2c6d01c9cb15)
<br/>
• Pe partea de frontend accesez aceste rute prin fetch.<br/>
![image](https://github.com/denisa-iordache/Web_scraper/assets/74931542/be940736-2b23-40dc-b356-bac79e53e25f)
<br/>
• Pentru partea de scraping eu am avut experianta anterioara doar in Python unde am utilizat Beautiful Soup si Selenium. Acum mi-am ales 2 variante initiale, Cheerio si Puppeteer. Am ales ulterior Puppeteer deoarece e pliabil pe continut dinamic.<br/>
• Pentru algoritmul de sentiment analysis am ales ceva simplu, astfel ca am luat aproximativ 100 de cuvinte negative si 100 pozitive. Am numarat cate dintre acestea se regasesc in postarea analizata si am raportat rezultatul pentru fiecare la numarul total de cuvinte din postare. Initial aveam ideea de a elimina cuvintele de baza, dar am ales sa ma raportez la numarul total de cuvinte si sa impun un prag peste care rezultatul sa fie unul valid. Pentru acest lucru m-am gandit ca in medie dintr-o propozitie un singur cuvant exprima efectiv un sentiment/stare. In mod normal pragul ar fi trebuit sa fie de 0.1 dupa rationamentul initial, dar pentru ca setul de cuvinte folosite ca test nu era unul generos, astfel ca rezultatul nu ar fi unul concret, am scazut pragul la 0.03.<br/>
![image](https://github.com/denisa-iordache/Web_scraper/assets/74931542/fb5484ce-7c7b-4f1a-8652-51da0e8cb41e)
<br/>
• Am ales sa folosesc pe partea de frontend React.js, tehnologie familiara, insa am folosit pentru stilizare Tailwind pentru a-mi iesi mai mult din zona de confort. De asemenea, a fost o provocare si extragerea datelor fara a ma folosi de selectorii CSS.<br/>
• Ca bonus am implementat posibilitatea de descarcare a rezultatului intr-un fisier JSON.

