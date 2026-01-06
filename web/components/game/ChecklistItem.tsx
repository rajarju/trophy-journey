"use client";

import { useState } from "react";
import { ChecklistItem as ChecklistItemType } from "@/lib/types";

interface ChecklistItemProps {
  item: ChecklistItemType;
  checked: boolean;
  onToggle: () => void;
}

export function ChecklistItem({ item, checked, onToggle }: ChecklistItemProps) {
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const hasWalkthrough = Boolean(item.walkthrough);

  return (
    <div className="rounded-lg bg-background hover:bg-surface-hover transition-colors">
      <label className="flex items-start gap-3 p-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div
              className={`text-sm font-medium transition-colors ${
                checked ? "text-text-muted line-through" : "text-text-primary"
              }`}
            >
              {item.label}
            </div>
            {hasWalkthrough && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowWalkthrough(!showWalkthrough);
                }}
                className="text-xs text-accent hover:text-accent-hover shrink-0"
              >
                {showWalkthrough ? "Hide" : "How to get"}
              </button>
            )}
          </div>
          {item.location && (
            <div className="text-xs text-text-muted mt-0.5">{item.location}</div>
          )}
          {item.notes && (
            <div className="text-xs text-text-secondary mt-1 italic">
              {item.notes}
            </div>
          )}
        </div>
      </label>

      {/* Walkthrough dropdown */}
      {showWalkthrough && item.walkthrough && (
        <div className="px-3 pb-3 ml-8">
          <div className="text-xs text-text-primary bg-surface p-3 rounded border border-surface-border leading-relaxed whitespace-pre-line">
            {item.walkthrough}
          </div>
        </div>
      )}
    </div>
  );
}
