"use client";
import { useState } from "react";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface QuizParams {
  numQuestions: number;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  questionTypes: {
    multipleChoice: boolean;
    yesNo: boolean;
    textInput: boolean;
  };
}

export const Quiz = () => {
  const [quizParams, setQuizParams] = useState<QuizParams>({
    numQuestions: 5,
    difficulty: "medium",
    topic: "",
    questionTypes: {
      multipleChoice: true,
      yesNo: false,
      textInput: false,
    },
  });
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const handleQuizParamChange = (param, value) => {
    setQuizParams((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  const handleQuizTypeChange = (type) => {
    setQuizParams((prev) => ({
      ...prev,
      types: {
        ...prev.types,
        [type]: !prev.types[type],
      },
    }));
  };

  const handleGenerateQuiz = async () => {
    // In a real app, this would call your backend API which interacts with the LLM
    // The LLM would generate a structured output based on the quizParams
    // For now, we'll simulate this with a mock response
    const mockQuizQuestions = [
      {
        type: "multipleChoice",
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris",
      },
      {
        type: "yesNo",
        question: "Is Spanish the most spoken language in Brazil?",
        correctAnswer: false,
      },
      {
        type: "textInput",
        question: 'How do you say "hello" in French?',
        correctAnswer: "bonjour",
      },
    ];

    setQuizQuestions(mockQuizQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const handleAnswerSubmit = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const renderQuestion = () => {
    const question = quizQuestions[currentQuestionIndex];
    if (!question) return null;

    switch (question.type) {
      case "multipleChoice":
        return (
          <div>
            <h3 className="font-bold mb-2">{question.question}</h3>
            <RadioGroup onValueChange={handleAnswerSubmit}>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case "yesNo":
        return (
          <div>
            <h3 className="font-bold mb-2">{question.question}</h3>
            <RadioGroup
              onValueChange={(value) => handleAnswerSubmit(value === "true")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="answer-yes" />
                <Label htmlFor="answer-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="answer-no" />
                <Label htmlFor="answer-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        );
      case "textInput":
        return (
          <div>
            <h3 className="font-bold mb-2">{question.question}</h3>
            <Input
              type="text"
              placeholder="Type your answer"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAnswerSubmit(e.target.value);
                }
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Quiz</CardTitle>
        <CardDescription>Generate a custom language quiz</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="num-questions">Number of Questions</Label>
            <Input
              id="num-questions"
              type="number"
              value={quizParams.numQuestions}
              onChange={(e) =>
                handleQuizParamChange("numQuestions", parseInt(e.target.value))
              }
              min="1"
              max="20"
            />
          </div>
          <div>
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={quizParams.difficulty}
              onValueChange={(value) =>
                handleQuizParamChange("difficulty", value)
              }
            >
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="topic">Topic/Area</Label>
          <Input
            id="topic"
            type="text"
            placeholder="Enter a topic for the quiz"
            value={quizParams.topic}
            onChange={(e) => handleQuizParamChange("topic", e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label>Question Types</Label>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="multiple-choice"
                checked={quizParams.questionTypes.multipleChoice}
                onCheckedChange={() => handleQuizTypeChange("multipleChoice")}
              />
              <Label htmlFor="multiple-choice">Multiple Choice</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="yes-no"
                checked={quizParams.questionTypes.yesNo}
                onCheckedChange={() => handleQuizTypeChange("yesNo")}
              />
              <Label htmlFor="yes-no">Yes/No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="text-input"
                checked={quizParams.questionTypes.textInput}
                onCheckedChange={() => handleQuizTypeChange("textInput")}
              />
              <Label htmlFor="text-input">Text Input</Label>
            </div>
          </div>
        </div>
        <Button onClick={handleGenerateQuiz}>Generate Quiz</Button>

        {quizQuestions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Quiz</h2>
            {renderQuestion()}
            <div className="mt-4">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
