import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

import { getUserQuery } from './gql';

import type { GetUserQuery } from './gql';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export type EditProfileProps = {
  id: string;
};

const EditProfile: React.FC<EditProfileProps> = ({ id }) => {
  const { error, data } = useQuery<GetUserQuery>(getUserQuery, {
    variables: { id },
  });

  if (error || !data) return null;

  return (
    <div>
      <h1>Edit Profile</h1>
      <Image
        width={100}
        height={100}
        src={data?.user.avatar ?? ''}
        alt={data?.user.displayName ?? ''}
      />
      <h2>{data?.user.displayName}</h2>
      <p>{data?.user.bio}</p>
      <Form>
        <input type="file" accept="image/png, image/jpeg" />
        <input type="text" defaultValue={data?.user.displayName ?? ''} />
        <textarea defaultValue={data?.user.bio ?? ''} />
      </Form>
    </div>
  );
};

export default EditProfile;
