import { clear, remove, set } from "local-storage";
import { Form, Input, Button, Checkbox } from 'antd';
import { ActorSubclass } from "@dfinity/agent";
import React from "react";
import {
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { emptyProfile } from "../hooks";
import ProfileUpload from "./ProfileUpload";

interface Props {
  profile?: ProfileUpdate;
  submitCallback: (profile?: ProfileUpdate) => void;
  actor?: ActorSubclass<_SERVICE>;
}

class ProfileForm extends React.Component<Props> {
  state = { profile: emptyProfile };
  formRef = React.createRef();
  private mRealProfile?: ProfileUpdate = emptyProfile;

  constructor(props: Props) {
    super(props);
    this.mRealProfile = this.props.profile
  }

  componentDidMount() {
    if (this.props.profile) {
      this.setState({ profile: this.props.profile });
    }
  }

  handleChange(key: string, value: string) {
    //TODO 做一下值是否变化的判断，再进行更新
    if (this.mRealProfile) {
        switch(key) {
          case "about": this.mRealProfile.bio.about[0] = value; break;
          case "nickName": this.mRealProfile.bio.nickName[0] = value; break;
          case "location": this.mRealProfile.bio.location[0] = value; break;
        }
    }
    this.props.submitCallback(this.mRealProfile)
  }

  //TOOD 可参考handleChange处理方式
  handleImage(image: string) {
    this.props.submitCallback(this.mRealProfile)
  }

  handleSubmit() {
    this.props.submitCallback(this.mRealProfile)
  }

  render() {
    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const handleImage = this.handleImage.bind(this);
    return (
      <section>
        <ProfileUpload
          onChange={handleImage}
          defaultImage={this.props.profile?.bio.imageUrl[0]}
        />
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={() => {
            //e.preventDefault();
            handleSubmit();
          }}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="nickName"
            name="nickName"
            rules={[
              {
                required: true,
                message: 'Please input your nickName!',
              },
            ]}
          >
            <Input value={this.props.profile?.bio.nickName[0]||""} 
            defaultValue={this.props.profile?.bio.nickName[0]}
            onChange={(value) => handleChange("nickName", value.target.value)} 
            />
            
          </Form.Item>

          <Form.Item
            label="location"
            name="location"
            rules={[
              {
                required: true,
                message: 'Please input your location!',
              },
            ]}
          >
            <Input value={this.props.profile?.bio.location[0]} 
            defaultValue={this.props.profile?.bio.location[0]}
            onChange={(value) => handleChange("location", value.target.value)} 
            />
          </Form.Item>

          <Form.Item
            label="About"
            name="About"
            rules={[
              {
                required: true,
                message: 'Please input your About!',
              },
            ]}
          >
           <Input value={this.props.profile?.bio.about[0]} 
           defaultValue={this.props.profile?.bio.about[0]}
            onChange={(value) => handleChange("about", value.target.value)} 
            />
          </Form.Item>


          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </section>
    );
  }
}

export default ProfileForm;
