"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Share2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function QuickCalculator() {
  const [number, setNumber] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const calculate = (num: number, tot: number) => {
    if (tot === 0) {
      toast({
        title: "Invalid Input",
        description: "Total cannot be zero.",
        variant: "destructive",
      });
      return;
    }
    const percentage = (num / tot) * 100;
    setResult(percentage);
  };

  const handleCalculate = () => {
    const num = parseFloat(number);
    const tot = parseFloat(total);
    if (isNaN(num) || isNaN(tot)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers.",
        variant: "destructive",
      });
      return;
    }
    calculate(num, tot);
  };

  const handleQuickPercentage = (percentage: number) => {
    const tot = parseFloat(total);
    if (!isNaN(tot)) {
      const num = (percentage * tot) / 100;
      setNumber(num.toString());
      calculate(num, tot);
    }
  };

  const clearAll = () => {
    setNumber("");
    setTotal("");
    setResult(null);
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(`${result.toFixed(2)}%`);
      toast({
        title: "Copied",
        description: "Result copied to clipboard.",
      });
    }
  };

  const shareResult = () => {
    if (result !== null) {
      const text = `${number} out of ${total} is ${result.toFixed(2)}%`;
      if (navigator.share) {
        navigator.share({
          title: "Percentage Calculation",
          text: text,
        }).catch(() => {
          navigator.clipboard.writeText(text);
          toast({
            title: "Copied",
            description: "Result copied to clipboard for sharing.",
          });
        });
      } else {
        navigator.clipboard.writeText(text);
        toast({
          title: "Copied",
          description: "Result copied to clipboard for sharing.",
        });
      }
    }
  };

  return (
    <Card className="bg-gradient-to-br from-background to-muted">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Input
                type="number"
                placeholder="Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="text-lg"
              />
            </div>
            <div className="flex items-center">
              <span className="text-2xl text-muted-foreground">/</span>
            </div>
            <div className="flex-1 space-y-2">
              <Input
                type="number"
                placeholder="Total"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="text-lg"
              />
            </div>
            <Button onClick={handleCalculate} size="lg" className="px-8">
              Calculate
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[25, 50, 75, 100].map((percent) => (
                <Button
                  key={percent}
                  variant="outline"
                  onClick={() => handleQuickPercentage(percent)}
                >
                  {percent}%
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={clearAll}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={copyResult}
                disabled={result === null}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={shareResult}
                disabled={result === null}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {result !== null && (
            <div className="flex justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">
                  {result.toFixed(2)}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {number} is {result.toFixed(2)}% of {total}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}</content></file>
<boltAction type="file" filePath="app/page.tsx">"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calculator,
  GraduationCap,
  TrendingUp,
  Receipt,
  Tag,
  Percent,
  BarChart2,
  ArrowUpDown,
  Scale,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { QuickCalculator } from "@/components/quick-calculator";

const calculatorGroups = [
  {
    title: "Basic Calculators",
    items: [
      {
        title: "Basic Calculator",
        description: "Calculate percentages with ease",
        icon: Calculator,
        href: "/percentage/basic",
      },
      {
        title: "Percentage Difference",
        description: "Calculate the difference between two values",
        icon: ArrowUpDown,
        href: "/percentage/percentage-difference-calculator",
      },
      {
        title: "Percentage Increase",
        description: "Calculate percentage increases and growth",
        icon: TrendingUp,
        href: "/percentage/percentage-increase-calculator",
      },
      {
        title: "Percentage Change",
        description: "Calculate percentage changes over time",
        icon: BarChart2,
        href: "/percentage/percentage-change-calculator",
      },
      {
        title: "Body Fat Percentage",
        description: "Calculate body fat percentage",
        icon: Scale,
        href: "/percentage/body-fat-percentage-calculator",
      },
    ],
  },
  {
    title: "Education Calculators",
    items: [
      {
        title: "Grade Calculator",
        description: "Calculate grades and academic scores",
        icon: GraduationCap,
        href: "/percentage/education/grade-calculator",
      },
      {
        title: "GPA Calculator",
        description: "Convert grades to GPA",
        icon: BarChart2,
        href: "/percentage/education/gpa-calculator",
      },
      {
        title: "Average Calculator",
        description: "Calculate mean, median, and mode",
        icon: Calculator,
        href: "/percentage/education/average-calculator",
      },
      {
        title: "Ranking Calculator",
        description: "Calculate percentile ranks",
        icon: TrendingUp,
        href: "/percentage/education/ranking-calculator",
      },
    ],
  },
  {
    title: "Business Calculators",
    items: [
      {
        title: "ROI Calculator",
        description: "Calculate return on investment",
        icon: TrendingUp,
        href: "/percentage/business/roi-calculator",
      },
      {
        title: "Discount Calculator",
        description: "Calculate discounts and savings",
        icon: Tag,
        href: "/percentage/business/discount-calculator",
      },
      {
        title: "Tax Calculator",
        description: "Calculate tax rates and amounts",
        icon: Receipt,
        href: "/percentage/business/tax-calculator",
      },
      {
        title: "Markup Calculator",
        description: "Calculate markup and margins",
        icon: Percent,
        href: "/percentage/business/markup-calculator",
      },
    ],
  },
  {
    title: "Learning Resources",
    items: [
      {
        title: "Basic Formulas",
        description: "Learn fundamental percentage formulas",
        icon: BookOpen,
        href: "/percentage/learn/basic-formula",
      },
      {
        title: "Common Questions",
        description: "Find answers to FAQs",
        icon: Calculator,
        href: "/percentage/learn/common-questions",
      },
      {
        title: "Practical Examples",
        description: "Real-world applications",
        icon: BarChart2,
        href: "/percentage/learn/examples",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Advanced Calculator Suite
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional calculation tools for percentages, finances, and statistics.
            Fast, accurate, and easy to use.
          </p>
        </div>

        <div className="mb-12">
          <QuickCalculator />
        </div>

        {calculatorGroups.map((group) => (
          <div key={group.title} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{group.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((calc) => (
                <Card key={calc.title} className="group hover:shadow-lg transition-shadow">
                  <Link href={calc.href}>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                        <calc.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{calc.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {calc.description}
                        </p>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Popular Combinations</h2>
          <div className="grid gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Business Analysis Package</h3>
              <p className="text-sm text-muted-foreground">
                ROI Calculator + Markup Calculator + Tax Calculator
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Academic Tools Suite</h3>
              <p className="text-sm text-muted-foreground">
                Grade Calculator + GPA Calculator
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}</content></file>
<boltAction type="start">
<command>npm run dev</command>