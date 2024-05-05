import { gql, useMutation } from '@apollo/client';

export default function Index() {
  const uploadProfileAvatar = gql`
    mutation uploadAvatar($id: ID!, $file: FileUpload!) {
      uploadProfileAvatar(id: $id, file: $file) {
        id
        email
        name
        avatar
      }
    }
  `;

  const [fetch] = useMutation(uploadProfileAvatar, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return (
    <>
      <h1>Index</h1>
      <input
        type="file"
        onChange={async (e) => {
          const file = e.target.files[0];
          const id = '1';
          if (file !== null || typeof file !== 'undefined') {
            await fetch({ variables: { file, id } });
          }
        }}
      />
    </>
  );
}
