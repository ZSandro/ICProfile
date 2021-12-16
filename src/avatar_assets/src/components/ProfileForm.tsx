
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { ActorSubclass } from "@dfinity/agent";
import React from "react";
import {
  Bio,
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { emptyProfile } from "../hooks";
import ProfileUpload from "./ProfileUpload";

interface Props {
  profile: ProfileUpdate;
  submitCallback: (profile: ProfileUpdate) => void;
  actor?: ActorSubclass<_SERVICE>;
}

class ProfileForm extends React.Component<Props> {
  state = { profile: emptyProfile };

  formRef = React.createRef();

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.profile) {
      this.setState({ profile: this.props.profile });
    }
  }

  handleChange(key: string, value: string) {
    const newState: any = { profile: this.state.profile };
    newState.profile.bio[key] = value ? [value] : [];
    this.setState(newState);
  }

  handleImage(image: string) {
    const newState: any = { profile: this.state.profile };
    newState.profile.image = image ? [image] : [];
    this.setState(newState);
  }

  handleSubmit() {
    const { familyName, givenName } = this.state.profile.bio;
    const newProfile = Object.assign({}, this.state.profile);
    let name: string = [givenName[0], familyName[0]].join(" ");
    newProfile.bio.name = name ? [name] : [];

    this.props.submitCallback(newProfile);
  }

  render() {
    const { name, displayName, givenName, location, about, familyName } =
      this.state.profile.bio;

    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const handleImage = this.handleImage.bind(this);
    return (
      <section>
        <ProfileUpload
          onChange={handleImage}
          defaultImage={this.state.profile.image[0]}
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
            label="Name"
            name="Name"
            //defaultValue={name}
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Display Name"
            name="Display Name"
            rules={[
              {
                required: true,
                message: 'Please input your Display Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="First Name"
            rules={[
              {
                required: true,
                message: 'Please input your First Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="Last Name"
            rules={[
              {
                required: true,
                message: 'Please input your Last Name!',
              },
            ]}
          >
            <Input />
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
            <Input />
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
            <Input />
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
