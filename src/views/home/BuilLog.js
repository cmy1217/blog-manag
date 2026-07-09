import React, { useState, useEffect } from 'react';
import { Button, Card, List, Typography } from 'antd';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const { Text } = Typography;

const BuilLog = () => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const client = new W3CWebSocket(`ws://${window.location.hostname}:3400`);

    client.onopen = () => {
      console.log('WebSocket Client Connected');

      // Send a heartbeat every 25 seconds
      const heartbeat = setInterval(() => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ type: 'heartbeat' }));
        }
      }, 25000); // 25 seconds

      return () => clearInterval(heartbeat);
    };

    client.onmessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    };

    client.onclose = () => {
      console.log('WebSocket Client Disconnected');
    };

    client.onerror = (error) => {
      console.log(error);

    }

    return () => {
      setMessages([])
      client.close();
    };
  }, []);

  const startScript = () => {
    setMessages([])
    fetch('/structure/blog')
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Card >
        <Button type="primary" onClick={startScript} style={{marginBottom: 20}}>
          开启构建
        </Button>
      <List
          bordered
          dataSource={messages}
          style={{whiteSpace: 'pre-wrap'}}
          renderItem={(item) => (
            <List.Item>
              <Text>{item}</Text>
            </List.Item>
          )}
        />
    </Card>
  );
};

export default BuilLog;
