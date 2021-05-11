const grade = 3; // 获胜条件
const mSize = 3; const nSize = 3; // 棋盘阶数
let qArray = new Array(mSize).fill(new Array(nSize).fill(null)); // 棋盘数据组成的数组
const FirstUser = 'X'; const SecondUser = 'O';  // 棋手填入棋盘的数据

function initArr(mSize,nSize){
    let arr = new Array(mSize);
    for (let m = 0; m < arr.length; m++) {
        arr[m]= new Array(nSize).fill(null)   
    }
    return arr;
}

// 落子点 : qArray[mIndex][nIndex]
// 判断是否满足赢棋条件：八个方向上，是否有grade数目的子连城一条线
function checkWin(qArray , mIndex , nIndex , userFlag){

    const {
        left_right,
        top_bottom,
        leftTop_rightBottom,
        leftBottom_rightTop
    } = getAllNums(qArray , mIndex , nIndex , userFlag);
    console.log(left_right,
        top_bottom,
        leftTop_rightBottom,
        leftBottom_rightTop)
    if(left_right >= grade ||top_bottom >= grade ||leftTop_rightBottom >= grade ||leftBottom_rightTop >= grade){
        return `${userFlag}赢了！！！`
    }else{
        console.log('游戏还远远没有结束呢！！！')
    }
    
}

function getAllNums(qArray , mIndex , nIndex , userFlag){
    // 左  向左有多少个同色子连成一条线 【算上当前落子点】
    let leftNum = 0;
    for (let i = nIndex  ; i >= 0; i--) {
        if(qArray[mIndex][i] === userFlag){
            leftNum ++;
        }else{
            break;
        }
    }
    // 右  向右有多少个同色子连成一条线 【算上当前落子点】
    let rightNum = 0;
    for (let i = nIndex  ; i < nSize; i++) {
        if(qArray[mIndex][i] === userFlag){
            rightNum ++;
        }else{
            break;
        }
    }
    // 左右方向连子数目
    const left_right = leftNum + rightNum - 1;
    console.log(leftNum , rightNum)

    // 上   向上有多少个同色子连成一条线 【算上当前落子点】
    let topNum = 0;
    for (let i = mIndex  ; i >= 0; i--) {
        if(qArray[i][nIndex] === userFlag){
            topNum ++;
        }else{
            break;
        }
    }
    // 下   向下有多少个同色子连成一条线 【算上当前落子点】
    let bottomNum = 0;
    for (let i = mIndex  ; i < mSize; i++) {
        if(qArray[i][nIndex] === userFlag){
            bottomNum ++;
        }else{
            break;
        }
    }
    // 上下方向连子数目
    const top_bottom = topNum + bottomNum - 1;
    console.log(topNum , bottomNum)

    // 左上  向左上有多少个同色子连成一条线 【算上当前落子点】
    let leftTopNum = 0;
    for (let i = mIndex,j = nIndex  ; i >= 0 && j >= 0; i--,j--) {
        if(qArray[i][j] === userFlag){
            leftTopNum ++;
        }else{
            break;
        }
    }
    // 右下  向右下有多少个同色子连成一条线 【算上当前落子点】
    let rightBottomNum = 0;
    for (let i = mIndex,j = nIndex  ; i < mSize && j < nSize; i++,j++) {
        if(qArray[i][j] === userFlag){
            rightBottomNum ++;
        }else{
            break;
        }
    }
    // 上下方向连子数目
    const leftTop_rightBottom = leftTopNum + rightBottomNum - 1;
    console.log(leftTopNum , rightBottomNum)

    // 左下  向左下有多少个同色子连成一条线 【算上当前落子点】
    let leftBottomNum = 0;
    for (let i = mIndex,j = nIndex  ; i >= 0 && j < nSize; i--,j++) {
        if(qArray[i][j] === userFlag){
            leftBottomNum ++;
        }else{
            break;
        }
    }
    // 右上  向右上有多少个同色子连成一条线 【算上当前落子点】
    let rightTopNum = 0;
    for (let i = mIndex,j = nIndex  ; i < mSize && j >= 0; i++,j--) {
        if(qArray[i][j] === userFlag){
            rightTopNum ++;
        }else{
            break;
        }
    }
    const leftBottom_rightTop = leftBottomNum + rightTopNum - 1;
    console.log(leftBottomNum , rightTopNum)
    return {
        left_right,
        top_bottom,
        leftTop_rightBottom,
        leftBottom_rightTop
    }
}