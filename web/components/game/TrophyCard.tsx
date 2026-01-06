"use client";

import { useState } from "react";
import { Trophy, TrophyType, TrophyProgress } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "./ProgressBar";
import { ChecklistItem } from "./ChecklistItem";

interface TrophyCardProps {
  trophy: Trophy;
  progress: TrophyProgress | undefined;
  onChecklistToggle: (itemId: string) => void;
}

const trophyColors: Record<TrophyType, string> = {
  platinum: "text-trophy-platinum",
  gold: "text-trophy-gold",
  silver: "text-trophy-silver",
  bronze: "text-trophy-bronze",
};

const trophyBgColors: Record<TrophyType, string> = {
  platinum: "bg-trophy-platinum/10",
  gold: "bg-trophy-gold/10",
  silver: "bg-trophy-silver/10",
  bronze: "bg-trophy-bronze/10",
};

export function TrophyCard({
  trophy,
  progress,
  onChecklistToggle,
}: TrophyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChecklist = trophy.checklist && trophy.checklist.length > 0;
  const hasExpandableContent =
    hasChecklist ||
    trophy.walkthrough ||
    trophy.prerequisites ||
    trophy.farmingTip ||
    trophy.guide;

  // Calculate completion stats
  const checklistItems = trophy.checklist || [];
  const completedItems = checklistItems.filter(
    (item) => progress?.checklist[item.id]
  ).length;
  const totalItems = checklistItems.length;

  return (
    <div className="bg-surface border border-surface-border rounded-lg overflow-hidden">
      {/* Trophy Header - Always visible */}
      <button
        onClick={() => hasExpandableContent && setIsExpanded(!isExpanded)}
        className={`w-full p-4 flex items-start gap-3 text-left ${
          hasExpandableContent ? "hover:bg-surface-hover cursor-pointer" : ""
        } transition-colors`}
        disabled={!hasExpandableContent}
      >
        {/* Trophy Icon */}
        <div
          className={`w-10 h-10 rounded-lg ${trophyBgColors[trophy.type]} flex items-center justify-center shrink-0`}
        >
          <TrophyIcon className={`w-5 h-5 ${trophyColors[trophy.type]}`} />
        </div>

        {/* Trophy Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`text-xs font-medium uppercase ${trophyColors[trophy.type]}`}
            >
              {trophy.type}
            </span>
            {trophy.isMissable && <Badge variant="danger">Missable</Badge>}
            {trophy.prerequisites && trophy.prerequisites.length > 0 && (
              <Badge variant="muted">Requires abilities</Badge>
            )}
          </div>
          <h3 className="font-semibold text-text-primary">{trophy.name}</h3>
          <p className="text-sm text-text-secondary mt-0.5">
            {trophy.description}
          </p>

          {/* Progress bar for trophies with checklists */}
          {hasChecklist && (
            <div className="mt-3">
              <ProgressBar
                completed={completedItems}
                total={totalItems}
                size="sm"
              />
            </div>
          )}
        </div>

        {/* Expand indicator */}
        {hasExpandableContent && (
          <ChevronIcon
            className={`w-5 h-5 text-text-muted transition-transform shrink-0 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && hasExpandableContent && (
        <div className="border-t border-surface-border">
          {/* Brief Guide */}
          {trophy.guide && (
            <div className="p-4 bg-surface-hover/50 border-b border-surface-border">
              <p className="text-sm text-text-secondary">{trophy.guide}</p>
            </div>
          )}

          {/* Missable Context */}
          {trophy.isMissable && trophy.missableContext && (
            <div className="px-4 py-3 bg-danger/10 border-b border-surface-border">
              <p className="text-sm text-danger">{trophy.missableContext}</p>
            </div>
          )}

          {/* Prerequisites */}
          {trophy.prerequisites && trophy.prerequisites.length > 0 && (
            <div className="px-4 py-3 border-b border-surface-border">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                Prerequisites
              </h4>
              <div className="flex flex-wrap gap-2">
                {trophy.prerequisites.map((prereq, i) => (
                  <span
                    key={i}
                    className="text-sm bg-accent/10 text-accent px-2 py-1 rounded"
                  >
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Walkthrough */}
          {trophy.walkthrough && (
            <div className="px-4 py-3 border-b border-surface-border">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                Walkthrough
              </h4>
              <div className="text-sm text-text-primary whitespace-pre-line leading-relaxed">
                {trophy.walkthrough}
              </div>
            </div>
          )}

          {/* Farming Tip */}
          {trophy.farmingTip && (
            <div className="px-4 py-3 bg-success/5 border-b border-surface-border">
              <h4 className="text-xs font-semibold text-success uppercase tracking-wide mb-2">
                Farming Tip
              </h4>
              <p className="text-sm text-text-primary">{trophy.farmingTip}</p>
            </div>
          )}

          {/* Checklist */}
          {hasChecklist && (
            <div className="p-2">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide px-3 py-2">
                Checklist ({completedItems}/{totalItems})
              </h4>
              {checklistItems.map((item) => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  checked={progress?.checklist[item.id] ?? false}
                  onToggle={() => onChecklistToggle(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
