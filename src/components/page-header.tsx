import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-muted-foreground max-w-[800px]">
          {description}
        </p>
      )}
    </div>
  );
}
