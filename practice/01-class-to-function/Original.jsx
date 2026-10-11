import {Component} from 'react';
export default class Original extends Component {
  state = {count:0};
  startTimer = () => { this.timer = setInterval(() => this.setState(s => ({count:s.count+this.props.step})), 1000); };
  componentDidMount() {this.startTimer(); document.title = `Count: ${this.state.count}`;}
  componentDidUpdate(previousProps) {
    if (previousProps.step !== this.props.step) {clearInterval(this.timer); this.startTimer();}
    document.title = `Count: ${this.state.count}`;
  }
  componentWillUnmount() {clearInterval(this.timer);}
  render() {return <p>Count: {this.state.count}</p>;}
}
