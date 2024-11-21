"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { CalculationHistory } from "./index";

interface GradeHistoryProps {
  history: CalculationHistory[];
  onClear: () => void;
}

export function GradeHistory({ history, onClear }: GradeHistoryProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatResult = (entry: CalculationHistory) => {
    try {
      switch (entry.type) {
        case "score":
          return `${entry.input.score}/${entry.input.maxScore} = ${entry.result.toFixed(2)}%`;
        case "letter":
          return `${entry.input.percentage}% = ${entry.result}`;
        case "standards":
          if (entry.output?.grade) {
            return `${entry.input.score}% = ${entry.output.grade} (${entry.input.system})`;
          }
          return "Grade calculation";
        case "analytics":
          if (entry.result?.mean) {
            return `Class Mean: ${entry.result.mean.toFixed(2)}`;
          }
          return "Class analytics";
        default:
          return "Calculation completed";
      }
    } catch (error) {
      console.error("Error formatting history entry:", error);
      return "Calculation completed";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">History</CardTitle>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No calculations yet
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="text-sm border-b pb-2 last:border-0"
              >
                <p className="font-medium">{formatResult(entry)}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(entry.timestamp)}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}