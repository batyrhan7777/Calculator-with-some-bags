// validate
// let str = "20+20*20"; //6
// let arr = [];
// const operatorsList = ["+", "-", "*", "/"];

// let isLastNumber = false;
// for (let i = 0, j = 0; i < str.length; i++) {
//     let parseVal = parseFloat(str[i]);
//     if (typeof parseVal === "number" && !isNaN(parseVal) || str[i] === ".") {
//         //перед ним стоит число
//         if (isLastNumber) {
//             //конкатенируем к числу
//             arr[i - j] += str[i];
//         //перед ним пусто либо стоит оператор
//         } else {
//             //добавляем в массив число
//             arr.push(str[i]);
//         }
//         isLastNumber = true;
//         j++;
//     //тут уже добавляем в массив оператор
//     } else {
//         arr.push(str[i]);
//         //последнее число уже не число, а оператор
//         isLastNumber = false;
//         j--;
//     }
// }
// console.log(arr);






// operation
let arr = ["10", "+", "10", "*", "10"];

const operators = [
    { 
        operator: "+",
        method: (a, b) => a + b
    },
    { 
        operator: "-", 
        method: (a, b) => a - b
    },
    { 
        operator: "*", 
        method: (a, b) => a * b
    },
    { 
        operator: "/", 
        method: (a, b) => a / b
    }
];

let result;
for (let i = 0; i < arr.length; i++) {
    for(let j = 0; j < operators.length; j++) {
        if(arr[i] == operators[j]["operator"]) {
            let leftoperand = parseFloat(arr[i-1]);
            let rightoperand = parseFloat(arr[i+1]);
            result = operators[j]["method"](leftoperand, rightoperand);
            arr.splice(i - 1, 3, result);
        }
    }
}

console.log(result);

