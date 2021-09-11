
const canvas = document.getElementById('canvas1');

const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particuleTab;

class Particule{
    constructor(x, y, directionX, directionY, taille, couleur){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.taille = taille;
        this.couleur = couleur;
    }

    dessine(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.taille, Math.PI * 2, false);
        ctx.fillStyle = this.couleur;
        ctx.fill();
    }

    MAJ(){
        if(this.x + this.taille > canvas.width || this.x - this.taille < 0){
            this.directionX = -this.directionX;
        } 
        if(this.y + this.taille > canvas.height || this.y - this.taille < 0){
            this.directionY = -this.directionY;
        }
        if(this.directionX < -1 || this.directionX > 1){
            directionX = (Math.random() * 2) - 1;
        }
        if(this.directionY < -1 || this.directionY > 1){
            directionY = (Math.random() * 2) - 1;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.dessine();
    }
}

// const obj1 = new Particule(100,100,50,50,100,"black");
// obj1.dessine();

function init(){
    particuleTab = [];
    for(let i = 0; i < 100; i++){
        let taille = (Math.random() + 0.01) * 20;
        do{
            randomX = Math.random() * window.innerWidth;
        } while(randomX < 0 + taille || randomX > window.innerWidth - taille);
        x = randomX;
        do{
            randomY = Math.random() * window.innerWidth;
        } while(randomY < 0 + taille || randomY > window.innerHeight - taille);
        y = randomY;
        
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let couleur = "white";

        particuleTab.push(new Particule(x,y,directionX,directionY,taille,couleur));
    }
}

function animation(){
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let i = 0; i < particuleTab.length; i++){
        particuleTab[i].MAJ();
    }
}

init();
animation();

function resize(){
    init();
    animation();
}

let doIt;
window.addEventListener('resize', () => {
    clearTimeout(doIt);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    doIt = setTimeout(resize, 1000);
})