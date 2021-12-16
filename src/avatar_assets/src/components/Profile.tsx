import { Form, Input, Button, Checkbox, Image, Descriptions } from 'antd';

import { ActorSubclass } from "@dfinity/agent";
import React from "react";
import {
  Bio,
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { emptyProfile } from "../hooks";
import ProfileUpload from "./ProfileUpload";
import { AppContext } from "../App";
import { useContext } from "react";

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

   //[isEditing, setIsEditing] = React.useState(false);
 //  { actor, profile, isAuthenticated, updateProfile } = useContext(AppContext);

  //  this.props.PropssubmitCallback = (profile: ProfileUpdate) => {
  //   // Optimistically update
  //   updateProfile?.(profile);
  //   set("profile", JSON.stringify(profile));
  //   toast.success("Avatar updated!");
  //   setIsEditing(false);

  //   // Handle update async
  //   actor
  //     ?.update(profile)
  //     .then(async (profileUpdate) => {
  //       if ("ok" in profileUpdate) {
  //         const profileResponse = await actor.read();
  //         if ("ok" in profileResponse) {
  //           // Don't do anything if there is no difference.
  //           if (compare(profileResponse.ok)) return;

  //           updateProfile?.(profileResponse.ok);
  //         } else {
  //           console.error(profileResponse.err);
  //           toast.error("Failed to read profile from IC");
  //         }
  //       } else {
  //         console.error(profileUpdate.err);
  //         toast.error("Failed to save update to IC");
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       toast.error("Failed to save update to IC");
  //       actor.read().then((response) => {
  //         if ("ok" in response) {
  //           updateProfile?.(response.ok);
  //         }
  //       });
  //     });
  // }


render() {
  const { nickName, location, about } =
    this.state.profile.bio;
  return (
    <section>
      <p>个人页预览</p>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <Descriptions title="User Info">
        <Descriptions.Item label="name">{nickName}</Descriptions.Item>
        <Descriptions.Item label="displayName">{nickName}</Descriptions.Item>
        <Descriptions.Item label="givenName">{nickName}</Descriptions.Item>
        <Descriptions.Item label="location">{location}</Descriptions.Item>
        <Descriptions.Item label="about">{about}</Descriptions.Item>
        <Descriptions.Item label="familyName">{nickName}</Descriptions.Item>
      </Descriptions>,
    </section>
  );
}

  // Handle update async
  // actor
  // ?.update(profile)
  // .then(async (profileUpdate) => {
  //   if ("ok" in profileUpdate) {
  //     const profileResponse = await actor.read();
  //     if ("ok" in profileResponse) {
  //       // Don't do anything if there is no difference.
  //       if (compare(profileResponse.ok)) return;

  //       updateProfile?.(profileResponse.ok);
  //     } else {
  //       console.error(profileResponse.err);
  //       toast.error("Failed to read profile from IC");
  //     }
  //   } else {
  //     console.error(profileUpdate.err);
  //     toast.error("Failed to save update to IC");
  //   }
  // })
  // .catch((err) => {
  //   console.error(err);
  //   toast.error("Failed to save update to IC");
  //   actor.read().then((response) => {
  //     if ("ok" in response) {
  //       updateProfile?.(response.ok);
  //     }
  //   });
  // });

}

export default Profile;
