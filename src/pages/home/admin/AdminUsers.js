import React from 'react';
import { Table, Space, Divider, Button } from 'antd';

import './adminUsers.scss';
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
    nombre: 'Jim Green',
    valido: 'true',
    email: 'test1@outlook.com',
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
    nombre: 'Jim Green',
    valido: 'true',
    email: 'test1@outlook.com',
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
    nombre: 'Jim Green',
    valido: 'true',
    email: 'test1@outlook.com',
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
    nombre: 'Jim Green',
    valido: 'true',
    email: 'test1@outlook.com',
    role: 'user_role',
  },
  {
    key: '11',
    nombre: 'Joe Black',
    valido: 'true',
    email: 'test2@outlook.com',
    role: 'user_role',
  },
];

export const AdminUsers = () => {
  return (
    <div>
      <Divider orientation="left">Listado de usuarios</Divider>
      <Table
        pagination={{ pageSize: 6, position: 'topLeft' }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
