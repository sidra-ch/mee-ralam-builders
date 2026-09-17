"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";

interface ProjectImageLightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

/**
 * Lightweight full-view for a single project photograph.
 * No gallery library — native dialog, keyboard close, focus return.
 */
export function ProjectImageLightbox({ src, alt, children }: ProjectImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
    dialogRef.current?.close();
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Open full view: ${alt}`}
        className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12]"
      >
        {children}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="fixed inset-0 z-[80] m-0 max-h-none max-w-none h-full w-full bg-[#0d0e12]/96 p-0 backdrop:bg-[#0d0e12]/90"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") close();
        }}
      >
        <p id={titleId} className="sr-only">
          {alt}
        </p>
        <button
          type="button"
          onClick={close}
          className="absolute right-5 top-5 z-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227] transition-colors hover:text-[#f5f2ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227]"
        >
          Close
        </button>
        <div className="relative flex h-full w-full items-center justify-center p-6 sm:p-10">
          <div className="relative h-[min(88vh,900px)] w-full max-w-[1400px]">
            {open && (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority={open}
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
