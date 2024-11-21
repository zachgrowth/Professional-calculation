export interface GradeRange {
  min: number;
  max: number;
  description?: string;
}

export interface GradeScale {
  name: string;
  country: string;
  description: string;
  scale: {
    [key: string]: GradeRange;
  };
}

export const gradingSystems: { [key: string]: GradeScale[] } = {
  "North America": [
    {
      name: "US Standard",
      country: "United States",
      description: "The US grading system uses letter grades with plus/minus modifiers. Most commonly used in American schools and universities.",
      scale: {
        "A+": { min: 97, max: 100, description: "Outstanding" },
        "A": { min: 93, max: 96.99, description: "Excellent" },
        "A-": { min: 90, max: 92.99, description: "Very Good" },
        "B+": { min: 87, max: 89.99, description: "Good Plus" },
        "B": { min: 83, max: 86.99, description: "Good" },
        "B-": { min: 80, max: 82.99, description: "Good Minus" },
        "C+": { min: 77, max: 79.99, description: "Satisfactory Plus" },
        "C": { min: 73, max: 76.99, description: "Satisfactory" },
        "C-": { min: 70, max: 72.99, description: "Satisfactory Minus" },
        "D+": { min: 67, max: 69.99, description: "Poor Plus" },
        "D": { min: 63, max: 66.99, description: "Poor" },
        "D-": { min: 60, max: 62.99, description: "Poor Minus" },
        "F": { min: 0, max: 59.99, description: "Fail" },
      },
    },
    {
      name: "Canadian Standard",
      country: "Canada",
      description: "The Canadian grading system is similar to the US system but with different grade boundaries.",
      scale: {
        "A+": { min: 90, max: 100, description: "Exceptional" },
        "A": { min: 85, max: 89.99, description: "Excellent" },
        "A-": { min: 80, max: 84.99, description: "Very Good" },
        "B+": { min: 77, max: 79.99, description: "Good Plus" },
        "B": { min: 73, max: 76.99, description: "Good" },
        "B-": { min: 70, max: 72.99, description: "Good Minus" },
        "C+": { min: 67, max: 69.99, description: "Satisfactory Plus" },
        "C": { min: 63, max: 66.99, description: "Satisfactory" },
        "C-": { min: 60, max: 62.99, description: "Satisfactory Minus" },
        "D+": { min: 55, max: 59.99, description: "Pass Plus" },
        "D": { min: 50, max: 54.99, description: "Pass" },
        "F": { min: 0, max: 49.99, description: "Fail" },
      },
    },
  ],
  "Europe": [
    {
      name: "UK GCSE",
      country: "United Kingdom",
      description: "The GCSE grading system uses numbers 9-1, with 9 being the highest grade.",
      scale: {
        "9": { min: 90, max: 100, description: "Exceptional" },
        "8": { min: 80, max: 89.99, description: "Excellent" },
        "7": { min: 70, max: 79.99, description: "Very Good" },
        "6": { min: 60, max: 69.99, description: "Good" },
        "5": { min: 50, max: 59.99, description: "Strong Pass" },
        "4": { min: 40, max: 49.99, description: "Standard Pass" },
        "3": { min: 30, max: 39.99, description: "Basic" },
        "2": { min: 20, max: 29.99, description: "Limited" },
        "1": { min: 10, max: 19.99, description: "Poor" },
        "U": { min: 0, max: 9.99, description: "Ungraded" },
      },
    },
    {
      name: "German System",
      country: "Germany",
      description: "The German grading system uses a 1-5 scale, where 1 is the best grade.",
      scale: {
        "1.0": { min: 95, max: 100, description: "Very Good" },
        "1.3": { min: 90, max: 94.99, description: "Very Good Minus" },
        "1.7": { min: 85, max: 89.99, description: "Good Plus" },
        "2.0": { min: 80, max: 84.99, description: "Good" },
        "2.3": { min: 75, max: 79.99, description: "Good Minus" },
        "2.7": { min: 70, max: 74.99, description: "Satisfactory Plus" },
        "3.0": { min: 65, max: 69.99, description: "Satisfactory" },
        "3.3": { min: 60, max: 64.99, description: "Satisfactory Minus" },
        "3.7": { min: 55, max: 59.99, description: "Sufficient Plus" },
        "4.0": { min: 50, max: 54.99, description: "Sufficient" },
        "5.0": { min: 0, max: 49.99, description: "Insufficient (Fail)" },
      },
    },
    {
      name: "French System",
      country: "France",
      description: "The French system uses a 20-point scale, with 20 being the highest possible grade.",
      scale: {
        "20": { min: 95, max: 100, description: "Perfect" },
        "19": { min: 90, max: 94.99, description: "Excellent" },
        "18": { min: 85, max: 89.99, description: "Very Good" },
        "17": { min: 80, max: 84.99, description: "Good Plus" },
        "16": { min: 75, max: 79.99, description: "Good" },
        "15": { min: 70, max: 74.99, description: "Good Minus" },
        "14": { min: 65, max: 69.99, description: "Satisfactory Plus" },
        "13": { min: 60, max: 64.99, description: "Satisfactory" },
        "12": { min: 55, max: 59.99, description: "Satisfactory Minus" },
        "11": { min: 50, max: 54.99, description: "Sufficient Plus" },
        "10": { min: 45, max: 49.99, description: "Sufficient" },
        "< 10": { min: 0, max: 44.99, description: "Fail" },
      },
    },
  ],
  "Asia": [
    {
      name: "Chinese System",
      country: "China",
      description: "The Chinese grading system uses both percentages and a 5-point scale.",
      scale: {
        "优/A": { min: 90, max: 100, description: "Excellent" },
        "良/B": { min: 80, max: 89.99, description: "Good" },
        "中/C": { min: 70, max: 79.99, description: "Fair" },
        "及格/D": { min: 60, max: 69.99, description: "Pass" },
        "不及格/F": { min: 0, max: 59.99, description: "Fail" },
      },
    },
    {
      name: "Japanese System",
      country: "Japan",
      description: "The Japanese system uses letter grades from S to F.",
      scale: {
        "S": { min: 90, max: 100, description: "Superior" },
        "A": { min: 80, max: 89.99, description: "Excellent" },
        "B": { min: 70, max: 79.99, description: "Good" },
        "C": { min: 60, max: 69.99, description: "Fair" },
        "F": { min: 0, max: 59.99, description: "Fail" },
      },
    },
    {
      name: "Korean System",
      country: "South Korea",
      description: "The Korean system uses letter grades with plus/minus modifiers.",
      scale: {
        "A+": { min: 95, max: 100, description: "Outstanding" },
        "A0": { min: 90, max: 94.99, description: "Excellent" },
        "B+": { min: 85, max: 89.99, description: "Very Good" },
        "B0": { min: 80, max: 84.99, description: "Good" },
        "C+": { min: 75, max: 79.99, description: "Fair Plus" },
        "C0": { min: 70, max: 74.99, description: "Fair" },
        "D+": { min: 65, max: 69.99, description: "Poor Plus" },
        "D0": { min: 60, max: 64.99, description: "Poor" },
        "F": { min: 0, max: 59.99, description: "Fail" },
      },
    },
    {
      name: "Singapore System",
      country: "Singapore",
      description: "The Singapore system uses letter grades with plus/minus modifiers.",
      scale: {
        "A+": { min: 90, max: 100, description: "Excellent" },
        "A": { min: 85, max: 89.99, description: "Very Good" },
        "A-": { min: 80, max: 84.99, description: "Good Plus" },
        "B+": { min: 75, max: 79.99, description: "Good" },
        "B": { min: 70, max: 74.99, description: "Above Average" },
        "B-": { min: 65, max: 69.99, description: "Average Plus" },
        "C+": { min: 60, max: 64.99, description: "Average" },
        "C": { min: 55, max: 59.99, description: "Pass Plus" },
        "D": { min: 50, max: 54.99, description: "Pass" },
        "F": { min: 0, max: 49.99, description: "Fail" },
      },
    },
  ],
  "International": [
    {
      name: "IB System",
      country: "International",
      description: "The International Baccalaureate uses a 7-point scale for subject grades.",
      scale: {
        "7": { min: 85, max: 100, description: "Excellent" },
        "6": { min: 70, max: 84.99, description: "Very Good" },
        "5": { min: 55, max: 69.99, description: "Good" },
        "4": { min: 40, max: 54.99, description: "Satisfactory" },
        "3": { min: 25, max: 39.99, description: "Mediocre" },
        "2": { min: 10, max: 24.99, description: "Poor" },
        "1": { min: 0, max: 9.99, description: "Very Poor" },
      },
    },
    {
      name: "IGCSE",
      country: "International",
      description: "The International GCSE uses a similar system to the UK GCSE.",
      scale: {
        "A*": { min: 90, max: 100, description: "Exceptional" },
        "A": { min: 80, max: 89.99, description: "Excellent" },
        "B": { min: 70, max: 79.99, description: "Very Good" },
        "C": { min: 60, max: 69.99, description: "Good" },
        "D": { min: 50, max: 59.99, description: "Satisfactory" },
        "E": { min: 40, max: 49.99, description: "Sufficient" },
        "F": { min: 30, max: 39.99, description: "Low Pass" },
        "G": { min: 20, max: 29.99, description: "Very Low Pass" },
        "U": { min: 0, max: 19.99, description: "Ungraded" },
      },
    },
  ],
};