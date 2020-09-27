const getPower = (str) =>{
    let arr = []
    arr.push(str.split(' ').filter(v=>v.length>0))
    return arr[0]
}

export default getPower