"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Copy, CopyCheck } from "lucide-react";
import Link from "next/link";

export default function Buttons({eventId}: { eventId: string }) {
      const [copied, setCopied] = useState(false);
      useEffect(() => {
            setTimeout(() => {
                  setCopied(false);
            }, 2000);
      }, [copied]);
      return (
            <div className="flex justify-end items-stretch gap-2">
                  <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                              navigator.clipboard.writeText(
                                    window.location.href
                              );
                              setCopied(true);
                        }}>
                        {copied ? <CopyCheck /> : <Copy />}
                        {copied ? "Copied!" : "Copy Link"}
                  </Button>
                  <Button
                        className="h-full px-4 py-2 font-bold text-white bg-blue-500 border cursor-pointer hover:bg-blue-700"
                        asChild>
                        <Link
                              href={`/events/${eventId}/edit`}
                              className="flex items-center gap-2">
                              Edit
                        </Link>
                  </Button>
            </div>
      );
}
