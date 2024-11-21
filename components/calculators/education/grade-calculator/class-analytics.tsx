"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ClassAnalyticsProps {
  onAnalyze: (result: { input: any; output: any }) => void;
}

interface Statistics {
  mean: number;
  median: number;
  standardDeviation: number;
  distribution: { [key: string]: number };
}

export function ClassAnalytics({ onAnalyze }: ClassAnalyticsProps) {
  const [scores, setScores] = useState<string[]>([""]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const { toast } = useToast();

  const addScore = () => {
    setScores([...scores, ""]);
  };

  const removeScore = (index: number) => {
    if (scores.length > 1) {
      const newScores = scores.filter((_, i) => i !== index);
      setScores(newScores);
    }
  };

  const updateScore = (index: number, value: string) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const calculateStats = () => {
    const numericScores = scores
      .map((s) => parseFloat(s))
      .filter((s) => !isNaN(s));

    if (numericScores.length === 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numeric scores.",
        variant: "destructive",
      });
      return;
    }

    // Calculate mean
    const mean =
      numericScores.reduce((sum, score) => sum + score, 0) /
      numericScores.length;

    // Calculate median
    const sorted = [...numericScores].sort((a, b) => a - b);
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];

    // Calculate standard deviation
    const variance =
      numericScores.reduce((sum, score) => {
        const diff = score - mean;
        return sum + diff * diff;
      }, 0) / numericScores.length;
    const standardDeviation = Math.sqrt(variance);

    // Calculate distribution
    const distribution: { [key: string]: number } = {
      "90-100": 0,
      "80-89": 0,
      "70-79": 0,
      "60-69": 0,
      "0-59": 0,
    };

    numericScores.forEach((score) => {
      if (score >= 90) distribution["90-100"]++;
      else if (score >= 80) distribution["80-89"]++;
      else if (score >= 70) distribution["70-79"]++;
      else if (score >= 60) distribution["60-69"]++;
      else distribution["0-59"]++;
    });

    const stats = { mean, median, standardDeviation, distribution };
    setStats(stats);
    onAnalyze({
      input: { scores: numericScores },
      output: stats,
    });
  };

  const exportStats = () => {
    if (!stats) return;

    const data = `Class Statistics
Mean: ${stats.mean.toFixed(2)}
Median: ${stats.median.toFixed(2)}
Standard Deviation: ${stats.standardDeviation.toFixed(2)}

Grade Distribution:
${Object.entries(stats.distribution)
  .map(([range, count]) => `${range}: ${count} students`)
  .join("\n")}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "class-statistics.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Exported Successfully",
      description: "Class statistics have been exported to a file.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Class Scores</Label>
            {scores.map((score, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="number"
                  value={score}
                  onChange={(e) => updateScore(index, e.target.value)}
                  placeholder="Enter score"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeScore(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={addScore}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Score
            </Button>
          </div>

          <Button onClick={calculateStats} className="w-full">
            Calculate Statistics
          </Button>

          {stats && (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Class Statistics</h3>
                  <div className="space-y-1 text-sm">
                    <p>Mean: {stats.mean.toFixed(2)}</p>
                    <p>Median: {stats.median.toFixed(2)}</p>
                    <p>
                      Standard Deviation:{" "}
                      {stats.standardDeviation.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Grade Distribution</h3>
                  <div className="space-y-1 text-sm">
                    {Object.entries(stats.distribution).map(
                      ([range, count]) => (
                        <div
                          key={range}
                          className="flex justify-between"
                        >
                          <span>{range}%</span>
                          <span>{count} students</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={exportStats}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Statistics
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}