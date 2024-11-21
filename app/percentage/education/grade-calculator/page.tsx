"use client";

import { GradeCalculator } from "@/components/calculators/education/grade-calculator";
import { Card } from "@/components/ui/card";

export default function GradeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Grade Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate weighted grades and final scores with precision
          </p>
        </div>
        
        <Card className="p-6">
          <GradeCalculator />
        </Card>

        <div className="mt-8 grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>1. Enter the score received for each assignment or test</p>
              <p>2. Input the maximum possible score for each item</p>
              <p>3. Add the weight (importance) of each component</p>
              <p>4. The calculator will automatically compute your weighted grade</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Common Grade Scales</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Standard Scale (0-100)</h3>
                <p className="text-sm text-muted-foreground">
                  A: 90-100 | B: 80-89 | C: 70-79 | D: 60-69 | F: 0-59
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">4.0 Scale</h3>
                <p className="text-sm text-muted-foreground">
                  A: 4.0 | B: 3.0 | C: 2.0 | D: 1.0 | F: 0.0
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}