"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { gradingSystems } from "./grading-systems";
import { Info } from "lucide-react";

interface GradeStandardsProps {
  onCalculate: (result: { input: any; output: any }) => void;
}

export function GradeStandards({ onCalculate }: GradeStandardsProps) {
  const [region, setRegion] = useState<string>("North America");
  const [system, setSystem] = useState<string>("US Standard");
  const [score, setScore] = useState<string>("");
  const [result, setResult] = useState<{
    grade: string;
    description: string;
  } | null>(null);

  const regions = Object.keys(gradingSystems);
  const currentSystems = gradingSystems[region] || [];
  const currentScale = currentSystems.find((s) => s.name === system);

  const calculateGrade = () => {
    if (!currentScale || !score) return;

    const percentage = parseFloat(score);
    if (isNaN(percentage)) return;

    for (const [grade, range] of Object.entries(currentScale.scale)) {
      if (percentage >= range.min && percentage <= range.max) {
        setResult({
          grade,
          description: range.description || "",
        });
        onCalculate({
          input: {
            score: percentage,
            system: currentScale.name,
          },
          output: {
            grade,
            description: range.description,
          },
        });
        break;
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Region</Label>
            <Select
              value={region}
              onValueChange={(value) => {
                setRegion(value);
                setSystem(gradingSystems[value][0].name);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Grading System</Label>
            <Select value={system} onValueChange={setSystem}>
              <SelectTrigger>
                <SelectValue placeholder="Select grading system" />
              </SelectTrigger>
              <SelectContent>
                {currentSystems.map((s) => (
                  <SelectItem key={s.name} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {currentScale && (
              <div className="mt-2 p-4 bg-primary/5 rounded-lg flex gap-2">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  {currentScale.description}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="score">Score (%)</Label>
            <Input
              id="score"
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Enter percentage score"
            />
          </div>

          <Button onClick={calculateGrade} className="w-full">
            Calculate Grade
          </Button>

          {result && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Result</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentScale?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{result.grade}</p>
                  <p className="text-sm text-muted-foreground">
                    {result.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentScale && (
            <div>
              <h3 className="font-medium mb-3">Grade Scale Reference</h3>
              <div className="grid gap-2">
                {Object.entries(currentScale.scale).map(([grade, range]) => (
                  <div
                    key={grade}
                    className="flex justify-between text-sm text-muted-foreground"
                  >
                    <span className="font-medium">{grade}</span>
                    <span>
                      {range.min}-{range.max}% • {range.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}