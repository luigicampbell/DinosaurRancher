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

    rename(name)
    {
        this.name = name;
    }

    checkStats()
    {
        return ` 
        name: ${this.name}\n
        max: ${this.max}
        type: ${this.type}
        isFast: ${this.isFast}
        isDefeated: ${this.isDefeated}
        abilities: ${this.abilities}
        isHungry: ${this.isHungry}
        experiencePoints: ${this.experiencePoints}
        level: ${this.level}
        life: ${this.life}
        strength: ${this.strength}
        criticalValue: ${this.criticalValue}
        evasion: ${this.evasion}
        defense: ${this.defense}
        intelligence: ${this.intelligence}
        speed: ${this.speed}
        uniqueValue: ${this.uniqueValue}\n`;
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
        console.log(`${this.name} is sleeping\n`);
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
            this.checkStats();
            return `${this.name} hit for ${damage} damage`;
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
        name = `Velociraptor`,
        type = `Savanah`,
        isFast = true,
        isDefeated,
        abilities = [`attack`,`hide`, `lunge`],
        isHungry,
        experiencePoints,
        level,
        life = Math.floor( Math.random() * 5 ) + 25,
        strength = Math.floor( Math.random() * 5 ) + 10,
        criticalValue = Math.floor( Math.random() * 15 ) + 1,
        evasion = Math.floor( Math.random() * 9 ) + 20,
        defense = Math.floor( Math.random() * 3 ) + 5,
        intelligence = Math.floor( Math.random() * 8 ) + 15,
        speed = Math.floor( Math.random() * 10 ) + 25,
        uniqueValue = Math.floor( Math.random() * 9 ) + 1
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
    }

}
class Hadrosaur extends Dinosaur
{
    constructor
    (
        max,
        name = `Hadrosaur`,
        type = `Wetlands`,
        isFast = false,
        isDefeated,
        abilities = [`attack`,`tail spin`, `stomp`],
        isHungry,
        experiencePoints,
        level,
        life = Math.floor( Math.random() * 5 ) + 40,
        strength = Math.floor( Math.random() * 5 ) + 20,
        criticalValue = Math.floor( Math.random() * 7 ) + 1,
        evasion = Math.floor( Math.random() * 7 ) + 5,
        defense = Math.floor( Math.random() * 10 ) + 15,
        intelligence = Math.floor( Math.random() * 5 ) + 10,
        speed = Math.floor( Math.random() * 7 ) + 15,
        uniqueValue = Math.floor( Math.random() * 9 ) + 1
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
    }

}
class Triceratops extends Dinosaur
{
    constructor
    (
        max,
        name  = `Triceratops`,
        type  = `Grassland`,
        isFast = false,
        isDefeated,
        abilities = [`attack`,`charge`, `defend`],
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
    }

}
class Quetzacoatl extends Dinosaur
{
    constructor
    (
        max,
        name = `Quetzacoatl`,
        type = `flying`,
        isFast = true,
        isDefeated,
        abilities = [`attack`,`charge`, `defend`],
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
    }

}

// const test = new Velociraptor();
// console.log(test.checkStats());

// const test2 = new Hadrosaur();
// console.log(test2.checkStats());

// test.attack(test2);

const mall = new Dinosaur()