import React from 'react';
import { Table, Space, Divider, Button } from 'antd';

import './adminUsers.scss';
import Layout from 'antd/lib/layout/layout';
const columns = [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Validado',
    dataIndex: 'valido',
    key: 'age',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
  },
  {
    title: 'Acción',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button>Admin</Button>
        <Button>Borrar</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    nombre: 'John Brown',
    valido: 'true',
    email: 'adrtler@gmail.com',
    role: 'admin_role',
  },
  {
    key: '2',
    nombre: 'Jim Green',
    valido: 'true',
    email: 'test1@outlook.com',
    role: 'user_role',
  },
  {
    key: '3',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '4',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '5',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '6',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '7',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '8',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '9',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '10',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '11',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '12',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '13',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
  {
    key: '14',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
];

export const AdminUsers = () => {
  return (
    <Layout>
      <Divider orientation="left">Listado de usuarios</Divider>
      <Table
        bodyStyle={{ minHeight: 'calc(100vh - 210px)' }}
        scroll={{ x: 1000, y: 'calc(100vh - 310px)' }}
        pagination={{ pageSize: 6, position: ['bottomCenter'] }}
        columns={columns}
        dataSource={data}
      />
    </Layout>
  );
};
