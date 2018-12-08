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
            choice = 1;
            user.useAbility(ueserChoicesArr[choice]);
            if(user.life <= 0 || target.life <= 0)
            {
                battleWon = true;
            }
        }
        console.log(`Battle Over`);
        
    }
    
}


const battle = new Battle();
const parent = new Dinosaur();
const copy1 = new Velociraptor();
copy1.hide('null');