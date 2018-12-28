"use strict";
const { Dinosaur, Velociraptor, Hadrosaur, Triceratops, Quetzacoatl } = require('./DinosaurCls.js');

class Battle 
{
    constructor
    (

    )
    {

    }

    progressBattle(user, target)
    {
        console.log(`Battle Starting...`);
        
        let battleOver = false;
        while(!battleOver)
        {
            // user gets an option
            // target cycles through abilities randomly (eventually based on user's stats)
            const userChoicesArr = user.abilities;
            const targetChoicesArr = target.abilities;
            let choice = 0; // user input

            console.log(`Choose an ability...`);
            // user chooses slot in array
            choice = 0;
            // turn based logic here
            user.useAbility(userChoicesArr[choice], target);
            if(user.life <= 0 || target.life <= 0)
            {
                battleOver = true;
            }
        }
        console.log(`Battle Over`);
        
    }
    
}


const battle = new Battle();
const copy1 = new Velociraptor();
const copy2 = new Hadrosaur();
battle.progressBattle(copy1,copy2);