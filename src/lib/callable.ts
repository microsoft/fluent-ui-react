// https://jsperf.com/startdust-callable
const callable = (possibleFunction: any) => (...args: any[]) => {
  return typeof possibleFunction === 'function' ? possibleFunction(...args) : possibleFunction
}

export default callable
