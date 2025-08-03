

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "lucide-react";

export default function MobileHomePage() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MinusIcon className="w-5 h-5 text-green-600" />
            Récoltes récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>🍅 Tomates – 750g – 31/07/2025</li>
            <li>🥒 Concombres – 2 unités – 30/07/2025</li>
            <li>🍓 Fraises – 300g – 29/07/2025</li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button className="w-full" variant="default">
          <PlusIcon className="w-4 h-4 mr-2" />
          Nouvelle récolte
        </Button>
      </div>
    </div>
  );
}