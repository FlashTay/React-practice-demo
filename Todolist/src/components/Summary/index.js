import { Carousel, Button } from 'antd';
import ICON_INFO from '../../assets/info.png';
import './index.css';

const Summary = ({
  todoList = [],
  onTask = () => {}
}) => {
  return (
    <div className="container">
      <Carousel dotPosition="right" autoplay dots={false}>
        {
          todoList.map(item => (
            <div className="item-wrapper" key={item.id}>
              <div className="top">
                <img src={ICON_INFO} className="icon" />
                <h3 className="title">{item.title}</h3>
              </div>
              <div className="bottom">
                <p className="content">{item.content}</p>
                <Button type="primary" onClick={() => onTask(item)}>查看详情</Button>
              </div>
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}

export default Summary;
