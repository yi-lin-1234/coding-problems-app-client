import { useState, useEffect, FormEvent } from "react";
import { getQuestionById, updateQuestionById } from "../service/api";
import { useParams } from "react-router-dom";

import CustomRadioGroup from "../components/CustomRadioGroup";
import { PhotoIcon } from "@heroicons/react/24/solid";

function Edit() {
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [testCases, setTestCases] = useState<string>("");
  const [hints, setHints] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [starter, setStarter] = useState<string>("");

  const difficultyOptions = ["EASY", "MEDIUM", "HARD"];

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      if (!id) {
        console.log("No ID provided");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getQuestionById(id);
        setName(data.name);
        setTopic(data.topic);
        setDifficulty(data.difficulty);
        setDescription(data.description);
        setTestCases(data.testCases);
        setHints(data.hints);
        setVideo(data.video);
        setSolution(data.solution);
        setLink(data.link);
        setStarter(data.starter);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [id]);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();

    if (!id) {
      console.log("No ID provided");
      return;
    }

    const body = {
      name,
      topic,
      difficulty,
      description,
      testCases,
      hints,
      video,
      solution,
      link,
      starter,
    };

    try {
      await updateQuestionById(id, body);
      alert("update successfully");
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="isolate bg-white p-10">
      <form className="mx-auto max-w-xl" onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="topic"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Topic
            </label>
            <div className="mt-2.5">
              <input
                id="topic"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <CustomRadioGroup
              label="Difficulty Level"
              value={difficulty}
              onChange={setDifficulty}
              options={difficultyOptions}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                id="description"
                rows={6}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="testCases"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Test cases
            </label>
            <div className="mt-2.5">
              <input
                id="testCases"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={testCases}
                onChange={(e) => setTestCases(e.target.value)}
                required
              />
            </div>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {testCases ? (
                  <img src={testCases} alt="preview" width="300" />
                ) : (
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="hints"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Hints
            </label>
            <div className="mt-2.5">
              <textarea
                id="hints"
                rows={6}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={hints}
                onChange={(e) => setHints(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="video"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Video walkthrogh
            </label>
            <div className="mt-2.5">
              <input
                id="video"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="solution"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Solution
            </label>
            <div className="mt-2.5">
              <input
                id="solution"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="link"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Original question website
            </label>
            <div className="mt-2.5">
              <input
                id="link"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="starter"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Starter codes
            </label>
            <div className="mt-2.5">
              <textarea
                id="starter"
                rows={6}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={starter}
                onChange={(e) => setStarter(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 mt-6">
          <button
            type="submit"
            className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
