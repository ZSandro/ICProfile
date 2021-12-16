import { remove, set } from "local-storage";
import React from "react";
import {
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import {Button, Modal, List, Avatar, Card} from 'antd'
import { profilesMatch } from "../utils";
interface Props {
  enterEditing: () => void;
}

const ProfileEditor = (props: Props) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const handleItemClick = (item: number) => {
    if (item == 0) {
        props.enterEditing()
    } else {
        setVisible(true)
    }
  };
  const data = [
  {
    id: 0,
    title: '基础信息',
  },
  {
    title: '比特币钱包',
  },
  {
    title: 'Mirror',
  },
  {
    title: 'NFT橱柜',
  },
];

  return (
      
    <div className="editor_body">
        <Button className="editor_add_btn" type="primary" shape="round" size="large" 
            block onClick={showModal}>
          Add New Block
        </Button>
        <List
        itemLayout="horizontal"
        dataSource={data}
        split={false}
        renderItem={item => (
        <List.Item onClick={() => handleItemClick(item.id!)}>
            <div className="editor_home_list_item">
                <Avatar src="https://joeschmoe.io/api/v1/random" />
                <p>{item.title}</p>
            </div>
        </List.Item>
    )}
  />
        <Modal
            title="选择模块"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}>
            <div>
                <p>选择社交账号，富文本设计的面板，这里有很多的选项</p>
            </div>
      </Modal>
    </div>
  );
};

export default ProfileEditor;