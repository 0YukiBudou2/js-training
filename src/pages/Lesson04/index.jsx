import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart04";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  const species = Array.from(new Set(input.map(item =>item.species)));
  return species.map(sp =>({
    id: sp,
    data:input.filter(item => item.species == sp).map(item =>({
      x: item.sepalLength,
      y: item.petalWidth
    }))
  }));
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer04"
      dataUrl="data/iris.json"
      convertData={convertData}
      instruction={instruction}
      title="Lesson 04"
      Chart={Chart}
    />
  );
};

export default Lesson;
