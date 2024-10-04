'use client';

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import LeagueCard from "@/components/LeagueCard";
import LeagueEditor from "@/components/LeagueEditor";
import useAuth from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const api = process.env.NEXT_PUBLIC_API_URL;

export default function LeaguesPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [leagues, setLeagues] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingLeagueId, setEditingLeagueId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchLeagues = useCallback(async () => {
    try {
      const response = await fetch(`${api}/admin/leagues`);
      if (!response.ok) throw new Error('Failed to fetch leagues');
      const data = await response.json();
      setLeagues(data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
      toast({
        title: "Error",
        description: "Failed to fetch leagues. Please try again.",
        variant: "destructive",
      });
    }
  }, []);

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  const handleLeagueSubmit = async (leagueData) => {
    if (!token) {
      console.log('Token not available, cannot submit league');
      return;
    }

    try {
      const url = editingLeagueId 
        ? `${api}/admin/edit_league?league_id_to_edit=${editingLeagueId}`
        : `${api}/admin/create_league`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(leagueData)
      });

      if (!response.ok) throw new Error('Failed to submit league');
      
      await fetchLeagues();
      setIsCreating(false);
      setEditingLeagueId(null);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: editingLeagueId ? "League updated successfully" : "League created successfully",
      });
    } catch (error) {
      console.error('Error submitting league:', error);
      toast({
        title: "Error",
        description: "Failed to submit league. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (id) => {
    setEditingLeagueId(id);
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setEditingLeagueId(null);
    setIsDialogOpen(true);
  };

  const handleDeleteLeague = async (id) => {
    if (!token) {
      console.log('Token not available, cannot delete league');
      return;
    }

    try {
      const response = await fetch(`${api}/admin/delete_league?league_id_to_delete=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete league');
      
      await fetchLeagues();
      toast({
        title: "Success",
        description: "League deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting league:', error);
      toast({
        title: "Error",
        description: "Failed to delete league. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewInsights = (id) => {
    router.push(`/cricket/${id}`);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Cricket Leagues</h1>
      {user?.isAdmin && (
        <div className="mb-6">
          <Button onClick={handleCreateClick} className="w-full">
            Create New League
          </Button>
        </div>
      )}
      {leagues.length === 0 && !isCreating && (
        <p className="text-center text-muted-foreground">No leagues available</p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {leagues.map((league) => (
          <LeagueCard
            key={league.id}
            league={league}
            isAdmin={user?.isAdmin}
            onEditClick={() => handleEditClick(league.id)}
            onDeleteClick={() => handleDeleteLeague(league.id)}
            onViewInsights={() => handleViewInsights(league.id)}
          />
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-background dark:bg-gray-800">
          <LeagueEditor
            initialValue={editingLeagueId ? leagues.find(l => l.id === editingLeagueId) : null}
            onSubmit={handleLeagueSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}