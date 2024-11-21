"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ScoreConverterProps {
  onCalculate: (result: { input: any; output: any }) => void;
}

export function ScoreConverter({ onCalculate }: ScoreConverterProps) {
  const [score, setScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const scoreNum = parseFloat(score);
    const maxScoreNum = parseFloat(maxScore);

    if (isNaN(scoreNum) || isNaN(maxScoreNum) || maxScoreNum === 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for score and maximum score.",
        variant: "destructive",
      });
      return;
    }

    const percentage = (scoreNum / maxScoreNum) * 100;
    setResult(percentage);
    onCalculate({
      input: { score: scoreNum, maxScore: maxScoreNum },
      output: percentage,
    });
  };

  const exportResult = () => {
    if (result === null) return;

    const data = `Score: ${score}/${maxScore}\nPercentage: ${result.toFixed(2)}%`;
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grade-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "Your calculation has been exported to a file.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Enter score"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxScore">Maximum Score</Label>
              <Input
                id="maxScore"
                type="number"
                value={maxScore}
                onChange={(e) => setMaxScore(e.target.value)}
                placeholder="Enter maximum score"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Percentage
          </Button>

          {result !== null && (
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Result</h3>
                    <p className="text-sm text-muted-foreground">
                      Score: {score}/{maxScore}
                    </p>
                  </div>
                  <p className="text-3xl font-bold">{result.toFixed(2)}%</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={exportResult}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Result
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}