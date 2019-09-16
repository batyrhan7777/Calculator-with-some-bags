let calculator = document.querySelector(".calculator");
let input = document.querySelector(".input");
calculator.addEventListener("click", calculate);

let operators = [
    {
        operator: "/",
        method: (a, b) => a / b
    },
    {
        operator: "*",
        method: (a, b) => a * b
    },
    {
        operator: "-",
        method: (a, b) => a - b
    },
    {
        operator: "+",
        method: (a, b) => a + b
    }
];

let obj = {
    str: "",
    targetList: []
};
function calculate({ target }) {
    if (target.tagName !== "DIV" || !target.classList.contains("button") && !target.classList.contains("clear")) return;
    console.log(target);

    switch (target.dataset.type) {
        case "=": {
            let result;
            let lastTarget = obj.targetList[obj.targetList.length-1];;

            let arr = convertToArray(obj.str);
            // if(lastTarget.classList.contains("operator") || arr.length < 3) return;
            console.log(arr);

            for (let i = 0; i < operators.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (operators[i]["operator"] == arr[j]) {
                        let leftoperand = parseFloat(arr[j - 1]);
                        let rightoperand = parseFloat(arr[j + 1]);
                        result = operators[i]["method"](leftoperand, rightoperand);
                        arr.splice(j - 1, 3, result);
                    }
                }
            }

            input.value = result;
            break;
        }
        case "clear": {
            [obj.str, obj.targetList] = ["", []];
            input.value = obj.str;
            break;
        }
        default: {
            if (obj.targetList.length === 0 && target.classList.contains("operator")) {
                return;
            } else if (obj.targetList.length) {
                if (obj.targetList[obj.targetList.length - 1].classList.contains("operator") && target.classList.contains("operator")) {
                    obj.targetList.pop();
                    obj.str = obj.str.slice(0, obj.str.length - 1);
                    input.value = obj.str + target.dataset.type;
                    return;
                }
            }

            obj.str += target.dataset.type;
            obj.targetList.push(target);
            input.value = obj.str;
        }
    }
}

function convertToArray(str) {
    let arr = [];
    let isLastNumber = false;
    for (let i = 0, j = 0; i < str.length; i++) {
        let parseVal = parseFloat(str[i]);
        if (typeof parseVal === "number" && !isNaN(parseVal) || str[i] === ".") {
            //перед ним стоит число
            if (isLastNumber) {
                //конкатенируем к числу
                arr[i - j] += str[i];
                //перед ним пусто либо стоит оператор
            } else {
                //добавляем в массив число
                arr.push(str[i]);
            }
            isLastNumber = true;
            j++;
            //тут уже добавляем в массив оператор
        } else {
            arr.push(str[i]);
            //последнее число уже не число, а оператор
            isLastNumber = false;
            j--;
        }
    }
    return arr;
}













