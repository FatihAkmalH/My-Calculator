class Calculator {
    
    // untuk meletakkan angka didalam box
    constructor(calcPreviousText, calcNowText) {
        this.calcPreviousText = calcPreviousText;
        this.calcNowText = calcNowText;
        this.clear();
    }

    // menghapus semua element di box
    clear() {
        this.calcNowOperand = '';
        this.calcPreviousOperand = '';
        this.operation = undefined;
    }

    // untuk menghapus angka satu persatu
    delete() {
        // menghapus calcNowOperand dari angka terakhir
        this.calcNowOperand = this.calcNowOperand.toString().slice(0, -1);

    }

    // untuk menambah angka ketika diklik
    appendNumber(number) {
        // untuk membuat koma hanya ada 1
        if (number === '.' && this.calcNowOperand.includes('.')) return
        // menambah setiap angka yang diklik
        this.calcNowOperand = this.calcNowOperand.toString() + number.toString();
    }

    // untuk memilih operator
    chooseOpertator(operation) {
        // ketika calcNow kosong,  tidak jalankan program
        if (this.calcNowOperand === '') return
        // ketika calcPrevious tidak kosong, jalankan perhitungan
        if (this.calcPreviousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.calcPreviousOperand = this.calcNowOperand;
        this.calcNowOperand = '';
    }

    // untuk mengambil nilai didalam box dan menghitung setiap nilai
    compute() {
        let computation;
        const prev = parseFloat(this.calcPreviousOperand);
        const now = parseFloat(this.calcNowOperand);
        // jika user tidak input angka dan klik =, tidak jalankan operasi
        if (isNaN(prev) || isNaN(now)) return

        // membuat beberapa statement untuk perhitungan
        switch (this.operation) {
            case '+' :
                computation = prev + now;
            break;

            case '-' :
                computation = prev - now;
            break;

            case '*' :
                computation = prev * now;
            break;

            case '/' :
                computation = prev / now;
            break;

            default :
                return
        }
        // mengatur tampilan calcNow dalam perhitungan
        this.calcNowOperand = computation;
        this.operation = undefined;
        this.calcPreviousOperand = '';

    }

    // menambahkan pemisah nilai (koma)
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`; 
        } else {
            return integerDisplay;
        }
    }

    // update nilai setelah kalkulasi
    updateDisplay() {
        this.calcNowText.innerText = 
            this.getDisplayNumber(this.calcNowOperand);
        // menampilkan element sebelumnya jika operasi tidak null
        if (this.operation != null) {
            this.calcPreviousText.innerText = 
                `${this.getDisplayNumber(this.calcPreviousOperand)} ${this.operation}`;
        } else {
            this.calcPreviousText.innerText =  '';
        }
    }
}

// varibel dari data - data yang ada di html
const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-hasil]');
const deleteBtn = document.querySelector('[data-hapus]');
const allClearBtn = document.querySelector('[data-all-clear]');
const calcPreviousText = document.querySelector('[data-calc-previous]');
const calcNowText = document.querySelector('[data-calc-now]');

// membuat operasi variabel di object / class Calculator
const calculator = new Calculator(calcPreviousText, calcNowText);

// melakukan loop / perulangan untuk setiap angka ketika diklik
numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});


// melakukan loop setiap operator diklik
operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOpertator(button.innerText);
        calculator.updateDisplay();
    });
});

// kalkulasi angka
equalBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

// menghapus seluruh angka sekaligus
allClearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

// menghapus angka satu persatu
deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
