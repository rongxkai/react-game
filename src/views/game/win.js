const win = {
    initParams: {
        grade: 3,  // 获胜条件
        mSize: 3,
        nSize: 3,  // 棋盘阶数
        FirstUser: 'X',
        SecondUser: 'O',  // 棋手填入棋盘的数据
        // qArray: null    // 棋盘数据组成的二维数组
    },
    // 初始化数据
    init(params) {
        this.initParams = {
            ...this.initParams,
            ...params
        }
        const mSize = this.initParams.mSize;
        const nSize = this.initParams.nSize;
        let arr = new Array(mSize);
        for (let m = 0; m < arr.length; m++) {
            arr[m] = new Array(nSize).fill(null)
        }
        // this.initParams.qArray = arr;
        return arr;

    },
    // 落子点 : qArray[mIndex][nIndex]
    // 判断是否满足赢棋条件：八个方向上，是否有grade数目的子连城一条线
    checkWin(qArray, mIndex, nIndex, userFlag) {
        const {
            left_right,
            top_bottom,
            leftTop_rightBottom,
            leftBottom_rightTop
        } = this.getAllNums(qArray, mIndex, nIndex, userFlag);
        console.log(left_right,
            top_bottom,
            leftTop_rightBottom,
            leftBottom_rightTop)
        if (left_right >= this.initParams.grade || top_bottom >= this.initParams.grade || leftTop_rightBottom >= this.initParams.grade || leftBottom_rightTop >= this.initParams.grade) {

            console.log(`${userFlag}赢了！！！`);
            return true;
        } else {
            console.log('游戏还远远没有结束呢！！！')
            return false;
        }

    },

    getAllNums(qArray, mIndex, nIndex, userFlag) {
        // 左  向左有多少个同色子连成一条线 【算上当前落子点】
        let leftNum = 0;
        for (let i = nIndex; i >= 0; i--) {
            if (qArray[mIndex][i] === userFlag) {
                leftNum++;
            } else {
                break;
            }
        }
        // 右  向右有多少个同色子连成一条线 【算上当前落子点】
        let rightNum = 0;
        for (let i = nIndex; i < this.initParams.nSize; i++) {
            if (qArray[mIndex][i] === userFlag) {
                rightNum++;
            } else {
                break;
            }
        }
        // 左右方向连子数目
        const left_right = leftNum + rightNum - 1;
        console.log(leftNum, rightNum)

        // 上   向上有多少个同色子连成一条线 【算上当前落子点】
        let topNum = 0;
        for (let i = mIndex; i >= 0; i--) {
            if (qArray[i][nIndex] === userFlag) {
                topNum++;
            } else {
                break;
            }
        }
        // 下   向下有多少个同色子连成一条线 【算上当前落子点】
        let bottomNum = 0;
        for (let i = mIndex; i < this.initParams.mSize; i++) {
            if (qArray[i][nIndex] === userFlag) {
                bottomNum++;
            } else {
                break;
            }
        }
        // 上下方向连子数目
        const top_bottom = topNum + bottomNum - 1;
        console.log(topNum, bottomNum)

        // 左上  向左上有多少个同色子连成一条线 【算上当前落子点】
        let leftTopNum = 0;
        for (let i = mIndex, j = nIndex; i >= 0 && j >= 0; i--, j--) {
            if (qArray[i][j] === userFlag) {
                leftTopNum++;
            } else {
                break;
            }
        }
        // 右下  向右下有多少个同色子连成一条线 【算上当前落子点】
        let rightBottomNum = 0;
        for (let i = mIndex, j = nIndex; i < this.initParams.mSize && j < this.initParams.nSize; i++, j++) {
            if (qArray[i][j] === userFlag) {
                rightBottomNum++;
            } else {
                break;
            }
        }
        // 上下方向连子数目
        const leftTop_rightBottom = leftTopNum + rightBottomNum - 1;
        console.log(leftTopNum, rightBottomNum)

        // 左下  向左下有多少个同色子连成一条线 【算上当前落子点】
        let leftBottomNum = 0;
        for (let i = mIndex, j = nIndex; i >= 0 && j < this.initParams.nSize; i--, j++) {
            if (qArray[i][j] === userFlag) {
                leftBottomNum++;
            } else {
                break;
            }
        }
        // 右上  向右上有多少个同色子连成一条线 【算上当前落子点】
        let rightTopNum = 0;
        for (let i = mIndex, j = nIndex; i < this.initParams.mSize && j >= 0; i++, j--) {
            if (qArray[i][j] === userFlag) {
                rightTopNum++;
            } else {
                break;
            }
        }
        const leftBottom_rightTop = leftBottomNum + rightTopNum - 1;
        console.log(leftBottomNum, rightTopNum)
        return {
            left_right,
            top_bottom,
            leftTop_rightBottom,
            leftBottom_rightTop
        }
    }
}

export default win;