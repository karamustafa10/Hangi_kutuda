alert('*** OYUN KURALLARIDIR LÜTFEN DİKKATLİ OKUYUNUZ! ***'+
'\n1- İlk olarak oyuna başlamak için bu kutuyu maddeleri okuduktan sonra "Tamam" tuşuna basarak kapatmanız gerekir.'+
'\n2- Oyun bir çoğumuzun bildiği "Hangi Kutuda?" oyununun mantığındadır.'+
'\n3- Oyun ilk olarak topun ortadaki kutuya hareket etmesi ile başlar.'+
'\n4- Sonrasında "KARIŞTIR" butonuna bastığınızda kutuların yerleri karışmaya başlar.'+
'\n5- Kutular durduğunda topun hangi kutuda olduğunu tahmin ediyorsanız tahmin ettiğiniz kutunun altında bulunan "SEÇ" butonuna basınız.'+
'\n6- Eğer top tahmin ettiğiniz kutuda bulunuyorsa bir puan kazanmış oluyorsunuz. Ardından "DEVAM ET" tuşuna basıp oyuna devam edin.'+
'\n7- Her bildiğiniz kutu için bir sonraki kutuların karışma hızı artacaktır.'+
'\n8- Eğer yanlış kutuyu seçerseniz oyun sonlanır ve kaç puan aldığınız ekranda gözükür.'+
' "TEKRAR OYNA" tuşuna basarak oyuna yeniden başlayabilirsiniz.'+
'\n9- Oyundan Maksimum verimi alabilmek için tam ekranda oynayınız.');

// Oyun kuralları ve oynanış hakkında bilgi verildi.


var canvas = document.getElementById("mycanvass"); // Canvas üzerinde işlem yapılması için bir değişkene atandı.

canvas.width = window.innerWidth * 0.99; // canvas ölçüleri belirlendi.
canvas.height = window.innerHeight * 0.99;

var ctx = canvas.getContext('2d');

var puan = 0; // Üst üste ne kadar kutuyu doğru bildiğimizi göstermek için kullanıldı.

var cember_x = 760;
var cember_y = 153.5;
var cember_yari_cap = 30;

var kare1_x_ilk = 230;
var kare1_y_ilk = 257;
var kare2_x_ilk = 660;
var kare2_y_ilk = 257;
var kare3_x_ilk = 1090;
var kare3_y_ilk = 257;

var kare1_x = 230;
var kare1_y = 257;
var kare2_x = 660;
var kare2_y = 257;
var kare3_x = 1090;
var kare3_y = 257;

var top1;
var kare1;
var kare2;
var kare3;

// Oyun içinde kullanılacak 3 kare ve 1 top için ölçüler tanımlandı.

var top_kareye_geldi_mi = 0;


var arttir = 1; // Hız için arttırma değişkeni tanımlandı.
var zamanSayaci = 0; // Kutuların belirli bir süre karışması için sayaç tanımlandı.

var xSpeed1 = Math.floor(Math.random() * 3) + arttir;
var ySpeed1 = Math.floor(Math.random() * 3) + arttir;
var xSpeed2 = Math.floor(Math.random() * 3) + arttir;
var ySpeed2 = Math.floor(Math.random() * 3) + arttir;
var xSpeed3 = Math.floor(Math.random() * 3) + arttir;
var ySpeed3 = Math.floor(Math.random() * 3) + arttir;

// Her bir kutunun x ve y düzlemlerinde rastgele hızda ve rastgele yönde hareketleri tanımlandı.

var kutu_resim = new Image();
kutu_resim.src = 'mcol-open-box.svg';

// Kutu resmi oluşturuldu.

var top_resim = new Image();
top_resim.src = 'top.png';

// Top resmi oluşturuldu.


// Burada bir Top sınıfı oluşturuldu. Top oluşturulduktan sonra üzerine top resminin giydirilmesi için bu sınıfın içeriğinden yararllanıldı.

class Top {
    constructor(c, tr, a, b, r) {
      this.c = c;
      this.tr = tr;
      this.a = a;
      this.b = b;
      this.r = r;
    }
    
    top_olustur(c, tr, a, b, r) {

    c.beginPath();
    c.arc(a, b, r, 0, Math.PI * 2, false);
    c.strokeStyle = "red";
    c.stroke();

    // Top oluşturuldu. 

    tr.onload = function() {

        var width_to_height_ratio = top_resim.width / top_resim.height;
        var height_to_width_ratio = top_resim.height / top_resim.width;

        var scaled_width = r * 2 * width_to_height_ratio;
        var scaled_height = r * 2 * height_to_width_ratio;

        var x = a - (scaled_width / 2);
        var y = b - (scaled_height / 2);

        // Burada top resminin ölçüleri topun ölçülerine göre yeniden boyutlandırıldı. 

        ctx.drawImage(top_resim, x, y, scaled_width, scaled_height);
  
      };

    }


  }
 

