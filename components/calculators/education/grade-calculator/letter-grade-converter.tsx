"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GradeScale } from "./index";

interface LetterGradeConverterProps {
  gradeScales: GradeScale[];
  onCalculate: (result: { input: any; output: any }) => void;
}

export function LetterGradeConverter({
  gradeScales,
  onCalculate,
}: LetterGradeConverterProps) {
  const [selectedScale, setSelectedScale] = useState(gradeScales[0].name);
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const getLetterGrade = (percent: number) => {
    const scale = gradeScales.find((s) => s.name === selectedScale)?.scale;
    if (!scale) return null;

    for (const [grade, range] of Object.entries(scale)) {
      if (percent >= range.min && percent <= range.max) {
        return grade;
      }
    }
    return null;
  };

  const calculate = () => {
    const percent = parseFloat(percentage);
    if (!isNaN(percent)) {
      const letterGrade = getLetterGrade(percent);
      setResult(letterGrade);
      onCalculate({
        input: { percentage: percent, scale: selectedScale },
        output: letterGrade,
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Grading Scale</Label>
            <Select
              value={selectedScale}
              onValueChange={setSelectedScale}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select grading scale" />
              </SelectTrigger>
              <SelectContent>
                {gradeScales.map((scale) => (
                  <SelectItem key={scale.name} value={scale.name}>
                    {scale.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="percentage">Percentage</Label>
            <Input
              id="percentage"
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="Enter percentage"
            />
          </div>

          <Button onClick={calculate} className="w-full">
            Convert to Letter Grade
          </Button>

          {result && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Result</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedScale} Scale
                  </p>
                </div>
                <p className="text-3xl font-bold">{result}</p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-medium mb-3">Grade Scale Reference</h3>
            <div className="grid gap-2">
              {Object.entries(
                gradeScales.find((s) => s.name === selectedScale)?.scale || {}
              ).map(([grade, range]) => (
                <div
                  key={grade}
                  className="flex justify-between text-sm text-muted-foreground"
                >
                  <span>{grade}</span>
                  <span>
                    {range.min} - {range.max}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}