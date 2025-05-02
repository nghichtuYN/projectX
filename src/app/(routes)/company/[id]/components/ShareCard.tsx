"use client";

import { useState } from "react";
import { Facebook, Linkedin, Twitter, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePathname } from "next/navigation";

interface ShareCardProps {
  companyName?: string;
}

export function ShareCard({ companyName = "công ty" }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const url = "http://localhost:3000/" + usePathname();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=Thông tin về ${companyName}`,
      "_blank"
    );
  };

  const shareToLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="bg-secondaryColor text-white p-4">
        <h3 className="text-lg font-medium">Chia sẻ công ty tới bạn bè</h3>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <p className="mb-2 font-medium">Sao chép đường dẫn</p>
          <div className="flex">
            <Input
              value={url}
              readOnly
              className="rounded-r-none border-r-0 bg-white"
            />
            <Button
              onClick={handleCopy}
              variant="outline"
              className="rounded-l-none border-l-0 px-3"
              aria-label="Copy link"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <p className="mb-3 font-medium">Chia sẻ qua mạng xã hội</p>
          <div className="flex gap-4">
            <Button
              onClick={shareToFacebook}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-gray-200"
              aria-label="Share to Facebook"
            >
              <Facebook className="h-6 w-6 text-blue-600" />
            </Button>
            <Button
              onClick={shareToTwitter}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-gray-200"
              aria-label="Share to Twitter"
            >
              <Twitter className="h-6 w-6 text-sky-500" />
            </Button>
            <Button
              onClick={shareToLinkedin}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-gray-200"
              aria-label="Share to LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-blue-700" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
