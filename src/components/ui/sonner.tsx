"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          background: "#ffffff",
          color: "#1f2937",
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        classNames: {
          toast: "bg-white text-gray-800 border border-gray-200 shadow-lg",
          title: "text-gray-900 font-semibold",
          description: "text-gray-700",
          closeButton: "text-gray-500 hover:text-gray-700",
        },
      }}
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#1f2937",
          "--normal-border": "#e5e7eb",
          "--success-bg": "#f0fdf4",
          "--success-text": "#166534",
          "--success-border": "#22c55e",
          "--error-bg": "#fef2f2",
          "--error-text": "#dc2626",
          "--error-border": "#ef4444",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
