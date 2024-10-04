import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const FootballCard = ({ review, isAdmin, onEditClick, onShowReview }) => {
  const showScore = review.score1 !== null && review.score2 !== null;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white dark:from-green-700 dark:to-blue-800">
        <CardTitle className="text-2xl flex justify-between items-center">
          <span>{review.team1} vs {review.team2}</span>
          {isAdmin && (
            <Button variant="ghost" size="sm" onClick={onEditClick} className="text-white hover:text-green-200">
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col">
        {showScore && (
          <div className="flex justify-between mb-4 text-center">
            <div className="flex-1">
              <p className="text-lg font-semibold">{review.team1}</p>
              <p className="text-3xl font-bold">{review.score1}</p>
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold">{review.team2}</p>
              <p className="text-3xl font-bold">{review.score2}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onShowReview} variant="outline" className="w-full">
          Show Review
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FootballCard;