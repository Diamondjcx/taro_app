import Taro, { Component } from "@tarojs/taro";
import { View, Input, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtButton, AtList, AtListItem } from 'taro-ui'

import { add, minus, asyncAdd } from "../../actions/counter";

import "./index.scss";

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    }
  })
)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      todos: [
        {
          title: "吃饭",
          done: false
        },
        {
          title: "睡觉",
          done: false
        },
        {
          title: "coding",
          done: false
        }
      ]
    };
  }
  inputChange = (e)=> {
    console.log(e.target.value);
    const newVal = e.target.value
    this.setState(() =>({
        val: newVal
    }));
  }
  addItem = () => {
      const {todos, val} = this.state;
      if (!val) return
      this.setState(() => ({
        todos: [...todos, {title: val, done: false}],
        val: ''
    }));
  }
  handleChange = (e, i) => {
    const todos = [...this.state.todos];
    todos[i].done = e.target.value;
    this.setState(() =>(
        todos
    ));
  }
  render() {
    const { todos, val } = this.state;
    return (
      <View className='index'>
        <Text>HelloWord</Text>
        <Input type='text' value={val} onInput={this.inputChange} placeholder='将会获取焦点' focus />
        {/* <Button onClick={this.addItem}>添加</Button> */}
        <AtButton onClick={this.addItem}>添加</AtButton>
        {todos.map((item, index) => { 
          return <View key={index}>
              <AtList>
                <AtListItem
                  title={item.title}
                  isSwitch
                  className={{'done':item.done}}
                  switchIsCheck={item.done}
                  onSwitchChange={(e) =>this.handleChange(e, index)}
                />
                </AtList>
          </View>;
        })}


      </View>
    );
  }
}

export default Index;
