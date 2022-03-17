class Calc {
  #firstInput
  #operation
  #secondInput
  #screen
  #buttons

  constructor(_screen, _buttons) {
    this.#firstInput = '0'
    this.#operation = null
    this.#secondInput = null
    this.#screen = _screen
    this.#buttons = _buttons
  }

  #getUpdatedInput() {
    return this.#operation ? 'secondInput' : 'firstInput'
  }

  #printCalc() {
    if (this.#operation) {
      this.#screen.numberBottom.innerText = this.#secondInput
      this.#screen.operation.innerText = this.#operation
      this.#screen.numberTop.innerText = this.#firstInput
    } else {
      this.#screen.numberBottom.innerText = this.#firstInput
      this.#screen.operation.innerText = null
      this.#screen.numberTop.innerText = null
    }
  }

  #printError() {
    this.#firstInput = '0'
    this.#operation = null
    this.#secondInput = null

    this.#screen.numberBottom.innerText = 'ERROR'
    this.#screen.operation.innerText = null
    this.#screen.numberTop.innerText = null
  }

  #clearCalc() {
    this.#firstInput = '0'
    this.#operation = null
    this.#secondInput = null

    this.#printCalc()
  }

  #updateInput(num) {
    const updatedInput = this.#getUpdatedInput()

    eval(`
      if (this.#${updatedInput}.length > 10) {

      } else if (this.#${updatedInput} === '0' && String(num) !== '0') {
        this.#${updatedInput} = String(num)
      } else if (this.#${updatedInput} === '0' && String(num) === '0') {

      } else {
        this.#${updatedInput} = String(this.#${updatedInput}) + String(num)
      }
    `)

    this.#printCalc()
  }

  #updateSign(sign) {
    if (this.#firstInput !== null && this.#firstInput !== '0') {
      this.#operation = sign

      if (this.#secondInput === null) this.#secondInput = '0'

      this.#printCalc()
    }
  }

  #power(num) {
    const updatedInput = this.#getUpdatedInput()

    eval(`
      if (this.#${updatedInput} !== '0') {
        if (this.#${updatedInput}.slice(0, 1) === '-' && Number(this.#${updatedInput}) < 0) {
          this.#printError()
        } else {
          const result = Math.pow(this.#${updatedInput}, num)

          if (result > Number.MAX_SAFE_INTEGER) this.#printError()
          else { 
            this.#${updatedInput} = String(this.#fixNumber(result))
            this.#printCalc()
          }
        }
      }
    `)
  }

  #negate() {
    const updatedInput = this.#getUpdatedInput()

    eval(`
      if (this.#${updatedInput} !== null && this.#${updatedInput} !== '0') {
        this.#${updatedInput} = String(Number(this.#${updatedInput}) * -1)
        
        this.#printCalc()
      }
    `)
  }

  #return() {
    const updatedInput = this.#getUpdatedInput()

    if (updatedInput === 'secondInput' && this.#secondInput === '0') {
      this.#operation = null
    } else {
      eval(`
        if (this.#${updatedInput} !== '0') {
          if (this.#${updatedInput}.length === 1) this.#${updatedInput} = '0'
          else this.#${updatedInput} = this.#${updatedInput}.slice(0, -1)
        }
      `)
    }

    this.#printCalc()
  }

  #point() {
    const updatedInput = this.#getUpdatedInput()

    eval(`
      if (!this.#${updatedInput}.includes('.')) {
        this.#${updatedInput} += '.'
      }
    `)

    this.#printCalc()
  }

  #fixNumber(num) {
    return Math.round(num * 100) / 100
  }

  #calculate() {
    if (
      this.#firstInput !== null &&
      this.#operation !== null &&
      this.#secondInput !== null
    ) {
      const result = eval(
        `${this.#firstInput} ${this.#operation} ${this.#secondInput}`,
      )
      if (result > Number.MAX_SAFE_INTEGER) return this.#printError()

      this.#firstInput = String(this.#fixNumber(result))
      this.#operation = null
      this.#secondInput = '0'

      this.#printCalc()
    }
  }

  init() {
    this.#buttons.numbers.forEach(el => {
      const number = Number(el.innerText)
      el.addEventListener('click', evt => {
        this.#updateInput(number)
      })
    })

    const AVAILABLE_ACTIONS = {
      clear: 'clearCalc()',
      add: "updateSign('+')",
      subtract: "updateSign('-')",
      multiply: "updateSign('*')",
      divide: "updateSign('/')",
      calculate: 'calculate()',
      square: 'power(2)',
      squareRoot: 'power(0.5)',
      negate: 'negate()',
      return: 'return()',
      point: 'point()',
    }

    this.#buttons.actions.forEach(el => {
      const action = el.dataset.action
      el.addEventListener('click', () => {
        if (AVAILABLE_ACTIONS[action])
          eval(`this.#${AVAILABLE_ACTIONS[action]}`)
      })
    })

    this.#printCalc()
  }
}
