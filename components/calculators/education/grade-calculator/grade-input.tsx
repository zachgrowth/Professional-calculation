"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { GradeItem } from "./index";

interface GradeInputProps {
  item: GradeItem;
  onUpdate: (id: string, updates: Partial<GradeItem>) => void;
  onRemove: (id: string) => void;
}

export function GradeInput({ item, onUpdate, onRemove }: GradeInputProps) {
  return (
    <div className="flex gap-4 items-end">
      <div className="flex-1">
        <Label htmlFor={`name-${item.id}`}>Name</Label>
        <Input
          id={`name-${item.id}`}
          value={item.name}
          onChange={(e) => onUpdate(item.id, { name: e.target.value })}
        />
      </div>
      <div className="w-24">
        <Label htmlFor={`score-${item.id}`}>Score</Label>
        <Input
          id={`score-${item.id}`}
          type="number"
          value={item.score}
          onChange={(e) =>
            onUpdate(item.id, { score: parseFloat(e.target.value) || 0 })
          }
        />
      </div>
      <div className="w-24">
        <Label htmlFor={`max-${item.id}`}>Max</Label>
        <Input
          id={`max-${item.id}`}
          type="number"
          value={item.maxScore}
          onChange={(e) =>
            onUpdate(item.id, { maxScore: parseFloat(e.target.value) || 0 })
          }
        />
      </div>
      <div className="w-24">
        <Label htmlFor={`weight-${item.id}`}>Weight</Label>
        <Input
          id={`weight-${item.id}`}
          type="number"
          value={item.weight}
          onChange={(e) =>
            onUpdate(item.id, { weight: parseFloat(e.target.value) || 0 })
          }
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(item.id)}
        className="mb-0.5"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}