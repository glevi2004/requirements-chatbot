import { XCircle } from "lucide-react";
import { Button } from "./ui/button";

export function SimpleAlert({ title, message, action, onAction, onClose }) {
  return (
    <div className="bg-destructive/10 border-destructive border rounded-lg p-4 my-4 mx-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
          <div>
            <h5 className="font-semibold text-destructive mb-1">{title}</h5>
            <p className="text-sm text-destructive/90">{message}</p>
          </div>
        </div>
        {action && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAction}
            className="ml-4 bg-background hover:bg-background/90"
          >
            {action}
          </Button>
        )}
      </div>
    </div>
  );
}
