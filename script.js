let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

document.getElementById('purchase-btn').addEventListener('click', function() {
  let cash = parseFloat(document.getElementById('cash').value);
  let changeDue = cash - price;
  let changeArray = [];
  let status = '';

  if (cash < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }

  let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);

  if (parseFloat(totalCid) < changeDue) {
    status = 'INSUFFICIENT_FUNDS';
  } else if (parseFloat(totalCid) === changeDue) {
    status = 'CLOSED';
    changeArray = cid;
  } else {
    let change = calculateChange(changeDue, cid);
    if (change.totalChange < changeDue) {
      status = 'INSUFFICIENT_FUNDS';
    } else {
      status = 'OPEN';
      changeArray = change.changeArray;
    }
  }

  document.getElementById('change-due').innerText = `Status: ${status} ${formatChangeArray(changeArray)}`;
});

function calculateChange(changeDue, cid) {
  const currencyUnits = [
    ['ONE HUNDRED', 100],
    ['TWENTY', 20],
    ['TEN', 10],
    ['FIVE', 5],
    ['ONE', 1],
    ['QUARTER', 0.25],
    ['DIME', 0.1],
    ['NICKEL', 0.05],
    ['PENNY', 0.01]
  ];

  let changeArray = [];
  let totalChange = 0;

  for (let [unit, value] of currencyUnits) {
    let amountInDrawer = cid.find(item => item[0] === unit)[1];
    let amountToReturn = 0;

    while (changeDue >= value && amountInDrawer > 0) {
      changeDue -= value;
      changeDue = changeDue.toFixed(2);
      amountInDrawer -= value;
      amountToReturn += value;
      totalChange += value;
    }

    if (amountToReturn > 0) {
      changeArray.push([unit, amountToReturn]);
    }
  }

  return { totalChange, changeArray };
}

function formatChangeArray(changeArray) {
  return changeArray.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(' ');
}