import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { fetchTransactionsOfUser } from '../services/transactionService';

const EmployeeTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchTransactionsOfUser();
        setTransactions(response);
        console.log(transactions)
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'otherUserName',
      key: 'otherUserName',
    },
    {
      title: 'Net Amount',
      dataIndex: 'netAmount',
      key: 'netAmount',
      render: (amount) => (
        <Tag color={amount > 0 ? 'green' : 'red'}>
          ₹ {amount > 0 ? `+${amount}` : amount}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <h2>Employee Transactions</h2>
      <Table
        columns={columns}
        dataSource={transactions.map((item) => ({ ...item, key: item.otherUserId }))}
        loading={loading}
        bordered
      />
    </div>
  );
};

export default EmployeeTransactions;
