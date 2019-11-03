import React from 'react';
import CreateForm from '../../components/CreateForm';
import { Card } from 'antd';

class Create extends React.Component {
  render() {
    return (
      <Card >
        <CreateForm />
      </Card>
    )
  }
}

export default Create;
