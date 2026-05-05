import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart05";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  const height = input.map(item => item.y);
  const min = Math.round(Math.min(...height));
  const max = Math.round(Math.max(...height));
  const bin = [];
  for (let i = 0; i < max-min+1; i++){
    bin[i] = {
      bin: (i+min).toString(),
      男性: 0,
      女性: 0
    };
  }
  input.forEach(item =>{
    const h = Math.round(item.y);
    const index = h-min;
    bin[index][item.gender]++;
  });
  return bin; 
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer05"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 05"
      Chart={Chart}
    />
  );
};

export default Lesson;