function oyun_girisi() { // Bu fonksiyonda oyunun başlangıç görüntüsü oluşturldu.

kutu_resim.onload = function() {

    kare1 = ctx.drawImage(kutu_resim, kare1_x, kare1_y, 200, 200);
    kare2 = ctx.drawImage(kutu_resim, kare2_x, kare2_y, 200, 200);
    kare3 = ctx.drawImage(kutu_resim, kare3_x, kare3_y, 200, 200);
 
};  

top1 = new Top(ctx, top_resim, cember_x, cember_y, cember_yari_cap);
top1.top_olustur(ctx, top_resim, cember_x, cember_y, cember_yari_cap);

return;

}


function topu_kareye_getir() { // Bu fonksiyonun amacı topun ortadaki karenin arkasına gelinceye kadar hareket etmesini sağlamaktır.


    if(cember_y >= 307){ // Topun ortadaki karenin arkasına gelip gelmediğin kontrol eder.
        
        top_kareye_geldi_mi=1;

        ctx.fillStyle = "#c22121";
        var karistir_butonu = ctx.fillRect(685, 600, 150, 70);

        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 2; 
        ctx.strokeRect(685, 600, 150, 70);

        ctx.fillStyle = "white"; 
        ctx.font = "bold 15px Arial"; 
        ctx.textAlign = "center"; 
        ctx.fillText("KARIŞTIR", 760, 640);

        // Bir sonraki aşamada kutuların yerlerini karıştırmaya başlanması için bir karıştır butonu oluşturulur. 

        cancelAnimationFrame(topu_kareye_getir);
        return;
    }
    else{

    // Burada ise topun ortadaki kareye hareketini sağlayacak şekilde animasyon oluşturuldu. 
        
    requestAnimationFrame(topu_kareye_getir);
    ctx.clearRect(0, 0, innerWidth, innerHeight);


    top1.top_olustur(ctx, top_resim, cember_x, cember_y, cember_yari_cap);


    var width_to_height_ratio = top_resim.width / top_resim.height;
    var height_to_width_ratio = top_resim.height / top_resim.width;

    var scaled_width = cember_yari_cap * 2 * width_to_height_ratio;
    var scaled_height = cember_yari_cap * 2 * height_to_width_ratio;

    var x = cember_x - (scaled_width / 2);
    var y = cember_y - (scaled_height / 2);

    ctx.drawImage(top_resim, x, y, scaled_width, scaled_height);

    kare1 = ctx.drawImage(kutu_resim, kare1_x, kare1_y, 200, 200);
    kare2 = ctx.drawImage(kutu_resim, kare2_x, kare2_y, 200, 200);
    kare3 = ctx.drawImage(kutu_resim, kare3_x, kare3_y, 200, 200);

    if(cember_y < 307)
        cember_y++; // Eğer top hala ortadaki kareye gelmediyse topu y koordinatında aşağı doğru konumunu günceller.

    }
    
}


function karistira_basildi_mi() { // Karıştır tuşuna basıldığında karıştırma işlemine başlanması için oluşturuldu. 
    
    // Bir adet 'click' dinleyici oluşturuldu. Burada karıştır butonu sınırları içerisine basılırsa karistir() fonksiyonu çağırılır.

    canvas.addEventListener('click', function dinleyici1(event) {

        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop;

        
        if (x >= 685 && x <= 835 && y >= 600 && y <= 670) {

            canvas.removeEventListener('click', dinleyici1);
            karistir();
            return;

        }
    });


    

}


