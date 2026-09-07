import * as React from "react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
