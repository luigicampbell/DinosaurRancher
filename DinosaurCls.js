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
        abilities = [`attack`], //change to map
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

    addAbility(ability, decision)
    {
        if(decision === true && this.abilities.length < 3)
        {
            this.abilities.push(ability);
            console.log(`${this.name} learned ${ability}!`);
        }
        else if(decision === true && this.abilities.length >=4)
        {
            console.log(`${this.name} must replace an existing ability to learn ${ability}. Would you like to replace an ability?\n`);
            
            let forget = true; // get user input
            console.log(forget);
            if(forget)
            {
                console.log(`Choose an ability to forget: \n`);
                let moves = this.abilities.toString(), moveToForget, confirms;
                console.log(moves);
                // user picks ability
                moveToForget = 2; // change to user input
                // user confirms
                console.log(`$Are you sure ${this.name} should learn ${ability}?\n`);
                confirms = true;
                if(confirms === true)
                {
                    this.abilities[moveToForget] = ability;
                    console.log(`Rad, ${this.name} learned ${ability}!\n`);
                }
                else
                {
                    console.log(`Ok, ${this.name} kept its old abilities.\n`);
                }    
                console.log( `${this.name} is capable of ${this.abilities.toString()}. \n`);
            }
            else
            {
                console.log(`Ok, ${this.name} kept it's old abilities.\n`);
            } 
        }
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
        if(target.life < this.life / 2)
        {
            console.log('target life: ' + target.life);
            console.log('this life: ' + this.life);
            console.log(`${this.name} is preying on ${target.name}\n`);
            this.life < this.max ? this.life += 5 : this.isFast = false;
            this.isHungry = false;
            target.isDefeated = true;
            this.gainExp(target);
        }
        else
        {
            console.log(`${target.name} is still too strong to prey on...`);
        }
        this.checkStats();
    }

    sleep()
    {
        console.log(`${this.name} is sleeping\n`);
        this.life < this.max ? this.life += 10 : this.isFast = false;
        this.checkStats();
    }

    // set life to 0 after hitting lower limit
    attack(target)
    {   
        if(target.isDefeated === false)
        {    
            console.log(`${this.name} is attacking ${target.name} \n`);
            
            let damage = Math.floor( Math.random() * this.strength ) + 1;

            if(this.isFast)
            {   
                target.life -= damage;
                if(target.life >= 0)
                {
                    console.log( `${this.name} hit for ${damage} damage\n` );
                    console.log(target.checkStats() );
                }
                if(target.life <= 0)
                {
                    target.isDefeated = true;
                    target.life = 0;
                    console.log( target.checkStats() );
                    this.gainExp(target);
                }    
            }
            else
            {
                console.log(`${this.name} is groggy...`);
                let hit = Math.floor( Math.random() * 2 );
                hit === 1 ? target.life -= Math.floor( damage / 2 ) + 1 : console.log(`${this.name} missed...`);
                this.checkStats(); 
                if(target.life <= 0)
                {
                    target.isDefeated = true;
                    target.life = 0;
                    this.gainExp(target);
                }   
            }
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
        
        console.log(`${this.name} leveled up!\n`);
        for(let i = 0; i < level; i++)
        {
            // case statement for pushing abilities to the abilities array after certain levels
            this.max += Math.ceil( ( target.max  + ( target.experiencePoints / this.level ) ) / ( this.level * this.level ) );
            this.life += Math.ceil( ( target.max  + ( target.experiencePoints / this.level ) ) / ( this.level * this.level) );
            this.strength += target.strength + this.level + ( Math.ceil( Math.random () * target.uniqueValue ) + 1);
            this.evasion += target.evasion + this.level + ( Math.ceil( Math.random () * target.uniqueValue ) + 1); 
            this.defense += target.defense + this.level + ( Math.ceil( Math.random () * target.uniqueValue ) + 1); 
            this.intelligence += target.intelligence + this.level + ( Math.ceil( Math.random () * target.uniqueValue ) + 1); 
            this.speed += target.speed + this.level + ( Math.ceil( Math.random () * target.uniqueValue ) + 1);
        }
        console.log(this.checkStats() );
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
        abilities = [`attack`,`hide`],
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
        this.max = this.life;
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

const test = new Velociraptor();
test.name = `TEST`;
test.abilities.push('test1','test2','test3');
test.addAbility('NEW ABILITY', true);
