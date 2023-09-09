import { useState } from 'react';
import { List, Rate, Button, Input } from 'antd';
import PIC_1 from '../../assets/1.jpg';
import PIC_2 from '../../assets/2.jpg';
import PIC_3 from '../../assets/3.jpg';
import './index.css';

const originData = [
  {
    orderId: 1,
    productName: '百香果',
    description: '需要两根吸管',
    num: 1,
    unit: '杯',
    score: 3,
    evaluation: 'very good',
    price: 20,
    priceUnit: '￥',
    pic: PIC_1
  },
  {
    orderId: 2,
    productName: '肥牛石锅拌饭',
    description: '少放辣',
    num: 1,
    unit: '份',
    score: 3,
    evaluation: '',
    price: 28,
    priceUnit: '￥',
    pic: PIC_2
  },
  {
    orderId: 3,
    productName: '冻酸奶',
    description: '',
    num: 1,
    unit: '杯',
    score: 3,
    evaluation: 'need to improve',
    price: 10,
    priceUnit: '￥',
    pic: PIC_3
  }
]

const OrderList = () => {
  const [list, setList] = useState(originData.map(item => ({
    ...item,
    isShowExtra: false,
    inputEvaluation: '',
    inputRate: 0
  })));

  const handleToggleExtra = (item) => {
    const temp = list.map(order => (
      item.orderId === order.orderId ? {
        ...order,
        isShowExtra: !item.isShowExtra
      } : {
        ...order
      }
    ));
    setList(temp)
  }

  const handleEvaluate = (e, item) => {
    const temp = list.map(order => (
      item.orderId === order.orderId ? {
        ...order,
        inputEvaluation: e.target.value
      } : {
        ...order
      }
    ));
    setList(temp)
  }

  const handleRate = (value, item) => {
    const temp = list.map(order => (
      item.orderId === order.orderId ? {
        ...order,
        inputRate: value
      } : {
        ...order
      }
    ));
    setList(temp)
  }

  const handleSubmit = (item) => {
    const temp = list.map(order => (
      item.orderId === order.orderId ? {
        ...order,
        evaluation: item.inputEvaluation,
        rate: item.inputRate
      } : {
        ...order
      }
    ));
    setList(temp)
  }

  const handleCancel = (item) => {
    const temp = list.map(order => (
      item.orderId === order.orderId ? {
        ...order,
        isShowExtra: false
      } : {
        ...order
      }
    ));
    setList(temp)
  }

  return (
    <List
      className='listWrapper'
      header={<div>我的订单</div>}
      bordered
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <div className='item'>
            <div className='basicInfo'>
              <img className='pic' src={item.pic} />
              <div className='right'>
                <div>
                  <div className='productName'>{item.productName}</div>
                  <div className='description'>{item.description}</div>
                </div>
                <div className='priceWrapper'>
                  <div>{`${item.priceUnit} ${item.price}`}</div>
                  <Button onClick={() => handleToggleExtra(item)} className={item.evaluation ? 'disabled' : ''} type={item.evaluation ? 'default' : 'primary'} danger={!item.evaluation}>{item.evaluation ? '已评价' : '评价'}</Button>
                </div>
              </div>
            </div>
            {
              item.isShowExtra &&
              <>
                {
                  item.evaluation ?
                  <div>{item.evaluation}</div> :
                  <Input.TextArea
                    value={item.inputEvaluation}
                    onChange={(e) => handleEvaluate(e, item)}
                    placeholder="please input evaluation..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                }
                <Rate disabled={item.evaluation} value={item.evaluation ? item.rate : item.inputRate} onChange={(value) => handleRate(value, item)} />
                {
                  !item.evaluation &&
                  <div style={{ marginTop: '16px' }}>
                    <Button type='primary' danger style={{ marginRight: '12px' }} onClick={() => handleSubmit(item)}>提交</Button>
                    <Button onClick={() => handleCancel(item)}>取消</Button>
                  </div>
                }
              </>
            }
          </div>
        </List.Item>
      )}
    />
  )
}

export default OrderList