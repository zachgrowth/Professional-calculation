"use client";

import { RoiCalculator } from "@/components/calculators/business/roi-calculator";
import { Card } from "@/components/ui/card";

export default function RoiCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            ROI Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate and analyze your return on investment with precision
          </p>
        </div>

        <Card className="p-6">
          <RoiCalculator />
        </Card>

        <div className="mt-8 grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Understanding ROI</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Return on Investment (ROI) measures the profitability of an investment relative to its cost. It's expressed as a percentage and calculated using the formula:
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                ROI = ((Final Value - Initial Investment) / Initial Investment) × 100
              </div>
              <p>
                A positive ROI indicates a profitable investment, while a negative ROI suggests a loss.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">ROI Interpretation Guide</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Strong ROI (>20%)</h3>
                <p className="text-sm text-muted-foreground">
                  Indicates an excellent investment performance, significantly exceeding typical market returns.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Moderate ROI (10-20%)</h3>
                <p className="text-sm text-muted-foreground">
                  Represents solid performance, aligned with average market returns.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Low ROI (<10%)</h3>
                <p className="text-sm text-muted-foreground">
                  May indicate underperformance or low-risk investments like bonds.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}