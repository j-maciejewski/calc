const calc = new Calc(
  {
    numberTop: document.querySelector('.screen .number-top'),
    operation: document.querySelector('.screen .operation'),
    numberBottom: document.querySelector('.screen .number-bottom'),
  },
  {
    numbers: document.querySelectorAll('.number-tile'),
    actions: document.querySelectorAll('.action-tile')
  },
)
calc.init()
