import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import { useDispatch } from "react-redux";
import { setProfile } from "../../store/reducers/common/profile";

import availableProfiles from "../../assets/data/profileImages";

const Profile = ({ selectedProfileId, onSelectProfile }) => {
  //   const dispatch = useDispatch();

  const handleClick = (profileId) => {
    onSelectProfile(profileId);
    // dispatch(setProfile(profileId));
  };

  return (
    <ProfileGrid>
      {availableProfiles.map((profile) => (
        <ProfileImage key={profile.id} src={profile.src} alt={`Profile ${profile.id}`} isSelected={selectedProfileId === profile.id} onClick={() => handleClick(profile.id)} />
      ))}
    </ProfileGrid>
  );
};

export default Profile;

const ProfileGrid = styled.div`
  ${tw`grid grid-cols-3 gap-5`}
`;

const ProfileImage = styled.img`
  ${tw`w-20 h-20 rounded-full cursor-pointer`}
  border: ${(props) => (props.isSelected ? "2px solid red" : "none")};
`;
