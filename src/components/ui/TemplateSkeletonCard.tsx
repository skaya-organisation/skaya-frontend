// src/components/ui/TemplateSkeletonCard.tsx

const TemplateSkeletonCard = () => (
  <div className="flex-shrink-0 w-64 h-[140px] p-4 rounded-2xl bg-gray-200 dark:bg-neutral-800/60 animate-pulse">
    <div className="h-5 bg-gray-300 dark:bg-gray-700/50 rounded w-3/4"></div>
    <div className="h-3 bg-gray-300 dark:bg-gray-700/50 rounded w-1/2 mt-3"></div>
  </div>
);

export default TemplateSkeletonCard;