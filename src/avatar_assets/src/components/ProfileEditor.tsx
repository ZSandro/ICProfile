import { remove, set } from "local-storage";
import React from "react";
import {
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import {Button, Modal, List, Avatar, Image, Row, Col} from 'antd'
interface Props {
  enterEditing: (id: number) => void;
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
    setVisible(false);
  };
  const handleItemClick = (id: number) => {
    props.enterEditing(id)
    console.log(id)
  };
  const testUrl = 'https://s3.amazonaws.com/appforest_uf/f1638965014561x223953153292650000/twitter%20%284%29.svg'
  const items = [
      {
          id: 0,
          title: '基础信息',
          url: testUrl
      },
      {
          id: 1,
          title: 'NFT橱窗',
          url: testUrl
      }
  ]
  const data = [
  {
    id: 0,
    url: testUrl,
    title: '基础信息',
  },
  {
    id: 1,
    url: testUrl,
    title: 'NFT橱柜',
  },
];

  function generateModuleItems() {
        const viewList =  items.map(
                (item) => (
                    <Col span={6}>
                        <div className="editor_modal_item">
                        <Image
                            preview={false}
                            width={60}
                            height={60}
                            src={item.url}
                        />
                        <p>{item.title}</p>
                        </div>
                    </Col>
                )
        )
        return viewList;
  }

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
            title="创建模块"
            visible={visible}
            onOk={handleOk}
            width={700}
            onCancel={handleCancel}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="start">
                { generateModuleItems() }
            </Row>    

      </Modal>
    </div>
  );
};

export default ProfileEditor;