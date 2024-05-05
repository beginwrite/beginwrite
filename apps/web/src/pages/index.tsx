import { gql, useMutation } from '@apollo/client';

export default function Index() {
  // TODO: ファイルアップロード処理はプロフィール画像のアップロード処理に変更するので、ここの処理は削除する
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

  const [fetchPost] = useMutation(uploadProfileAvatar, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const convertToPng = async (id: string, file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const canvas = document.createElement('canvas');
      const img = document.createElement('img');
      img.src = reader.result as string;
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx !== null) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          const blob = await (await fetch(dataUrl)).blob();
          const newFile = new File([blob], 'avatar.png', { type: 'image/png' });
          // 変換したファイルをプレビュー表示
          const preview = document.getElementById('preview');
          if (preview !== null) {
            preview.innerHTML = '';
            const image = document.createElement('img');
            image.src = URL.createObjectURL(newFile);
            preview.appendChild(image);
          }
          await fetchPost({
            variables: {
              id,
              file: newFile,
            },
          });
        }
      };
    };
  };
  return (
    <>
      <h1>Index</h1>
      <input
        type="file"
        onChange={async (e) => {
          // @ts-ignore
          const file = e.target.files[0];
          const id = '1';
          if (file !== null || typeof file !== 'undefined') {
            await convertToPng(id, file);
          }
        }}
      />
      <div id="preview"></div>
    </>
  );
}
