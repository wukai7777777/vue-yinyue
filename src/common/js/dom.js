export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

export function hasClass(el, className) {
    let reg = RegExp('(^|\\s)' + className + '($|\\s)')
    return reg.test(el.className)
}

export function getData(el, name, val) {
    let prefix = 'data-' + name

    if (val) {
        return el.setAttribute(prefix, val)
    } else {
        return el.getAttribute(prefix)
    }

}