import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart06";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  return input.map(item =>{
    let color;
    if(item.gender === "男性"){
      color = "blue";
    }else{
      color = "red"
    }
    return{
      color: color,
      gender: item.gender,
      bmi: item.x/Math.pow(item.y/100,2),
      weight: item.x,
      height: item.y
    }
  }) 
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer06"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 06"
      Chart={Chart}
    />
  );
};

export default Lesson;
