export function buildDateOptionsSelector(month) {
  let numberOfDays;
  let dayOptionsArray = [];
  switch (parseInt(month)) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      numberOfDays = 31;
      break;
    case 2:
      numberOfDays = 29;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      numberOfDays = 30;
      break;
    default:
      numberOfDays = 0;
      break;
  }

  if (numberOfDays > 0) {
    for (let i = 1; i <= numberOfDays; i++) {
      dayOptionsArray.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
  } else {
    dayOptionsArray.push(
      <option key="no month" value={0}>
        Not Applicable
      </option>
    );
  }

  return dayOptionsArray;
}
