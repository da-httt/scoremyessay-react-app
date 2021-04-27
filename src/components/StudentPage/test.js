import React from 'react';

import { Table } from 'antd';

const columnsUser = [
    {
    title: 'STT',
    dataIndex: 'id',
    width: 70,
   },
  {
    title: 'Người dùng',
    dataIndex: 'username',
    width: 150,
    render: username => <div style={{color: 'blue'}}>{username}</div>,
  },
  {
    title: 'Số bài',
    dataIndex: 'numOfEssay',
   
  },
];


const dataUser=[
    {
        id: 1,
        username: 'pmdung',
        numOfEssay: '13'
    },
    {
        id: 2,
        username: 'ntcanh',
        numOfEssay: '29'
    },
    {
        id: 3,
        username: 'tdnam',
        numOfEssay: '17'
    },
    {
        id: 4,
        username: 'canhngo',
        numOfEssay: '2'
    },
    {
        id: 5,
        username: 'namhunter',
        numOfEssay: '10'
    },
]




const Test=(props)=>{
    return(
        <Table columns={columnsUser} dataSource={dataUser} pagination={{ pageSize: 3 }} scroll={{ y: 240 }}/>
    );
}

export default Test;