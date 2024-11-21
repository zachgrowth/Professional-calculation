"use client";

import { useState } from "react";
import { ScoreConverter } from "./score-converter";
import { LetterGradeConverter } from "./letter-grade-converter";
import { ClassAnalytics } from "./class-analytics";
import { GradeStandards } from "./grade-standards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, BarChart2, GraduationCap, Globe2 } from "lucide-react";
import { GradeHistory } from "./grade-history";
import { useLocalStorage } from "@/hooks/use-local-storage";

export interface GradeScale {
  name: string;
  scale: {
    [key: string]: { min: number; max: number };
  };
}

export interface CalculationHistory {
  id: string;
  type: string;
  input: any;
  result: any;
  output?: {
    grade?: string;
    description?: string;
  };
  timestamp: number;
}

const defaultGradeScales: GradeScale[] = [
  {
    name: "US Standard",
    scale: {
      "A+": { min: 97, max: 100 },
      "A": { min: 93, max: 96.99 },
      "A-": { min: 90, max: 92.99 },
      "B+": { min: 87, max: 89.99 },
      "B": { min: 83, max: 86.99 },
      "B-": { min: 80, max: 82.99 },
      "C+": { min: 77, max: 79.99 },
      "C": { min: 73, max: 76.99 },
      "C-": { min: 70, max: 72.99 },
      "D+": { min: 67, max: 69.99 },
      "D": { min: 63, max: 66.99 },
      "D-": { min: 60, max: 62.99 },
      "F": { min: 0, max: 59.99 },
    },
  },
  {
    name: "UK Standard",
    scale: {
      "First": { min: 70, max: 100 },
      "2:1": { min: 60, max: 69.99 },
      "2:2": { min: 50, max: 59.99 },
      "Third": { min: 40, max: 49.99 },
      "Fail": { min: 0, max: 39.99 },
    },
  },
];

export function GradeCalculator() {
  const [gradeScales, setGradeScales] = useState<GradeScale[]>(defaultGradeScales);
  const [history, setHistory] = useLocalStorage<CalculationHistory[]>("grade-calculator-history", []);

  const addToHistory = (entry: Omit<CalculationHistory, "id" | "timestamp">) => {
    const newEntry: CalculationHistory = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    setHistory((prev) => [newEntry, ...prev].slice(0, 100)); // Keep last 100 entries
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <Tabs defaultValue="score" className="w-full">
      <TabsList className="grid grid-cols-4 w-full mb-8">
        <TabsTrigger value="score" className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          <span>Score</span>
        </TabsTrigger>
        <TabsTrigger value="letter" className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          <span>Letter</span>
        </TabsTrigger>
        <TabsTrigger value="standards" className="flex items-center gap-2">
          <Globe2 className="h-4 w-4" />
          <span>Standards</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          <span>Analytics</span>
        </TabsTrigger>
      </TabsList>

      <div className="grid md:grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <TabsContent value="score">
            <ScoreConverter
              onCalculate={(result) => addToHistory({
                type: "score",
                input: result.input,
                result: result.output,
              })}
            />
          </TabsContent>

          <TabsContent value="letter">
            <LetterGradeConverter
              gradeScales={gradeScales}
              onCalculate={(result) => addToHistory({
                type: "letter",
                input: result.input,
                result: result.output,
              })}
            />
          </TabsContent>

          <TabsContent value="standards">
            <GradeStandards
              onCalculate={(result) => addToHistory({
                type: "standards",
                input: result.input,
                output: result.output,
              })}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <ClassAnalytics
              onAnalyze={(result) => addToHistory({
                type: "analytics",
                input: result.input,
                result: result.output,
              })}
            />
          </TabsContent>
        </div>

        <div className="space-y-6">
          <GradeHistory
            history={history}
            onClear={clearHistory}
          />
        </div>
      </div>
    </Tabs>
  );
}