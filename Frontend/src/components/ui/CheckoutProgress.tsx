
import { Check } from "lucide-react";

type CheckoutProgressProps = {
  currentStep: 1 | 2 | 3;
};

const steps = [
  { number: 1, label: "Details" },
  { number: 2, label: "Payment" },
  { number: 3, label: "Confirmation" },
] as const;

export default function CheckoutProgress({
  currentStep,
}: CheckoutProgressProps) {
  return (
    <nav
      aria-label="Checkout progress"
      className="mb-8 w-full"
    >
      <ol className="flex w-full items-start">
        {steps.map((step, index) => {
          const completed = step.number <= currentStep;
          const active = step.number === currentStep;

          return (
            <li
              key={step.number}
              aria-current={active ? "step" : undefined}
              className={`flex min-w-0 items-start ${
                index < steps.length - 1 ? "flex-1" : ""
              }`}
            >
              <div className="flex min-w-[60px] flex-col items-center gap-2">
                <span
                  aria-label={`${step.label} ${
                    completed
                      ? "completed"
                      : active
                        ? "current step"
                        : "upcoming"
                  }`}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    completed
                      ? "bg-green-600 text-white"
                      : active
                        ? "bg-blue-600 text-white ring-4 ring-blue-100"
                        : "border border-neutral-300 bg-white text-neutral-400"
                  }`}
                >
                  {completed ? (
                    <Check size={18} />
                  ) : (
                    step.number
                  )}
                </span>

                <span
                  className={`text-center text-xs font-semibold sm:text-sm ${
                    completed
                      ? "text-neutral-900"
                      : "text-neutral-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className={`mx-1 mt-4 h-0.5 flex-1 rounded sm:mx-3 ${
                    step.number < currentStep
                      ? "bg-green-600"
                      : "bg-neutral-200"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
