import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";

const LeagueCard = ({ league, isAdmin, onEditClick, onDeleteClick, onViewInsights }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:from-blue-700 dark:to-purple-800">
        <CardTitle className="text-2xl flex justify-between items-center">
          <span>{league.name}</span>
          {isAdmin && (
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={onEditClick} className="text-white hover:text-blue-200">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onDeleteClick} className="text-white hover:text-red-200">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col">
        {/* <p className="text-lg font-semibold">{league.sport_type}</p> */}
      </CardContent>
      <CardFooter>
        <Button onClick={onViewInsights} variant="outline" className="w-full">
          <Eye className="h-4 w-4 mr-2" />
          View Insights
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LeagueCard;