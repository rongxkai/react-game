import React from 'react';
import './style.css';
import win from './win.js';
class Square extends React.Component {
    constructor(props) {
        super(props);

        // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
        this.changeState = this.changeState.bind(this);
    }

    changeState() {
        console.log('click===', this.props.index)
        this.props.onMove()
    }

    render() {
        return (
            <button className="square" onClick={this.changeState}>
                {this.props.value}
            </button>
        );
    }
}
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initData();
        this.handleClick = this.handleClick.bind(this)
        this.setFirst = this.setFirst.bind(this)
        this.reset = this.reset.bind(this)
        this.start = this.start.bind(this)
    }
    // 选择先手
    setFirst(e) {
        console.log('setFirst', e.target.value)
        this.setState({
            // role:e.target.value,
            firstRole: e.target.value
        })
    }
    initData() {
        return {
            squares: win.init({
                grade: 5,  // 获胜条件
                mSize: 19,
                nSize: 19,  // 棋盘阶数
                FirstUser: 'X',
                SecondUser: 'O',  // 棋手填入棋盘的数据
            }),
            role: '',
            firstRole: '',
            lock: false
        }
    }
    // 开始
    start() {
        if (!this.state.firstRole) {
            alert('请选择先手角色');
            return
        }
        this.setState({
            role: this.state.firstRole,
            lock: true
        })
        console.log("init====", this.state);
    }
    // 重置按钮
    reset() {
        this.setState(this.initData())
    }

    // 落子
    handleClick(mIndex, nIndex) {
        console.log('handleClick');
        let qArray = this.state.squares;
        let userFlag = this.state.role;
        // 点击空白格子，则记录
        if (!qArray[mIndex][nIndex]) {
            qArray[mIndex][nIndex] = this.state.role;
            this.setState({
                squares: qArray,
                role: this.state.role === 'X' ? 'O' : 'X'
            })
        }

        if (this.calculateWinner(this.state.squares, mIndex, nIndex, userFlag)) {
            this.gameOver(userFlag)
        }
    }

    // 判断胜出着
    calculateWinner(qArray, mIndex, nIndex, userFlag) {
        console.log('check-win')
        return win.checkWin(qArray, mIndex, nIndex, userFlag)
    }
    // 游戏结束
    gameOver(userFlag) {
        console.log(`${userFlag}获得胜利`)
    }


    // 行数
    renderSquare(arr_M_N) {
        // 棋盘数据第一层【横向】
        if (arr_M_N instanceof Array) {
            return arr_M_N.map((mItem, mIndex) => <div className="board-row" m-index={mIndex} key={mIndex}>{this.checkerboard(mItem, mIndex)}</div>);
        } else {
            return <div>...</div>
        }
    }
    // 每行数据
    checkerboard(arr_N, mIndex) {
        if (arr_N instanceof Array) {
            return arr_N.map((nItem, nIndex) => <Square index={`${mIndex}-${nIndex}`} key={`${mIndex}-${nIndex}`} value={nItem} onMove={() => this.handleClick(mIndex, nIndex)} />);
        } else {
            return <div>...</div>
        }
    }

    render() {
        return (
            <div>
                <form>
                    X:<input type="radio" name="role" disabled={this.state.lock} value="X" onChange={this.setFirst}></input><br />
                    O:<input type="radio" name="role" disabled={this.state.lock} value="O" onChange={this.setFirst}></input><br />
                    <button type="reset" onClick={this.reset}>重置</button>
                </form>
                <button onClick={this.start}>开始</button>
                <div className="status">{`First player: ${this.state.firstRole || '未指定'}`}</div>
                <div className="status">{`Next player: ${this.state.role || '未指定'}`}</div>
                {this.state.lock ?
                    <div>
                        {this.renderSquare(this.state.squares)}
                    </div>
                    : null}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
