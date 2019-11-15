//Dom Elements 
const resultEL = document.getElementById('result');
const lengthEL = document.getElementById('length');
const uppercaseEL = document.getElementById('uppercase');
const lowercaseEL = document.getElementById('lowercase');
const numbersEL = document.getElementById('numbers');
const symbolsEL = document.getElementById('symbols');
const generateEL = document.getElementById('generate');
const clipboardEL = document.getElementById('clipboard');


//Generate EventListener

generateEL.addEventListener('click', () => {
    const length = +lengthEL.value;
    const hasLower = lowercaseEL.checked;
    const hasUpper = uppercaseEL.checked;
    const hasNumber = numbersEL.checked;
    const hasSymbol = symbolsEL.checked;
    resultEL.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

//Copy password to Clipboard
clipboardEL.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEL.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!!!');
});
//Generate Password Functions 

const generatePassword = (upper, lower, number, symbol, length) => {
    //1. Init a password var 
    //2. Filter out unchecked types
    //3.Loop over the length calls generator function for each type
    //4.Add final password to the password var and return 
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    console.log(`typescount ${typesCount}`);
    const typesArr = [{
        lower
    }, {
        upper
    }, {
        number
    }, {
        symbol
    }].filter(item => Object.values(item)[0]);
    console.log('typeArr', typesArr);

    if (typesCount === 0) {
        return '';
    }
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            console.log('funcName :', funcName);
            generatedPassword += randomFunc[funcName]();
        });


    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}



//Generator functions

const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
const getRandomSymbol = () => {
    const symbols = `!@#$%^&*(){}[]=<>/,.`;
    return symbols[Math.floor(Math.random() * symbols.length)];
}




//Random Methods

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};