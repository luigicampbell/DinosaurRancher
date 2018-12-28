"use strict";
// TODO: extend the class for 4 objects
class Dinosaur
{
    constructor
    (
        max,
        name,
        environment,
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
        this.environment = environment;
        this.isFast = isFast;
        this.isDefeated = isDefeated;
        this.abilities = abilities;
        this.isHungry = isHungry;
        this.experiencePoints = experiencePoints;
        this.level = level;
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

    addAbility(ability)
    {
        if(this.abilities.length < 4)
        {
            this.abilities.push(ability);
            console.log(`${this.name} learned ${ability}!`);
        }
        else if(this.abilities.length >= 4)
        {
            console.log(`${this.name} must replace an existing ability to learn ${ability}. Would you like to replace an ability?\n`);
            
            let decision = true; // get user input
            // console.log(decision);
            if(!decision)
            {
                console.log(`Ok, ${this.name} kept it's old abilities.\n`);
            }
            else
            {
                while(decision) // do this until user picks ability
                {
                    console.log(`Choose an ability to forget: \n`);
                    let moves = this.abilities.toString(), moveToForget;
                    console.log(moves);
                    // user picks ability
                    moveToForget = 2; // change to user input
                    console.log(`Are you sure ${this.name} should replace ${this.abilities[moveToForget]} with ${ability}?\n`);
                    let confirm = true; // get user input
                    if(confirm)
                    {   
                        console.log(`Rad, ${this.name} forgot ${this.abilities[moveToForget]} and learned ${ability}!\n`);
                        this.abilities[moveToForget] = ability;
                        decision = false;
                    }
                    else
                    {
                        console.log(`Should ${this.name} keep it's old abilities? \n`);
                        let nevermind = true; // get user input
                        nevermind ? decision = false : decision = true;
                    }
                } 
                console.log( `${this.name} is capable of ${this.abilities.toString()}. \n`);   
            }
        }
    }

    checkStats()
    {
        return ` 
        name: ${this.name}\n
        max: ${this.max}
        environment: ${this.environment}
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
            console.log(`${target.name} is still too strong to prey on...\n`);
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
            
            let multiplier = Math.abs(Math.ceil(this.criticalValue - ( Math.floor( Math.random() * target.defense ) +1 ) ));
            console.log('multiplier: ' + multiplier);
            let damage = Math.floor( Math.random() * this.strength ) + 1;
            damage *= multiplier;
            if(this.isFast)
            {   
                // if target level is higher than this object, decrease 100% by level difference
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
    
    //implement on individual objects by overriding? or set ability definitions on each object
    useAbility(ability, target)
    {
        console.log(`${this.name} used ${ability}`);
        // case statement for abilities
        switch(ability) 
        {
            case 'attack':
                this.attack(target);
                break;
            default:
                console.log('no ability chosen');
        }
    }

    gainExp(target)
    {
        // implement unique level caps for all objects
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
                    this.level++;
                }  
           }
       }       
    //    console.log(this.level);
       
       this.levelUp(target, this.level);
    }

    levelUp(target, level)
    {   
        
        console.log(`${this.name} leveled up!\n`);
        for(let i = 0; i < level; i++)
        {
            // let abilitiesKeys = Object.keys(this.abilityMap);
            let abilityToPush = '';
            
            if(this.abilityMap[  i.toString()  ] != undefined)
            {
                console.log(this.abilityMap[ i.toString() ]);
                abilityToPush = this.abilityMap[ i.toString() ];
                this.addAbility(abilityToPush);
                // console.log(abilityToPush);
            }

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
        environment = `Savanah`,
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
            environment,
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
        this.abilityMap = 
        {
            5: 'lunge',
            9: 'eviscerate',
            13: 'stealth attack'
        };
        // write a method to determine if ability will land
        // this.hide = function(evasion) 
        // {
        //     console.log('something');
        // }

        this.lunge = function(target)
        {
            // if ability will land
            // target's defense and speed are lowered momentarily
            // does minimal damage
        }

        this.eviscerate = function(target)
        {
            // critical damage based on stats
        }

        this.stealthAttack = function(target, evasion)
        {
            // evasion is raised for one turn
            // critical damage on second turn
        }
    }
    hide(evasion) //this also works but constructor takes precedence and overrides
    {
        console.log(`I'm hiding....`);
        
    }

}
class Hadrosaur extends Dinosaur
{
    constructor
    (
        max,
        name = `Hadrosaur`,
        environment = `Wetlands`, //if in environment add boost
        isFast = false,
        isDefeated,
        abilities = [`attack`,`tail spin`],
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
            environment,
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
        this.abilityMap =
        {
            3: 'stomp',
            8: 'stampede',
            12: 'swim'
        };
    }
    stomp(target)
    {
        // strength based damage
    }

    stampede(target, defense)
    {
        // evasion of target is momentarily lowered
        // damage times random number of this object (1-3)
    }

    swim(target, evasion)
    {
        // momentarily raises evasion
        // target evasion is lowered
    }
}

class Triceratops extends Dinosaur
{
    constructor
    (
        max,
        name  = `Triceratops`,
        environment  = `Grassland`,
        isFast = false,
        isDefeated,
        abilities = [`attack`,`charge`],
        isHungry,
        experiencePoints,
        level,
        life = Math.floor( Math.random() * 3 ) + 50,
        strength = Math.floor( Math.random() * 10 ) + 30,
        criticalValue = Math.floor( Math.random() * 10 ) + 5,
        evasion = Math.floor( Math.random() *  7) + 1,
        defense = Math.floor( Math.random() * 5 ) + 30,
        intelligence = Math.floor( Math.random() * 3 ) + 5,
        speed = Math.floor( Math.random() * 7 ) + 10,
        uniqueValue = Math.floor( Math.random() * 5 ) + 1
    )
    {
        super
        (
            max,
            name,
            environment,
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
        this.abilityMap = 
        {
            4: 'charge',
            9: 'crush',
            15: 'impale'
        };
    }

    charge(target)
    {
        // strength based damage to target
    }
    
    crush(target)
    {
        // damage lowers defense of target momentarily
    }

    impale(target)
    {
        // critical damage ignores defense but not evasion
    }
    
}

class Quetzacoatl extends Dinosaur
{
    constructor
    (
        max,
        name = `Quetzacoatl`,
        environment = `highlands`,
        isFast = true,
        isDefeated,
        abilities = [`attack`,`grab and drop`],
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
            environment,
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
        this.abilityMap = 
        {
            2: 'gore',
            6: 'grab',
            11: 'kamikaze'
        };
    }

    gore(target)
    {
        // critical damage
    }

    grab(target)
    {
        // target is unable to move minimal damage
    }

    kamikaze(target, life)
    {
        // one life point is left but damage is dealt by factor of amount of life lost
    }
}


// const test = new Velociraptor();
// const test2 = new Hadrosaur();
// test.name = `TEST`;
// test2.experiencePoints = 500;
module.exports = {
    Dinosaur,
    Velociraptor,
    Hadrosaur,
    Triceratops,
    Quetzacoatl
}
