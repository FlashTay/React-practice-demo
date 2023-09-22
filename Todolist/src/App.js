import { useState, useRef } from 'react';
import { Row, Col, Modal, Form, Input } from 'antd';
import './App.css';
import Summary from './components/Summary';
import { STATUS_MAP } from './constants';
import AllTodoList from './components/AllTodoList';
import SomeTodoList from './components/SomeTodoList';

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 0,
      title: '第一天的任务',
      content: '熟悉zent组件',
      status: STATUS_MAP.TODO,
      updateTs: (new Date(2023, 5, 9)).getTime(),
    },
    {
      id: 1,
      title: '第二天的任务',
      content: '开发一个TODOLIST',
      status: STATUS_MAP.DOING,
      updateTs: (new Date(2023, 6, 9)).getTime(),
    },
    {
      id: 2,
      title: '第三天的任务',
      content: '熟悉Node 和 Dubbo的适用',
      status: STATUS_MAP.DONE,
      updateTs: (new Date(2023, 7, 9)).getTime(),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateTask, setIsCreateTask] = useState(true);
  const [formData, setFormData] = useState({
    taskName: '',
    taskDesc: ''
  });

  const formRef = useRef(null);

  const handleCreate = () => {
    setIsModalOpen(true);
    setIsCreateTask(true);
    setFormData({
      taskName: '',
      taskDesc: ''
    });
  }

  const handleTask = (item, isLook) => {
    if (item.status === STATUS_MAP.DONE || isLook) {
      setIsModalOpen(true);
      setIsCreateTask(false);
      setFormData({
        taskName: item.title,
        taskDesc: item.content
      });
    } else {
      const temp = [...todoList].map(todoItem => ({
        ...todoItem,
        status: todoItem.id === item.id ? todoItem.status + 1 : todoItem.status,
        updateTs: todoItem.id === item.id ? Date.now() : todoItem.updateTs
      }));
      setTodoList(temp);
    }
  }

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.validateFields().then(res => {
        const temp = [...todoList];
        temp.push({
          id: Math.random(),
          title: res.taskName,
          content: res.taskDesc,
          status: STATUS_MAP.TODO,
          updateTs: Date.now()
        });
        setTodoList(temp);
        setIsModalOpen(false);
      }).catch(err => {
        console.log(err);
      });
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="App">
      <Summary onTask={(item) => handleTask(item, true)} todoList={todoList} />
      <div style={{ marginTop: '18px' }}>
        <Row gutter={12}>
          <Col span={6}>
            <AllTodoList onCreate={handleCreate} onTask={handleTask} todoList={todoList.sort((a, b) => a.updateTs - b.updateTs)} />
          </Col>
          <Col span={6}>
            <SomeTodoList onTask={handleTask} status={STATUS_MAP.TODO} todoList={todoList.filter(item => item.status === STATUS_MAP.TODO).sort((a, b) => a.updateTs - b.updateTs)} />
          </Col>
          <Col span={6}>
            <SomeTodoList onTask={handleTask} status={STATUS_MAP.DOING} todoList={todoList.filter(item => item.status === STATUS_MAP.DOING).sort((a, b) => a.updateTs - b.updateTs)} />
          </Col>
          <Col span={6}>
            <SomeTodoList onTask={handleTask} status={STATUS_MAP.DONE} todoList={todoList.filter(item => item.status === STATUS_MAP.DONE).sort((a, b) => a.updateTs - b.updateTs)} />
          </Col>
        </Row>
      </div>

      {
        isModalOpen &&
        <Modal
          title={isCreateTask ? '新建任务' : '任务详情'}
          open={true}
          cancelButtonProps={{ style: { display: isCreateTask ? 'inline-block' : 'none' } }}
          okButtonProps={{ style: { display: isCreateTask ? 'inline-block' : 'none' } }}
          onOk={handleSubmit}
          onCancel={handleCloseModal}
        >
          {
            isModalOpen &&
            <Form
              ref={formRef}
              name="basic"
              initialValues={formData}
              autoComplete="off"
              style={{ marginTop: '22px' }}
            >
              <Form.Item
                label="任务名称"
                name="taskName"
                rules={[{ required: true, min: 2, max: 20, message: '任务名称为2-20个字' }]}
              >
                <Input value={formData.taskName} onChange={(value) => setFormData({
                  ...formData,
                  taskName: value,
                })} disabled={!isCreateTask} />
              </Form.Item>

              <Form.Item
                label="任务描述"
                name="taskDesc"
                rules={[{ required: true, message: '说说自己要干什么' }]}
              >
                <Input value={formData.taskDesc} onChange={(value) => setFormData({
                  ...formData,
                  taskDesc: value
                })} disabled={!isCreateTask} />
              </Form.Item>
            </Form>
          }
        </Modal>
      }
    </div>
  );
}

export default App;
