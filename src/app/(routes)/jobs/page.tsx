import SearchFilter from "@/components/searchFilter";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bookmark } from "lucide-react";

const CandidatesPages = () => {
  return (
    <>
      <SearchFilter />
      <div className="container mx-auto  px-32 pb-8">
        <div className="grid md:grid-cols-[1fr_480px] gap-6">
          {/* Job Listings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">813 Jobs</h2>
            </div>

            <Card className="relative">
              <CardContent className="p-6">
                <div className="absolute top-40 left-0">
                  <Badge className="rounded-none rounded-br-lg bg-red-500">
                    Urgent
                  </Badge>
                </div>
                <div className="flex gap-4">
                  <div className="w-36 h-20 bg-gray-100 rounded pt-10">
                    <Image
                      src="/placeholder.svg"
                      alt="Company logo"
                      width={64}
                      height={64}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-red-500">
                          Front-end Developer
                        </h3>
                        <p className="text-sm text-gray-600">Thanh Hoai Inc.</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-red-500 font-medium">
                      450 USD - 1.200 USD
                    </p>
                    <p className="text-sm text-gray-600">
                      Fresher, Junior, Middle
                    </p>
                    <p className="text-sm text-gray-600">
                      Trần Thái Độ, Hoàng Mai, Hà Nội
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <Badge variant="secondary">NgPrime</Badge>
                        <Badge variant="secondary">Angular</Badge>
                        <Badge variant="secondary">Bootstrap</Badge>
                      </div>
                      <span className="text-sm text-gray-500">10 minutes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-36 h-20 bg-gray-100 rounded pt-10">
                    <Image
                      src="/placeholder.svg"
                      alt="Company logo"
                      width={64}
                      height={64}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-red-500">
                          Front-end Developer
                        </h3>
                        <p className="text-sm text-gray-600">Thanh Hoai Inc.</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-red-500 font-medium">
                      450 USD - 1.200 USD
                    </p>
                    <p className="text-sm text-gray-600">
                      Fresher, Junior, Middle
                    </p>
                    <p className="text-sm text-gray-600">
                      Trần Thái Độ, Hoàng Mai, Hà Nội
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <Badge variant="secondary">NgPrime</Badge>
                        <Badge variant="secondary">Angular</Badge>
                        <Badge variant="secondary">Bootstrap</Badge>
                      </div>
                      <span className="text-sm text-gray-500">1 day</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Highlights Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Highlights</h2>
            <Card className="relative">
              <CardContent className="p-6">
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg bg-red-500">
                    HOT
                  </Badge>
                </div>
                <div className="flex-col gap-4 justify-center items-center">
                  <div className="w-full bg-gray-100 rounded pb-1">
                    <Image
                      src="/placeholder.svg"
                      alt="Company logo"
                      width={400}
                      height={200}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-red-500">
                          Front-end Developer
                        </h3>
                        <p className="text-sm text-gray-600">Thanh Hoai Inc.</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-red-500 font-medium">
                      450 USD - 1.200 USD
                    </p>
                    <p className="text-sm text-gray-600">
                      Fresher, Junior, Middle
                    </p>
                    <p className="text-sm text-gray-600">
                      Trần Thái Độ, Hoàng Mai, Hà Nội
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <Badge variant="secondary">NgPrime</Badge>
                        <Badge variant="secondary">Angular</Badge>
                        <Badge variant="secondary">4+</Badge>
                      </div>
                      <span className="text-sm text-gray-500">1 day</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidatesPages;
