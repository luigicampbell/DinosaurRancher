"use strict";
const Prey =
{
    max: 14060,
    life: 120,
    name:'Hadrosaur',
    experiencePoints: 120050,
    strength: 13,
    uniqueValue: 2
};

const Dinosaur = 
{
    speed: 20,
    max: 60,
    name: 'Pet Velociraptor',
    type: 'Velociraptor',
    height: 6,
    isFast: true,
    hungry: false,
    life: 60,
    experiencePoints: 0,
    leveledUp: false,
    level: 1,
    strength: 15,
    uniqueValue: 7,

    checkStats: function()
    {
        console.log(`STATS: \n`);
        console.log(`speed: ${this.speed}`);
        console.log(`max: ${this.max}`);
        console.log(`name: ${this.name}`);
        console.log(`type: ${this.type}`);
        console.log(`height: ${this.height}`);
        console.log(`isFast: ${this.isFast}`);
        console.log(`hungry: ${this.hungry}`);
        console.log(`life: ${this.life}`);
        console.log(`levelUp: ${this.leveledUp}`);
        console.log(`level: ${this.level}`);
        console.log(`experience points: ${this.experiencePoints}`);
        console.log(`strength: ${this.strength}\n`);
    },

    prey: function(target)
    {
        if(target.life < this.life / 2);
        console.log(`${this.name} is preying on ${target.name}\n`);
        this.life < this.max ? this.life += 5 : this.isFast = false;
        this.hungry = false;
        this.checkStats();
    },
    sleep: function()
    {
        alert(`${this.name} is sleeping\n`);
        this.life < max ? this.life += 10 : this.isFast = false;
        this.checkStats();
    },
    attack:  function(target)
    {
        console.log(`${this.name} is attacking ${target.name} \n`);
        
        let damage = Math.floor( Math.random() * this.strength ) + 1;

        if(this.isFast)
        {
            target.life -= damage;
            console.log(`${this.name} hit for ${damage} damage`);
            this.checkStats();
        }
        else
        {
            console.log(`${this.name} is groggy...`);
            let hit = Math.floor( Math.random() * 2 );
            hit === 1 ? target.life -= Math.floor( damage / 2 ) + 1 : console.log(`${this.name} missed...`);
            this.checkStats();
        }    
    },
    gainExp(target)
    {
        let levelCap =
        {
            1: 25,
            2: 75,
            3: 150,
            4: 450,
            5: 1350,
            6: 4050,
            7: 12150,
            8: 36450,
            9: 109350,
            10: 220000,
            11: 262440,
            12: 290000,
            13: 300050,
            14: 328050,
            15: 350050
        };
        let levels = Object.keys(levelCap);
        let maxExp = 0;
        let exp = Math.round( target.experiencePoints / this.level );
        this.checkStats();
        this.experiencePoints += exp;
       for(let i = 0; i < levels.length; i++)
       {
           if(this.level === parseInt(levels[i]))
           {   
               let currentLevel = i + 1;
                maxExp = parseInt(levelCap[currentLevel]);
                if(this.experiencePoints >= maxExp)
                {
                    this.level++
                }  
           }
       }       
       this.levelUp(target, this.level);
    },
    levelUp: function(target, level)
    {   
        
        console.log(`${this.name} leveled up!`);
        for(let i = 0; i < level; i++)
        {
            this.max += Math.ceil( ( target.max  + ( target.experiencePoints / this.level ) ) / ( this.level * this.level ) );
            this.life += Math.ceil( ( target.max  + ( target.experiencePoints / this.level ) ) / ( this.level * this.level) );
            this.strength += target.strength + this.level + ( Math.ceil( Math.random () * target.uniqueValue ) + 1);
        }    
        this.checkStats();
    }

};

Dinosaur.gainExp(Prey);
