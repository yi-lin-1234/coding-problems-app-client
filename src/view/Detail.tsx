import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Question } from "../types/type";
import { getQuestionById, deleteQuestionById } from "../service/api";
import HintDisclosure from "../components/HintDisclosure";
import {
  PencilSquareIcon,
  TrashIcon,
  KeyIcon,
  VideoCameraIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";
import CodeEditor from "../components/CodeEditor";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question>({
    id: "",
    name: "",
    topic: "",
    difficulty: "",
    description: "",
    testCases: "",
    hints: "",
    video: "",
    solution: "",
    link: "",
    starter: "",
    createdAt: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function initialSetUp() {
      if (!id) {
        console.log("No ID provided");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getQuestionById(id);
        setQuestion(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [id]);

  const handleOnDelete = async () => {
    if (!id) {
      console.log("No ID provided");
      return;
    }
    try {
      await deleteQuestionById(id);
      navigate("/dashboard/home");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {question.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <div className="flex items-center">
              <p className="text-sm text-grey-500">{question.topic}</p>
              <div className="ml-4 border-l border-gray-300 pl-4">
                <p
                  className={`text-sm ${
                    question.difficulty === "EASY"
                      ? "text-[#00B8A2]"
                      : question.difficulty === "MEDIUM"
                      ? "text-[#FEC01D]"
                      : "text-[#FF375F]"
                  }`}
                >
                  {question.difficulty.toLocaleLowerCase()}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{question.description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <img
                src={question.testCases}
                alt="preview"
                width="300"
                className="rounded-lg"
              />
            </div>
            <HintDisclosure hints={question.hints.split("$")} />
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <CodeEditor value={question.starter} />
        </div>

        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <a
            className="mr-3 inline-flex items-center rounded-md bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
            href={question.solution}
            target="_blank"
            rel="noopener noreferrer"
          >
            <KeyIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            solution
          </a>
          <a
            className="mr-3 inline-flex items-center rounded-md bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
            href={question.video}
            target="_blank"
            rel="noopener noreferrer"
          >
            <VideoCameraIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            video
          </a>
          <a
            className="mr-3 inline-flex items-center rounded-md bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
            href={question.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            origin
          </a>
          <Link to={`/dashboard/edit/${question.id}`}>
            <button className="mr-3 inline-flex items-center rounded-md bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
              <PencilSquareIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
              edit
            </button>
          </Link>

          <button
            type="button"
            className="inline-flex items-center rounded-md bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
            onClick={handleOnDelete}
          >
            <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
