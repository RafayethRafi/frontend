import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const CricketCard = ({ review, isAdmin, onEditClick, onShowReview }) => {
  const showScore = review.score1 !== 0 || review.wicket1 !== 0 || review.score2 !== 0 || review.wicket2 !== 0;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:from-blue-700 dark:to-purple-800">
        <CardTitle className="text-2xl flex justify-between items-center">
          <span>{review.team1} vs {review.team2}</span>
          {isAdmin && (
            <Button variant="ghost" size="sm" onClick={onEditClick} className="text-white hover:text-blue-200">
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
              <p className="text-3xl font-bold">{review.score1}/{review.wicket1}</p>
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold">{review.team2}</p>
              <p className="text-3xl font-bold">{review.score2}/{review.wicket2}</p>
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

export default CricketCard;