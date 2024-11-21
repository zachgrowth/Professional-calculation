"use client";

import { GradeItem } from "./index";

interface GradeResultsProps {
  finalGrade: string;
  items: GradeItem[];
}

export function GradeResults({ finalGrade, items }: GradeResultsProps) {
  const getLetterGrade = (grade: number) => {
    if (grade >= 90) return "A";
    if (grade >= 80) return "B";
    if (grade >= 70) return "C";
    if (grade >= 60) return "D";
    return "F";
  };

  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Final Grade</h3>
            <p className="text-sm text-muted-foreground">
              Based on weighted average
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{finalGrade}%</p>
            <p className="text-lg font-semibold">
              {getLetterGrade(parseFloat(finalGrade))}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Grade Breakdown</h3>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm text-muted-foreground"
          >
            <span>{item.name}</span>
            <span>
              {((item.weight / totalWeight) * 100).toFixed(1)}% of total
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}