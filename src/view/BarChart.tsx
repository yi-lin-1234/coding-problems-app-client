import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  countQuestionsByTopic,
  countQuestionsByDifficulty,
  getTotalCount,
} from "../service/api";
import {
  ChartData,
  GroupedDataDifficulty,
  GroupedDataTopic,
} from "../types/type";

// eslint-disable-next-line
import "chart.js/auto";

function BarChart() {
  const [totalCount, setTotalCount] = useState<number>(0);

  const [chartDataTopic, setChartDataTopic] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Number of Questions",
        data: [],
        backgroundColor: "#629DDD",
        borderWidth: 2,
      },
    ],
  });
  const [chartDataDifficulty, setChartDataDifficulty] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Number of Questions",
        data: [],
        backgroundColor: "#629DDD",
        borderWidth: 2,
      },
    ],
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const count = await getTotalCount();
        setTotalCount(count);

        const groupedDataTopic = await countQuestionsByTopic();
        const labelsTopic = groupedDataTopic.map(
          (obj: GroupedDataTopic) => obj.topic
        );
        const dataTopic = groupedDataTopic.map(
          (obj: GroupedDataTopic) => obj.count
        );

        setChartDataTopic({
          labels: labelsTopic,
          datasets: [
            {
              label: "Number of Questions",
              data: dataTopic,
              backgroundColor: "#629DDD",
              borderWidth: 2,
            },
          ],
        });

        const groupedDataDifficulty = await countQuestionsByDifficulty();
        const labelsDifficulty = groupedDataDifficulty.map(
          (obj: GroupedDataDifficulty) => obj.difficulty.toLocaleLowerCase()
        );
        const dataDifficulty = groupedDataDifficulty.map(
          (obj: GroupedDataDifficulty) => obj.count
        );
        setChartDataDifficulty({
          labels: labelsDifficulty,
          datasets: [
            {
              label: "Number of Questions",
              data: dataDifficulty,
              backgroundColor: "#629DDD",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 h-screen">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        {/* Details section */}
        <section aria-labelledby="details-heading">
          <div className="flex flex-col items-center text-center">
            <h2
              id="details-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Coding Problem Statistics
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-600">
              Dive into our vast collection of coding problems and see how
              they're categorized by topic and difficulty. Understand where the
              challenges lie!
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Total Questions: {totalCount}
            </h3>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <div>
              <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                <Bar
                  data={chartDataTopic}
                  options={{ responsive: true, indexAxis: "y" }}
                />
              </div>
              <p className="mt-8 text-base text-gray-500">
                This chart illustrates the number of coding problems per topic.
                Discover which topics are most popular or find those niche areas
                waiting for you to conquer!
              </p>
            </div>
            <div>
              <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                <Bar
                  data={chartDataDifficulty}
                  options={{ responsive: true, indexAxis: "y" }}
                />
              </div>
              <p className="mt-8 text-base text-gray-500">
                This visualization groups coding problems by their difficulty.
                Are you up for some easy warm-ups or looking for a real
                challenge? See where you stand!
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BarChart;
