export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export interface PositionOptions {
  triggerRect: DOMRect;
  contentRect: DOMRect;
  placement: Placement;
  offset?: number;
  margin?: number;
}

export interface PositionResult {
  top: number;
  left: number;
  actualPlacement: Placement;
}

export function getPosition({
  triggerRect,
  contentRect,
  placement,
  offset = 8,
  margin = 8,
}: PositionOptions): PositionResult {
  const { top: tTop, left: tLeft, width: tWidth, height: tHeight } = triggerRect;
  const { width: cWidth, height: cHeight } = contentRect;

  const compute = (p: Placement): { top: number; left: number } => {
    switch (p) {
      case 'top':
        return { top: tTop - cHeight - offset, left: tLeft + tWidth / 2 - cWidth / 2 };
      case 'top-start':
        return { top: tTop - cHeight - offset, left: tLeft };
      case 'top-end':
        return { top: tTop - cHeight - offset, left: tLeft + tWidth - cWidth };
      case 'bottom':
        return { top: tTop + tHeight + offset, left: tLeft + tWidth / 2 - cWidth / 2 };
      case 'bottom-start':
        return { top: tTop + tHeight + offset, left: tLeft };
      case 'bottom-end':
        return { top: tTop + tHeight + offset, left: tLeft + tWidth - cWidth };
      case 'left':
        return { top: tTop + tHeight / 2 - cHeight / 2, left: tLeft - cWidth - offset };
      case 'right':
        return { top: tTop + tHeight / 2 - cHeight / 2, left: tLeft + tWidth + offset };
    }
  };

  const flip = (p: Placement): Placement => {
    switch (p) {
      case 'top':
        return 'bottom';
      case 'top-start':
        return 'bottom-start';
      case 'top-end':
        return 'bottom-end';
      case 'bottom':
        return 'top';
      case 'bottom-start':
        return 'top-start';
      case 'bottom-end':
        return 'top-end';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
    }
  };

  let pos = compute(placement);
  let actualPlacement = placement;

  // Flip if overflowing top or bottom
  if (pos.top < margin && placement.startsWith('top')) {
    actualPlacement = flip(placement);
    pos = compute(actualPlacement);
  } else if (pos.top + cHeight > window.innerHeight - margin && placement.startsWith('bottom')) {
    actualPlacement = flip(placement);
    pos = compute(actualPlacement);
  }

  // Clamp to viewport
  if (pos.left < margin) pos.left = margin;
  if (pos.left + cWidth > window.innerWidth - margin) {
    pos.left = window.innerWidth - cWidth - margin;
  }
  if (pos.top < margin) pos.top = margin;
  if (pos.top + cHeight > window.innerHeight - margin) {
    pos.top = window.innerHeight - cHeight - margin;
  }

  return { ...pos, actualPlacement };
}
