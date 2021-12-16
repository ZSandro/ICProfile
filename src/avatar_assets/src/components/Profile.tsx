import { Avatar } from 'antd';

import { ActorSubclass } from "@dfinity/agent";
import React from "react";
import {
  Bio,
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { emptyProfile } from "../hooks";
import { GithubOutlined } from '@ant-design/icons'

interface Props {
  profile?: ProfileUpdate;
  submitCallback?: (profile: ProfileUpdate) => void;
  actor?: ActorSubclass<_SERVICE>;
}

class Profile extends React.Component<Props> {
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

    // onChangeValue(profile) {
    //     //这里写当state中的value改变时对应如何处理

    // }

    componentWillReceiveProps(nextProps:any) {
        this.setState({
          profile: nextProps.profile
        });
      }


    render() {
        const { nickName,  location, about } = this.state.profile.bio;
        return (
            <div className="profile_content">
                <Avatar
                    size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                    }} src="https://joeschmoe.io/api/v1/random" />
                <p className="profile_name">Jensen Chen</p>
                <p className="profile_about">这就是我现在的一个峨眉好的东西这就是</p>
                <p className="profile_about">nickname:{nickName}</p>
                <p className="profile_about">location:{location}</p>
                <p className="profile_about">about:{about}</p>
                <GithubOutlined />
            </div>
        );
    }
}

export default Profile;