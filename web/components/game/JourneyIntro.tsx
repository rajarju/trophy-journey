import { JourneyIntro as JourneyIntroType } from "@/lib/types";
import { Card } from "@/components/ui/Card";

interface JourneyIntroProps {
  intro: JourneyIntroType;
}

export function JourneyIntro({ intro }: JourneyIntroProps) {
  return (
    <Card className="p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Your Trophy Journey
      </h2>

      <div className="space-y-4">
        {/* Overview */}
        <div>
          <h3 className="text-sm font-medium text-text-secondary mb-2">
            Overview
          </h3>
          <p className="text-text-primary text-sm leading-relaxed">
            {intro.overview}
          </p>
        </div>

        {/* Recommended Approach */}
        <div>
          <h3 className="text-sm font-medium text-text-secondary mb-2">
            Recommended Approach
          </h3>
          <p className="text-text-primary text-sm leading-relaxed">
            {intro.recommendedApproach}
          </p>
        </div>

        {/* Warnings */}
        {intro.warnings.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-2">
              Important Notes
            </h3>
            <ul className="space-y-2">
              {intro.warnings.map((warning, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-text-primary"
                >
                  <span className="text-warning shrink-0">!</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
