import { useState } from "react"
import { useQuery, gql } from '@apollo/client';
type Data = {
  data: string
}

const getUsers = gql`
  query users {
    users {
      id
      name
    }
  }
`;

export default function Index() {
  const [message, setMessage] = useState("");
  const { error, data } = useQuery(getUsers);

  if (error) return null;

  return (
    <div>
      <ul>
        {data?.users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
