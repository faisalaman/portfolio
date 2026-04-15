import { cn } from '../../lib/cn';

export function GradientText({ as: _Tag = 'span', className, children }) {
  const Tag = _Tag;
  return <Tag className={cn('gradient-text', className)}>{children}</Tag>;
}

export default GradientText;
