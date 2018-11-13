// Irma and Luigi are going to visit Places
 
// We need 2 constructor functions: 1 for Persons and 1 for Places
// A CONSTRUCTOR FUNCTION makes copies of an OBJECT; that is their ONLY purpose

// to DEFINE a CONSTRUCTOR FUNCTION SIGNATURE we need 3 THINGS:
// the 'function' keyword, the name of the function and parameters

function makePerson( paramName, paramHasPassport, paramIsHappy ) // PARAMETERS ARE GENERAL
{
    // this is inside the BODY of the CONSTRUCTOR FUNCTION { ...BODY }
    // "this" is the Person object that we are going to make a copy out of

    // with the " . " dot operator you access the ATTRIBUTES 
    // Next the " = " (ASSIGNMENT OPERATOR) is used to assign the PARAMETERS to the ATTRIBUTES
    // the SEMICOLON " ; " is telling ASSIGNMENT OPERATOR that there is no more PARAMETERS to ASSIGN
    this.attributeName = paramName;
    this.attributeHasPassport = paramHasPassport;
    this.attributeIsHappy = paramIsHappy;
    this.attributeMemories = [];
    this.attributeIsHungry = true;
    this.attributePurchases = [];
    // the person object should be able to SIGHT-SEE, EAT, SHOP
    this.methodSightSee = function( paramPlace) 
    {
        // the place has been visited
        // a person gains a happy memory
        // place isVisited = true
        this.attributeMemories.push( paramPlace );
        this.attributeIsHappy = true;
        return `${this.attributeName} is happy they visited ${paramPlace}!`;
    };
    
    this.methodEat = function( paramFood )
    {
        this.attributeIsHungry = false;
        return `${this.attributeName} ate some ${paramFood} and isn't hungry anymore!`;
    };

    this.methodShop = function( paramClothes )
    {
        this.attributePurchases.push( paramClothes );
        return `${this.attributeName} bought some ${paramClothes}.`;
    };
}

const irma = new makePerson(`Irma`, true, false);
console.log( irma.methodShop(`Kate Spade Undies`) );