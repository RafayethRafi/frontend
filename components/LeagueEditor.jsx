import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LeagueEditor = ({ initialValue, onSubmit, onCancel }) => {
  const [league, setLeague] = useState(initialValue || {
    name: "",
    sport_type: "",
  });

  useEffect(() => {
    if (initialValue) {
      setLeague(initialValue);
    }
  }, [initialValue]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeague(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(league);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{initialValue ? "Edit League" : "Create League"}</h2>
      <div>
        <Label htmlFor="name">League Name</Label>
        <Input
          id="name"
          name="name"
          value={league.name}
          onChange={handleInputChange}
          placeholder="League Name"
        />
      </div>
      <div>
        <Label htmlFor="sport_type">Sport Type</Label>
        <Input
          id="sport_type"
          name="sport_type"
          value={league.sport_type}
          onChange={handleInputChange}
          placeholder="Sport Type"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="default">
          {initialValue ? "Update League" : "Create League"}
        </Button>
      </div>
    </div>
  );
};

export default LeagueEditor;