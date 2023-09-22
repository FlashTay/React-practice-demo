import { Card, Button, Space } from 'antd';
import { OPT_BTN_COLOR_MAP, OPT_BTN_TEXT_MAP } from '../../constants';

const AllTodoList = ({
  todoList = [],
  onCreate = () => {},
  onTask = () => {}
}) => {
  const handleTask = (item) => {
    onTask(item);
  }

  return (
    <Card title="所有任务" extra={<Button type="primary" onClick={onCreate}>新建任务</Button>}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {
          todoList.map(item => (
            <Card
              key={item.id}
              title={item.title}
              extra={<Button onClick={() => handleTask(item)} style={{ color: OPT_BTN_COLOR_MAP[item.status] }}>{OPT_BTN_TEXT_MAP[item.status]}</Button>}
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

export default AllTodoList;