function karistir() { // Kutuların yerlerinin rastgele bir şekilde bir süre boyunca karışmasını sağlamak için oluşturuldu.


    zamanSayaci++; // Sayaç başlatıldı.

   
    kare1_x += xSpeed1;
    kare1_y += ySpeed1;

    if (kare1_x + 200 > canvas.width || kare1_x < 0) {
        xSpeed1 = -xSpeed1;
    }
    if (kare1_y + 200 > canvas.height || kare1_y < 0) {
        ySpeed1 = -ySpeed1;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(kutu_resim, kare1_x, kare1_y, 200, 200);
    
    // Kare1 için rastgele bir şekilde hareket etme ve canvas kenarına çarparsa geri sekme için tanımlamalar yapıldı.

    kare2_x += xSpeed2;
    kare2_y += ySpeed2;

    if (kare2_x + 200 > canvas.width || kare2_x < 0) {
        xSpeed2 = -xSpeed2;
    }
    if (kare2_y + 200 > canvas.height || kare2_y < 0) {
        ySpeed2 = -ySpeed2;
    }

    ctx.drawImage(kutu_resim, kare2_x, kare2_y, 200, 200);

    // Kare2 için rastgele bir şekilde hareket etme ve canvas kenarına çarparsa geri sekme için tanımlamalar yapıldı.

    kare3_x += xSpeed3;
    kare3_y += ySpeed3;
    if (kare3_x + 200 > canvas.width || kare3_x < 0) {
        xSpeed3 = -xSpeed3;
    }
    if (kare3_y + 200 > canvas.height || kare3_y < 0) {
        ySpeed3 = -ySpeed3;
    }
    ctx.drawImage(kutu_resim, kare3_x, kare3_y, 200, 200);

    // Kare3 için rastgele bir şekilde hareket etme ve canvas kenarına çarparsa geri sekme için tanımlamalar yapıldı.

    if (zamanSayaci <= 1000) { // Eğer süre dolmadıysa animasyon devam edecektir.
        requestAnimationFrame(karistir);
    } 
    else { // Eğer süre dolduysa...

            cancelAnimationFrame(karistir);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(kutu_resim, kare1_x, kare1_y, 200, 200);
            ctx.drawImage(kutu_resim, kare2_x, kare2_y, 200, 200);
            ctx.drawImage(kutu_resim, kare3_x, kare3_y, 200, 200);

            // Kutuların son olarak bulunduğu konumda tekrar oluşturulması sağlanır.

            yerine_getir(); 

            return;

    }

}


function yerine_getir() { // Kutuların son bulunduğu konumdan eski yerlerine karışık sırada geri gelmesini sağlamak için oluşturuldu.

    if(kare1_x == kare2_x_ilk && kare2_x == kare3_x_ilk && kare3_x == kare1_x_ilk){ // Eğer kutular yeniden dizildilerse...

        cancelAnimationFrame(yerine_getir);

        ctx.fillStyle = "#c22121";
        ctx.fillRect(255, 500, 150, 70);

        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 2; 
        ctx.strokeRect(255, 500, 150, 70);

        ctx.fillStyle = "white"; 
        ctx.font = "bold 15px Arial"; 
        ctx.textAlign = "center"; 
        ctx.fillText("SEÇ", 330, 540);

        // En soldaki kutunun altında "SEÇ" butonu oluşturuldu.


        ctx.fillStyle = "#c22121";
        ctx.fillRect(685, 500, 150, 70);

        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 2; 
        ctx.strokeRect(685, 500, 150, 70);

        ctx.fillStyle = "white"; 
        ctx.font = "bold 15px Arial"; 
        ctx.textAlign = "center"; 
        ctx.fillText("SEÇ", 760, 540);

        // Ortadaki kutunun altında "SEÇ" butonu oluşturuldu.


        ctx.fillStyle = "#c22121";
        ctx.fillRect(1115, 500, 150, 70);

        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 2; 
        ctx.strokeRect(1115, 500, 150, 70);

        ctx.fillStyle = "white"; 
        ctx.font = "bold 15px Arial"; 
        ctx.textAlign = "center"; 
        ctx.fillText("SEÇ", 1190, 540);

        // En sağdaki kutunun altında "SEÇ" butonu oluşturuldu.

        kutu_sec();

        return;

    }

    else{ // Eğer kutular yerine gelmediyse...

        requestAnimationFrame(yerine_getir);

    if(kare1_x != kare2_x_ilk){ // Kutu yerine gelene kadar x ve y konumları güncellenir.
        if(kare1_x - kare2_x_ilk > 0)
            kare1_x--;
        else
            kare1_x++;

        if(kare1_y - kare2_y_ilk > 0)
            kare1_y--;
        else
            kare1_y++;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(kutu_resim, kare1_x, kare1_y, 200, 200);

    // Kutu yeniden çizilir.

    if(kare2_x != kare3_x_ilk){ // Kutu yerine gelene kadar x ve y konumları güncellenir.
        if(kare2_x - kare3_x_ilk > 0)
            kare2_x--;
        else
            kare2_x++;

        if(kare2_y - kare3_y_ilk > 0)
            kare2_y--;
        else
            kare2_y++;
    }
    ctx.drawImage(kutu_resim, kare2_x, kare2_y, 200, 200);

    // Kutu yeniden çizilir.

    if(kare3_x != kare1_x_ilk){ // Kutu yerine gelene kadar x ve y konumları güncellenir.
        if(kare3_x - kare1_x_ilk > 0)
            kare3_x--;
        else
            kare3_x++;

        if(kare3_y - kare1_y_ilk > 0)
            kare3_y--;
        else
            kare3_y++;
    }
    ctx.drawImage(kutu_resim, kare3_x, kare3_y, 200, 200);

    // Kutu yeniden çizilir.

    }

    
}

function kutu_sec () { // Seç tuşlarından birine bastığınızda doğru veya yanlış bildiğinizi bildirmek için oluşturuldu.

    canvas.addEventListener('click', function dinleyici2(event) { // En soldaki seç tuşu için 'click' dinleyici oluşturuldu.

        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop;

        
        if (x >= 255 && x <= 405 && y >= 500 && y <= 570) { // Eğer en soldaki seç tuşunun içine basarsa...

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial"; 
            ctx.textAlign = "center"; 
            ctx.fillText("ÜZGÜNÜM, BİLEMEDİNİZ.\n Puanınız : "+puan, canvas.width/2, canvas.height/2);
            ctx.strokeStyle = "black"; 
            ctx.lineWidth = 2; 
            ctx.strokeText("ÜZGÜNÜM, BİLEMEDİNİZ.\n Puanınız : "+puan, canvas.width/2, canvas.height/2);
            canvas.removeEventListener('click', dinleyici2);

            // Ekrana bilemediği ve bu zamana kadar üst üste kaç tane bildiği bastırılır.

            ctx.fillStyle = "#c22121";
            ctx.fillRect(685, 600, 150, 70);

            ctx.strokeStyle = "black"; 
            ctx.lineWidth = 2; 
            ctx.strokeRect(685, 600, 150, 70);

            ctx.fillStyle = "white"; 
            ctx.font = "bold 15px Arial"; 
            ctx.textAlign = "center"; 
            ctx.fillText("TEKRAR OYNA", 760, 640);

            // Tekrardan oyuna başlaması için bir buton oluşturulur.

            canvas.addEventListener('click', function dinleyici5(event) { // Tekrar oyna butonuna 'click' dinleyici eklenir.

                var x = event.clientX - canvas.offsetLeft;
                var y = event.clientY - canvas.offsetTop;
        
                
                if (x >= 685 && x <= 835 && y >= 600 && y <= 670) { // Eğer tekrar oynaya basılırsa...
        
                    canvas.removeEventListener('click', dinleyici5);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    arttir = 1;
                    puan = 0;
                    location.reload();

                    // Puan ve hız değerleri ilk haline döner ve sayfa yeniden yüklenir.
        
                }
            });            
            
        }
    });


    canvas.addEventListener('click', function dinleyici3(event) { // Ortadaki seç butonu için 'click' dinleyici oluşturuldu.

        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop;

        
        if (x >= 685 && x <= 835 && y >= 500 && y <= 570) { // Eğer ortadaki seç butonuna basarsa...

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial"; 
            ctx.textAlign = "center"; 
            ctx.fillText("ÜZGÜNÜM, BİLEMEDİNİZ.\n Puanınız : "+puan, canvas.width/2, canvas.height/2);
            ctx.strokeStyle = "black"; 
            ctx.lineWidth = 2; 
            ctx.strokeText("ÜZGÜNÜM, BİLEMEDİNİZ.\n Puanınız : "+puan, canvas.width/2, canvas.height/2);
            canvas.removeEventListener('click', dinleyici3);

            // Ekrana bilemediği ve bu zamana kadar üst üste kaç tane bildiği bastırılır.

            ctx.fillStyle = "#c22121";
            ctx.fillRect(685, 600, 150, 70);

            ctx.strokeStyle = "black"; 
            ctx.lineWidth = 2; 
            ctx.strokeRect(685, 600, 150, 70);

            ctx.fillStyle = "white"; 
            ctx.font = "bold 15px Arial"; 
            ctx.textAlign = "center"; 
            ctx.fillText("TEKRAR OYNA", 760, 640);

            // Tekrardan oyuna başlaması için bir buton oluşturulur.

            canvas.addEventListener('click', function dinleyici6(event) { // Tekrar oyna butonuna 'click' dinleyici eklenir.

                var x = event.clientX - canvas.offsetLeft;
                var y = event.clientY - canvas.offsetTop;
        
                
                if (x >= 685 && x <= 835 && y >= 600 && y <= 670) { // Eğer tekrar oyna butonuna basarsa...
        
                    canvas.removeEventListener('click', dinleyici6);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    arttir = 1;
                    puan = 0;
                    location.reload();

                    // Puan ve hız değerleri ilk haline döner ve sayfa yeniden yüklenir.
        
                }
            });

        }
    });


    canvas.addEventListener('click', function dinleyici4(event) { // En sağdaki seç butonu için 'click' dinleyici oluşturuldu.

        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop;

        
        if (x >= 1115 && x <= 1265 && y >= 500 && y <= 570) { // Eğer en sağdaki seç butonuna basarsa...

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial"; 
            ctx.textAlign = "center"; 
            ctx.fillText("TEBRİKLER !!! BİLDİNİZ.", canvas.width/2, canvas.height/2);
            ctx.strokeStyle = "black"; 
            ctx.lineWidth = 2; 
            ctx.strokeText("TEBRİKLER !!! BİLDİNİZ.", canvas.width/2, canvas.height/2);
            canvas.removeEventListener('click', dinleyici4);

            // Ekrana doğru bildiği yazısı basılır.

            ctx.fillStyle = "#c22121";
            ctx.fillRect(685, 600, 150, 70);

            ctx.strokeStyle = "black"; 
            ctx.lineWidth = 2; 
            ctx.strokeRect(685, 600, 150, 70);

            ctx.fillStyle = "white"; 
            ctx.font = "bold 15px Arial"; 
            ctx.textAlign = "center"; 
            ctx.fillText("DEVAM ET", 760, 640);

            // Oyuna devam etmesi için bir buton oluşturulur.

            canvas.addEventListener('click', function dinleyici7(event) { // Devam et butonuna 'click' dinleyici eklenir. 

                var x = event.clientX - canvas.offsetLeft;
                var y = event.clientY - canvas.offsetTop;
        
                
                if (x >= 685 && x <= 835 && y >= 600 && y <= 670) { // Eğer devam et butonuna basarsa...
        
                    canvas.removeEventListener('click', dinleyici7);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    arttir+=1;
                    puan+=1;
                    oyna();
                    return;

                    // Puan ve hız bir arttırılır ve oyun tekrardan bu değerler arttırılarak çağırılır.
        
                }
            });

        }
    });

}


function oyna () { // Oyunun oynanması için oluşturulmuş bir fonksiyondur.

canvas = document.getElementById("mycanvass");

canvas.width = window.innerWidth * 0.99;
canvas.height = window.innerHeight * 0.99;

ctx = canvas.getContext('2d');

cember_x = 760;
cember_y = 153.5;
cember_yari_cap = 30;

kare1_x_ilk = 230;
kare1_y_ilk = 257;
kare2_x_ilk = 660;
kare2_y_ilk = 257;
kare3_x_ilk = 1090;
kare3_y_ilk = 257;

kare1_x = 230;
kare1_y = 257;
kare2_x = 660;
kare2_y = 257;
kare3_x = 1090;
kare3_y = 257;

zamanSayaci = 0;

xSpeed1 = Math.floor(Math.random() * 3) + arttir;
ySpeed1 = Math.floor(Math.random() * 3) + arttir;
xSpeed2 = Math.floor(Math.random() * 3) + arttir;
ySpeed2 = Math.floor(Math.random() * 3) + arttir;
xSpeed3 = Math.floor(Math.random() * 3) + arttir;
ySpeed3 = Math.floor(Math.random() * 3) + arttir;


kutu_resim = new Image();
kutu_resim.src = 'mcol-open-box.svg';

top_resim = new Image();
top_resim.src = 'top.png';

// İlk baştaki tanımlamalar yapılır fakat hız ve puan tanımları ilk değerlerine döndürülmez !

    oyun_girisi();
    setTimeout(topu_kareye_getir,2000);
    setTimeout(karistira_basildi_mi,5000);
    return;

    // Tekrardan oyunun oynanması için gerekli fonksiyonlar çağırılır.

}

oyun_girisi(); // Giriş için çaığırılır.
setTimeout(topu_kareye_getir,2000); // Oyun girişi yüklendikten iki sainye sonra topun kareye gelmeye başlaması sağlanır.
setTimeout(karistira_basildi_mi,5000); // Top kareye geldiğinden sonra karıştıra basılması için 5 saniye sonra karistira_basildi_mi() çağırılır.

