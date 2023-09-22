import { Card, Button, Space } from 'antd';
import { TODOLIST_TITLE_MAP, OPT_BTN_COLOR_MAP, OPT_BTN_TEXT_MAP } from '../../constants';

const SomeTodoList = ({
  status = 0,
  todoList = [],
  onTask = () => {}
}) => {
  const handleTask = (item) => {
    onTask(item);
  }

  return (
    <Card title={TODOLIST_TITLE_MAP[status]} headStyle={{ textAlign: 'left' }}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {
          todoList.map(item => (
            <Card
              key={item.id}
              title={item.title}
              extra={<Button style={{ color: OPT_BTN_COLOR_MAP[item.status] }} onClick={() => handleTask(item)}>{OPT_BTN_TEXT_MAP[item.status]}</Button>}
              headStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', fontSize: '14px', textAlign: 'left', padding: '8px 16px' }}
              bodyStyle={{ textAlign: 'left', padding: '16px' }}
            >
              <p style={{ margin: 0 }}>{item.content}</p>
            </Card>
          ))
        }
      </Space >
    </Card>
  )
}

export default SomeTodoList;