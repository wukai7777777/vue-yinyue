function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1))
}

export function shuffle(arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandom(0, i);
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

export function debounce(func, delay) {
    let timer
    return function (...args) {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

export function throttle(fn, delay) {
    let flag = false
    return function (...arg) { //* 注意不能使用箭头函数 箭头函数 的this 是固定的 即在申明的时候确定而不是在调用时确定
      if(flag) {
        return false;
      }
      fn.apply(this, arg)
      flag = true

      setTimeout(() => {
        flag = false
      }, delay)
    }
  }