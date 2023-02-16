const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
        c.fillStyle = this.color;
        c.fill()
    }
}

class Projectile {
    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
        c.fillStyle = this.color;
        c.fill()
    }
    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class Enemy{
    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        console.log(this.velocity);
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
        c.fillStyle = this.color;
        c.fill()
    }
    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

const x = canvas.width / 2;
const y = canvas.height / 2; 


const player = new Player(x,y,30,'blue');
const projectiles = [];
const enemies = [];

function spawnEnemies() {
     setInterval(() => {
        let x
        let y;
        const radius = Math.random() * (30-10)+10
        if(Math.random() < 0.5){
            x = Math.random()< 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random()< 0.5 ? 0 - radius : canvas.height + radius
        }
        
        const color = "green"
        
        const angle = Math.atan2(canvas.height/2 - y ,canvas.width/2- x)

        const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
        }
        
        enemies.push(new Enemy(x,y,radius,color,velocity))
     }, 1000)
}


let animationId
function animate() {
    animationId = requestAnimationFrame(animate);
    c.clearRect(0,0,x*2,y*2)
    player.draw();
    projectiles.forEach(projectile => {
        projectile.update()
    })

    enemies.forEach((enemy, index) => {
        enemy.update()
        projectiles.forEach((projectile,projectileIndex)=>{
            const dist = Math.hypot(projectile.x - enemy.x,projectile.y - enemy.y)
            console.log(dist)
            //object touch
            
            if (dist - enemy.radius - projectile.radius < 1){
                setTimeout(() => {
                    enemies.splice(index,1);
                    projectiles.splice(projectileIndex,1)
                }, 0);
                
            }
        })
        
        const enemyDistance = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        console.log(enemyDistance);
        //end game
        if(enemyDistance - enemy.radius - player.   radius < 1) {
            cancelAnimationFrame(animationId);
        }
    })
   
    
}

addEventListener('click',(event) => 
    {
    const angle = Math.atan2(event.clientY - canvas.height/2,event.clientX - canvas.width/2)

    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(new Projectile (x,y,5,'red',velocity)
    )

    
})

animate();
spawnEnemies();