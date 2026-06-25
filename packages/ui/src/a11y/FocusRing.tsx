import { forwardRef } from "react";
import clsx from "clsx";

export interface FocusRingProps extends React.HTMLAttributes<HTMLDivElement> {
  within?: boolean;
  visible?: boolean;
}

export const FocusRing = forwardRef<HTMLDivElement, FocusRingProps>(
  ({ within = false, visible = true, className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "relative",
          visible && [
            "focus-within:ring-2 focus-within:ring-primary-focus focus-within:ring-offset-2 focus-within:ring-offset-canvas",
            within && "rounded-md",
          ],
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

FocusRing.displayName = "FocusRing";
