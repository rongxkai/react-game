import React from 'react';
import './style.css';
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
		this.state = {
			squares: new Array(9).fill(null),
			role: null,
			firstRole: null,
			lock: false
		}
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
	}
	// 重置按钮
	reset() {
		this.setState({
			squares: new Array(9).fill(null),
			role: null,
			firstRole: null,
			lock: false
		})
	}

	// 落子
	handleClick(i) {
		console.log('handleClick');
		this.calculateWinner()
		this.setState({
			squares: this.state.squares.map((s, index) => { return i === index ? this.state.role : s }),
			role: this.state.role === 'X' ? 'O' : 'X'
		})
	}

	// 判断胜出着
	calculateWinner(squares) {
		console.log('check-win')
	}


	renderSquare(i) {
		return <Square index={i} value={this.state.squares[i]}
			onMove={() => this.handleClick(i)}
		/>;
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
						<div className="board-row">
							{this.renderSquare(0)}
							{this.renderSquare(1)}
							{this.renderSquare(2)}
						</div>
						<div className="board-row">
							{this.renderSquare(3)}
							{this.renderSquare(4)}
							{this.renderSquare(5)}
						</div>
						<div className="board-row">
							{this.renderSquare(6)}
							{this.renderSquare(7)}
							{this.renderSquare(8)}
						</div>
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
