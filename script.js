// อ้างอิง element ใน html
const balance = document.getElementById("balance");
const mplus = document.getElementById("mplus");
const mminus = document.getElementById("mminus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");



const dataTransaction = [
    { id: 1, text: "ค่าขนม", amount: -100 },
    { id: 2, text: "ค่าห้อง", amount: -3000 },
    { id: 3, text: "เงินเดือน", amount: 18000 },
    { id: 4, text: "ค่ารับงาน", amount: 3000 }

]

let transactions = dataTransaction;
// console.log(transection);


function init() {
    list.innerHTML = '';
    transactions.forEach(addDataToList);
    calculateMoney();
}


function addDataToList(transactions) {
    const symbo = transactions.amount < 0 ? '-' : '+';
    const status = transactions.amount < 0 ? 'minus' : 'plus';
    const item = document.createElement('li');
    item.classList.add(status);
    // item.innerHTML = 'ค่าซ่อมรถ <span>- 400</span><button class="delete-btn">x</button>';
    item.innerHTML = `${transactions.text}<span>${symbo}${Math.abs(transactions.amount)}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;
    list.appendChild(item);
}

function calculateMoney() {
    const amounts = transactions.map(transactions => transactions.amount); //map
    console.log(amounts);

    //คำนวนยอดคงเหลือ
    const total = amounts.reduce((result, i) => (result += i), 0).toFixed(2);
    console.log(total);

    //คำนวนรายรับ
    const income = amounts.filter(i => i > 0).reduce((result, i) => (result += i), 0).toFixed(2);
    console.log(income);

    //คำนวนรายจ่าย
    const expense = Math.abs(amounts.filter(i => i < 0).reduce((result, i) => (result += i), 0)).toFixed(2);
    console.log(expense);

    // const total_comma = formatNumber(total);
    // const income_comma = formatNumber(income);
    // const expense_comma = formatNumber(expense);

    //แสดงผลทางจอภาพ
    // balance.innerText = `฿${total_comma}`;
    // mplus.innerText = `฿${income_comma}`;
    // mminus.innerText = `฿${expense_comma}`;

    balance.innerText = `฿` + formatNumber(total);
    mplus.innerText = `฿` + formatNumber(income);
    mminus.innerText = `฿` + formatNumber(expense);

}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("กรุณากรอกข้อมูลให้ครบ");
    } else {
        // console.log(typeof(text.value));
        // console.log(typeof(+amount.value)); // ใส่ + เพื่อแปลง amount จากตัวหนังสือเป็นตัวเลข
        // console.log(autoID());

        const data = {
                id: autoID(),
                text: text.value,
                amount: Number.parseFloat(amount.value)
            }
            //console.log(`${data.amount} type = ${typeof(+amount.value)}`);
        transactions.push(data);
        addDataToList(data);
        calculateMoney();
        text.value = '';
    }
}

function autoID() {
    return Math.floor(Math.random() * 1000000)
}

function removeData(id) {
    // console.log("delete data" + id);
    transactions = transactions.filter(transactions => transactions.id !== id)
        /**
         *  1 2 3 => id = 1    ทำการลบ 1 ออกจากกลุ่ม
         *    2  3        แลเวทำการบันทึก  สมาชิกที่เหลือกลับเข้าไป
         */
    init();
}



form.addEventListener('submit', addTransaction);

init();