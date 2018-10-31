"use strict";
// TODO: extend the class for 4 objects
class Dinosaur
{
    constructor
    (
        max,
        name,
        type,
        isFast = false,
        isDefeated = false,
        abilities = [`attack`],
        isHungry = false,
        experiencePoints = 0,
        level = 1,
        life,
        strength,
        criticalValue,
        evasion,
        defense,
        intelligence,
        speed,
        uniqueValue
    )
    {
        this.max = max;
        this.name = name;
        this.type = type;
        this.isFast = isFast;
        this.isDefeated = isDefeated;
        this.abilities = abilities;
        this.isHungry = isHungry;
        this.experiencePoints = experiencePoints;
        this.level = level;
        // TODO: set up random values
        this.life = life;
        this.strength = strength;
        this.criticalValue = criticalValue;
        this.evasion = evasion;
        this.defense = defense;
        this.intelligence = intelligence;
        this.speed = speed;
        this.uniqueValue  = uniqueValue;
    }

    checkStats()
    {
        console.log(`STATS: \n`);
        console.log(`speed: ${this.speed}`);
        console.log(`max: ${this.max}`);
        console.log(`name: ${this.name}`);
        console.log(`type: ${this.type}`);
        console.log(`height: ${this.height}`);
        console.log(`isFast: ${this.isFast}`);
        console.log(`hungry: ${this.isHungry}`);
        console.log(`life: ${this.life}`);
        console.log(`level: ${this.level}`);
        console.log(`experience points: ${this.experiencePoints}`);
        console.log(`strength: ${this.strength}\n`);
    }

    prey(target)
    {
        if(target.life < this.life / 2);
        console.log(`${this.name} is preying on ${target.name}\n`);
        this.life < this.max ? this.life += 5 : this.isFast = false;
        this.isHungry = false;
        this.checkStats();
    }

    sleep()
    {
        alert(`${this.name} is sleeping\n`);
        this.life < max ? this.life += 10 : this.isFast = false;
        this.checkStats();
    }

    attack(target)
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
    }

    useAbility(ability)
    {
        console.log(`${this.name} used ${ability}`);
    }

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
    }

    levelUp(target, level)
    {   
        
        console.log(`${this.name} leveled up!`);
        for(let i = 0; i < level; i++)
        {
            // case statement for pushing abilities to the abilities array after certain levels
            this.max += Math.ceil( ( target.max  + ( target.experiencePoints / this.level ) ) / ( this.level * this.level ) );
            this.life += Math.ceil( ( target.max  + ( target.experiencePoints / this.level ) ) / ( this.level * this.level) );
            this.strength += target.strength + this.level + ( Math.ceil( Math.random () * target.uniqueValue ) + 1);
        }    
        this.checkStats();
    }
}

class Velociraptor extends Dinosaur
{
    constructor
    (
        max,
        name,
        type,
        isFast,
        isDefeated,
        abilities,
        isHungry,
        experiencePoints,
        level,
        life,
        strength,
        criticalValue,
        evasion,
        defense,
        intelligence,
        speed,
        uniqueValue
    )
    {
        super
        (
            max,
            name,
            type,
            isFast,
            isDefeated,
            abilities,
            isHungry,
            experiencePoints,
            level,
            life,
            strength,
            criticalValue,
            evasion,
            defense,
            intelligence,
            speed,
            uniqueValue
        );
        this.abilities = [`attack`,`hide`, `lunge`];
    }

}

const test = new Dinosaur();
console.log( test.checkStats() );

