'use client';

import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  // DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useDialog } from '@/hooks/use-dialog';

interface DialogProps {
  title: string;
  desc?: string;
  footer?: React.ReactElement;
  children: React.ReactElement;
  onOpenChange?: () => void;
}

export default function BaseDialog({
  title,
  desc,
  children,
  footer,
  onOpenChange
}: DialogProps) {
  const { open, setOpen } = useDialog();
  const handleOnOpenChange = () => {
    setOpen(false);
    onOpenChange && onOpenChange();
  };
  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogContent
        className="no-scrollbar sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <div className={cn(!footer && 'pb-6')}>{children}</div>
        {footer && (
          <DialogFooter className="sm:justify-start">{footer}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
