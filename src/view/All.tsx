import { useState, useEffect } from "react";
import { getAllQuestions } from "../service/api";
import Table from "../components/Table";
import { Question } from "../types/type";

function All() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getAllQuestions();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <Table questions={questions} />;
}

export default All;
