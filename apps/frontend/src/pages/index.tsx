import { useState, useEffect, useCallback } from "react"
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

export default function Home() {
  const [message, setMessage] = useState("");
  const { loading, error, data } = useQuery(getUsers);

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
