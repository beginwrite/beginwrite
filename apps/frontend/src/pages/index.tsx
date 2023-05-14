import { useState, useEffect, useCallback } from "react"
import axios from 'axios';

type Data = {
  data: string
}

export default function Home() {
  const [message, setMessage] = useState("");

  const helloHandle = useCallback(async () => {
    await axios.get('http://127.0.0.1:8000')
      .then(({ data }: Data) => {
        setMessage(data)
      });
  }, []);


  useEffect(() => {
    helloHandle();
  }, [])

  return (
    <h1>{message} + Next.js!</h1>
  )
}
