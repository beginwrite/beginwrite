import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useId } from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

import {
  useFetchData,
  useUpdateProfile,
  useUpdateProfileAvatar,
} from './logic';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export type EditProfileProps = {
  id: string;
};

const EditProfile: React.FC<EditProfileProps> = ({ id }) => {
  const { error, data } = useFetchData(id);
  const { handleSubmit, register } = useUpdateProfile(id);
  const { handleAvatarUpload } = useUpdateProfileAvatar(id);

  const fileId = useId();

  if (error || !data) return null;

  return (
    <div>
      <h1>Edit Profile</h1>
      <Image
        width={100}
        height={100}
        src={data?.user.avatar ?? ''}
        alt="アバター画像"
      />
      <h2>{data?.user.displayName}</h2>
      <p>{data?.user.bio}</p>
      <section aria-label="ファイルを選択">
        <Input
          id={fileId}
          type="file"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={handleAvatarUpload}
        />
      </section>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          defaultValue={data?.user.displayName ?? ''}
          {...register('displayName')}
        />
        <textarea defaultValue={data?.user.bio ?? ''} {...register('bio')} />
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default EditProfile;
